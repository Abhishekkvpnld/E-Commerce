import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

/**
 * Generate a 768-dim embedding vector for a given text
 * Uses Google's text-embedding-004 model (free tier)
 */
export const generateEmbedding = async (text) => {
  const model = genAI.getGenerativeModel({ model: "embedding-001" });
  const result = await model.embedContent(text);
  return result.embedding.values; // Array of 768 floats
};

/**
 * Build a rich text string from a product document for embedding
 */
export const buildProductText = (product) => {
  return [
    `Product: ${product.productName}`,
    `Brand: ${product.brandName}`,
    `Category: ${product.category}`,
    `Description: ${product.description || ""}`,
    `Price: ${product.price}`,
    `Selling Price: ${product.sellingPrice}`,
  ]
    .filter(Boolean)
    .join(". ");
};
