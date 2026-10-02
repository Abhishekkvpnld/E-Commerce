import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

/**
 * Generate a 768-dim embedding vector for a given text
 * Uses Google's gemini-embedding-001 model (new @google/genai SDK)
 */
export const generateEmbedding = async (text) => {
  const response = await ai.models.embedContent({
    model: "gemini-embedding-001",
    contents: text,
    config: {
      outputDimensionality: 768,
    },
  });
  return response.embeddings[0].values; // Array of 768 floats
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
