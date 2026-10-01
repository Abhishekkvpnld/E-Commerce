import { GoogleGenerativeAI } from "@google/generative-ai";
import productModel from "../../models/productModel.js";
import { generateEmbedding } from "../../helper/embeddings.js";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

export const chatWithBot = async (req, res) => {
  try {
    const { message } = req.body;

    if (!message?.trim()) {
      return res
        .status(400)
        .json({ success: false, error: "Message is required" });
    }

    // ── STEP 1: Embed the user's query ────────────────────────────────────────
    const queryEmbedding = await generateEmbedding(message);

    // ── STEP 2: MongoDB Atlas Vector Search ───────────────────────────────────
    const similarProducts = await productModel.aggregate([
      {
        $vectorSearch: {
          index: "product_vector_index", // name you gave in Atlas
          path: "embedding", // field storing the vector
          queryVector: queryEmbedding, // user query as vector
          numCandidates: 50, // scan 50, return top 5
          limit: 5,
        },
      },
      {
        $project: {
          _id: 0,
          productName: 1,
          brandName: 1,
          category: 1,
          description: 1,
          price: 1,
          sellingPrice: 1,
          score: { $meta: "vectorSearchScore" }, // similarity score
        },
      },
    ]);

    // ── STEP 3: Build context from retrieved products ─────────────────────────
    if (similarProducts.length === 0) {
      return res.json({
        success: true,
        reply:
          "I couldn't find any products related to your query. Try searching for a specific product name, brand, or category!",
      });
    }

    const productContext = similarProducts
      .map(
        (p, i) =>
          `${i + 1}. ${p.productName} by ${p.brandName}
   Category: ${p.category}
   Description: ${p.description || "N/A"}
   Original Price: ₹${p.price} | Selling Price: ₹${p.sellingPrice}
   Discount: ${Math.round(((p.price - p.sellingPrice) / p.price) * 100)}% off`,
      )
      .join("\n\n");

    // ── STEP 4: Generate answer with Gemini ───────────────────────────────────
    const prompt = `You are a friendly and helpful shopping assistant for an e-commerce store.

Use ONLY the product information below to answer the customer's question.
If the question cannot be answered from this data, say: "I don't have exact details on that, but feel free to explore our store!"

Be concise, friendly, and highlight discounts when relevant.

RETRIEVED PRODUCTS (most relevant first):
${productContext}

Customer Question: ${message}

Answer:`;

    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
    const result = await model.generateContent(prompt);
    const reply = result.response.text();

    res.json({
      success: true,
      reply,
      productsFound: similarProducts.length,
    });
  } catch (error) {
    console.error("Chat error:", error.message);
    res
      .status(500)
      .json({ success: false, error: "Chat service temporarily unavailable" });
  }
};
