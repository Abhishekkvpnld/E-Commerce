
import { GoogleGenAI } from "@google/genai";
import Groq from "groq-sdk";

import productModel from "../../models/productModel.js";
import { generateEmbedding } from "../../helper/embeddings.js";

// --------------------------------------------------
// Gemini
// --------------------------------------------------

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
});

// --------------------------------------------------
// Groq
// --------------------------------------------------

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY,
});

// --------------------------------------------------
// Helpers
// --------------------------------------------------

const sleep = (ms) =>
  new Promise((resolve) => setTimeout(resolve, ms));

// --------------------------------------------------
// Gemini generation with retry
// --------------------------------------------------

const generateWithGemini = async (prompt, maxRetries = 2) => {
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

      // 2s → 4s
      const delay = 2000 * Math.pow(2, attempt);

      console.warn(
        `⚠️ Gemini unavailable. ` +
          `Retry ${attempt + 1}/${maxRetries} ` +
          `in ${delay / 1000}s...`,
      );

      await sleep(delay);
    }
  }
};

// --------------------------------------------------
// Groq generation
// --------------------------------------------------

const generateWithGroq = async (prompt) => {
  const completion = await groq.chat.completions.create({
    model: "openai/gpt-oss-20b",

    messages: [
      {
        role: "system",
        content:
          "You are a friendly and helpful shopping assistant for an e-commerce store.",
      },
      {
        role: "user",
        content: prompt,
      },
    ],

    temperature: 0.3,
    max_completion_tokens: 500,
  });

  return completion.choices[0]?.message?.content;
};

// --------------------------------------------------
// Generate answer
// Gemini → Groq fallback
// --------------------------------------------------

const generateAnswer = async (prompt) => {
  try {
    console.log("🤖 Trying Gemini...");

    const answer = await generateWithGemini(prompt);

    console.log("✅ Gemini response received");

    return {
      answer,
      provider: "gemini",
    };
  } catch (geminiError) {
    console.warn(
      "⚠️ Gemini failed:",
      geminiError.message,
    );

    console.log("🔄 Switching to Groq...");

    try {
      const answer = await generateWithGroq(prompt);

      console.log("✅ Groq response received");

      return {
        answer,
        provider: "groq",
      };
    } catch (groqError) {
      console.error(
        "❌ Groq also failed:",
        groqError.message,
      );

      throw new Error(
        "Both Gemini and Groq generation failed",
      );
    }
  }
};

// ==================================================
// CHAT CONTROLLER
// ==================================================

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

    const userMessage = message.trim();

    // --------------------------------------------------
    // STEP 1: Generate query embedding
    // --------------------------------------------------

    const queryEmbedding =
      await generateEmbedding(userMessage);

    console.log(
      "🔢 Query embedding dimensions:",
      queryEmbedding.length,
    );

    // Safety check
    if (queryEmbedding.length !== 768) {
      throw new Error(
        `Invalid query embedding dimensions: ${queryEmbedding.length}`,
      );
    }

    // --------------------------------------------------
    // STEP 2: MongoDB Atlas Vector Search
    // --------------------------------------------------

    const similarProducts =
      await productModel.aggregate([
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
        // STEP 3: Select product fields
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
      `🔎 Products found: ${similarProducts.length}`,
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
          product.price &&
          product.sellingPrice
            ? Math.round(
                ((product.price -
                  product.sellingPrice) /
                  product.price) *
                  100,
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
`;
      })
      .join("\n");

    // --------------------------------------------------
    // STEP 5: RAG prompt
    // --------------------------------------------------

    const prompt = `
You are a friendly and helpful shopping assistant
for an e-commerce store.

Use ONLY the product information provided below
to answer the customer's question.

Rules:
- Do not invent product information.
- Do not invent prices, brands, discounts, or specifications.
- Recommend products only from the retrieved products.
- Keep the response concise and helpful.
- Mention the selling price when relevant.
- Mention discounts when relevant.
- If multiple products are relevant, present them clearly.
- If the requested information is not available,
  say that you don't have exact details.
- Do not mention vector search, embeddings, RAG,
  or internal systems.

Retrieved Products:

${productContext}

Customer Question:

${userMessage}

Answer:
`;

    // --------------------------------------------------
    // STEP 6: Gemini → Groq fallback
    // --------------------------------------------------

    const result = await generateAnswer(prompt);

    // --------------------------------------------------
    // STEP 7: Response
    // --------------------------------------------------

    return res.json({
      success: true,
      reply: result.answer,
      productsFound: similarProducts.length,

      // Useful for development/debugging
      provider: result.provider,
    });
  } catch (error) {
    console.error(
      "❌ Chat error:",
      error.message,
    );

    return res.status(500).json({
      success: false,
      error:
        "Chat service temporarily unavailable",
    });
  }
};

