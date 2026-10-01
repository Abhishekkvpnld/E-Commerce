/**
 * ONE-TIME MIGRATION SCRIPT
 * Run this ONCE to generate embeddings for all existing products.
 * 
 * Usage: node --experimental-vm-modules scripts/embedProducts.js
 * Or add to package.json scripts and run: npm run embed
 */

import "dotenv/config";
import mongoose from "mongoose";
import productModel from "../models/productModel.js";
import { generateEmbedding, buildProductText } from "../helper/embeddings.js";

const BATCH_SIZE = 5; // Process 5 at a time to avoid rate limits
const DELAY_MS = 1000; // 1 second between batches

const sleep = (ms) => new Promise((res) => setTimeout(res, ms));

const embedAllProducts = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log("✅ Connected to MongoDB Atlas");

    // Only fetch products that don't have embeddings yet
    const products = await productModel
      .find({ embedding: { $exists: false } })
      .lean();

    console.log(`📦 Found ${products.length} products without embeddings`);

    if (products.length === 0) {
      console.log("✅ All products already have embeddings!");
      process.exit(0);
    }

    let successCount = 0;
    let failCount = 0;

    // Process in batches to respect API rate limits
    for (let i = 0; i < products.length; i += BATCH_SIZE) {
      const batch = products.slice(i, i + BATCH_SIZE);
      console.log(`\n🔄 Processing batch ${Math.floor(i / BATCH_SIZE) + 1}/${Math.ceil(products.length / BATCH_SIZE)}`);

      await Promise.all(
        batch.map(async (product) => {
          try {
            const text = buildProductText(product);
            const embedding = await generateEmbedding(text);

            await productModel.updateOne(
              { _id: product._id },
              { $set: { embedding } }
            );

            console.log(`  ✅ Embedded: ${product.productName}`);
            successCount++;
          } catch (err) {
            console.error(`  ❌ Failed: ${product.productName} — ${err.message}`);
            failCount++;
          }
        })
      );

      // Wait between batches to avoid rate limiting
      if (i + BATCH_SIZE < products.length) {
        console.log(`  ⏳ Waiting ${DELAY_MS}ms before next batch...`);
        await sleep(DELAY_MS);
      }
    }

    console.log("\n═══════════════════════════════");
    console.log(`✅ Success: ${successCount} products embedded`);
    console.log(`❌ Failed:  ${failCount} products`);
    console.log("═══════════════════════════════");
    console.log("🎉 Migration complete! You can now run the chatbot.");
  } catch (error) {
    console.error("Migration failed:", error);
  } finally {
    await mongoose.disconnect();
    process.exit(0);
  }
};

embedAllProducts();
