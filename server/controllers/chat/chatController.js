
import { GoogleGenAI } from "@google/genai";
import productModel from "../../models/productModel.js";
import { generateEmbedding } from "../../helper/embeddings.js";

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
});

const sleep = (ms) =>
  new Promise((resolve) => setTimeout(resolve, ms));

/**
 * Generate Gemini response with retry for temporary
 * service availability errors.
 */
const generateWithRetry = async (prompt, maxRetries = 3) => {
  for (let attempt = 0; attempt <= maxRetries; attempt++) {
    try {
      const response = await ai.models.generateContent({
        model: "gemini-3.8-flash",
        contents: prompt,
      });

      return response.text;
    } catch (error) {
      const errorMessage = error?.message || "";

      const isRetryable =
        errorMessage.includes("503") ||
        errorMessage.includes("UNAVAILABLE") ||
        errorMessage.includes("high demand") ||
        errorMessage.includes("overloaded");

      // Don't retry non-temporary errors
      if (!isRetryable || attempt === maxRetries) {
        throw error;
      }

      // 2s → 4s → 8s
      const delay = 2000 * Math.pow(2, attempt);

      console.warn(
        `⚠️ Gemini unavailable. ` +
          `Retry ${attempt + 1}/${maxRetries} ` +
          `in ${delay / 1000}s...`
      );

      await sleep(delay);
    }
  }
};

export const chatWithBot = async (req, res) => {
  try {
    const { message } = req.body;

    // --------------------------------------------------
    // Validate message
    // --------------------------------------------------

    if (!message?.trim()) {
      return res.status(400).json({
        success: false,
        error: "Message is required",
      });
    }

    // --------------------------------------------------
    // STEP 1: Generate query embedding
    // --------------------------------------------------

    const queryEmbedding = await generateEmbedding(
      message.trim()
    );

    console.log(
      "🔢 Query embedding dimensions:",
      queryEmbedding.length
    );

    // Safety check
    if (queryEmbedding.length !== 768) {
      throw new Error(
        `Invalid query embedding dimensions: ${queryEmbedding.length}`
      );
    }

    // --------------------------------------------------
    // STEP 2: MongoDB Atlas Vector Search
    // --------------------------------------------------

    const similarProducts = await productModel.aggregate([
      {
        $vectorSearch: {
          index: "product_vector_index",
          path: "embedding",
          queryVector: queryEmbedding,
          numCandidates: 50,
          limit: 5,
        },
      },

      // ------------------------------------------------
      // STEP 3: Return only required product fields
      // ------------------------------------------------

      {
        $project: {
          _id: 0,
          productName: 1,
          brandName: 1,
          category: 1,
          description: 1,
          price: 1,
          sellingPrice: 1,

          score: {
            $meta: "vectorSearchScore",
          },
        },
      },
    ]);

    console.log(
      `🔎 Products found: ${similarProducts.length}`
    );

    // --------------------------------------------------
    // No matching products
    // --------------------------------------------------

    if (similarProducts.length === 0) {
      return res.json({
        success: true,
        reply:
          "I couldn't find any products related to your query. Try searching for a specific product name, brand, or category!",
        productsFound: 0,
      });
    }

    // --------------------------------------------------
    // STEP 4: Build RAG context
    // --------------------------------------------------

    const productContext = similarProducts
      .map((product, index) => {
        const discount =
          product.price && product.sellingPrice
            ? Math.round(
                ((product.price - product.sellingPrice) /
                  product.price) *
                  100
              )
            : 0;

        return `
Product ${index + 1}:
Name: ${product.productName}
Brand: ${product.brandName}
Category: ${product.category}
Description: ${product.description || "N/A"}
Original Price: ₹${product.price}
Selling Price: ₹${product.sellingPrice}
Discount: ${discount}% off
Similarity Score: ${product.score?.toFixed(4) || "N/A"}
`;
      })
      .join("\n");

    // --------------------------------------------------
    // STEP 5: Create RAG prompt
    // --------------------------------------------------

    const prompt = `
You are a friendly and helpful shopping assistant for an e-commerce store.

Your job is to answer the customer's question using ONLY
the product information provided below.

Rules:
- Do not invent product information.
- Do not invent prices, brands, discounts, or specifications.
- If the requested information is not available, clearly say so.
- Recommend products only from the retrieved products.
- Keep the response concise and helpful.
- Mention the selling price when relevant.
- Mention discounts when relevant.
- If multiple products are relevant, present them clearly.
- Do not mention vector search, embeddings, RAG, or internal systems.

Retrieved Products:
${productContext}

Customer Question:
${message.trim()}

Answer:
`;

    // --------------------------------------------------
    // STEP 6: Generate Gemini response
    // --------------------------------------------------

    const answer = await generateWithRetry(prompt);

    // --------------------------------------------------
    // STEP 7: Send response
    // --------------------------------------------------

    return res.json({
      success: true,
      reply: answer,
      productsFound: similarProducts.length,
    });
  } catch (error) {
    console.error("❌ Chat error:", error.message);

    return res.status(500).json({
      success: false,
      error: "Chat service temporarily unavailable",
    });
  }
};

