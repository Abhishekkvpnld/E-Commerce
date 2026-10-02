/**
 * ONE-TIME MIGRATION SCRIPT
 *
 * Generates 768-dimensional embeddings for all existing products.
 *
 * Prerequisites:
 * 1. Existing `embedding` fields have been removed.
 * 2. generateEmbedding() uses outputDimensionality: 768.
 *
 * Run:
 * node scripts/embedProducts.js
 *
 * Or:
 * npm run embed
 */

import "dotenv/config";
import mongoose from "mongoose";

import productModel from "../models/productModel.js";
import { generateEmbedding, buildProductText } from "../helper/embeddings.js";

const BATCH_SIZE = 5;
const DELAY_MS = 3000;

const EXPECTED_DIMENSIONS = 768;

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

const embedAllProducts = async () => {
  try {
    // --------------------------------------------------
    // Connect to MongoDB
    // --------------------------------------------------

    await mongoose.connect(process.env.MONGODB_URI);
    console.log("Database:", mongoose.connection.name);
    console.log("Host:", mongoose.connection.host);
    const collections = await mongoose.connection.db
      .listCollections()
      .toArray();

    console.log(
      "Collections:",
      collections.map((collection) => collection.name),
    );

    console.log("✅ Connected to MongoDB Atlas");

    // --------------------------------------------------
    // Get products without embeddings
    // --------------------------------------------------

    const products = await productModel
      .find({
        embedding: { $exists: false },
      })
      .lean();

    console.log(`📦 Found ${products.length} products without embeddings`);

    if (products.length === 0) {
      console.log("✅ No products need embedding.");
      return;
    }

    let successCount = 0;
    let failCount = 0;

    const totalBatches = Math.ceil(products.length / BATCH_SIZE);

    // --------------------------------------------------
    // Process products in batches
    // --------------------------------------------------

    for (let i = 0; i < products.length; i += BATCH_SIZE) {
      const batch = products.slice(i, i + BATCH_SIZE);

      const batchNumber = Math.floor(i / BATCH_SIZE) + 1;

      console.log(`\n🔄 Processing batch ${batchNumber}/${totalBatches}`);

      await Promise.all(
        batch.map(async (product) => {
          try {
            // ------------------------------------------
            // Build text for embedding
            // ------------------------------------------

            const text = buildProductText(product);

            // ------------------------------------------
            // Generate 768-dimensional embedding
            // ------------------------------------------

            const embedding = await generateEmbedding(text);

            // ------------------------------------------
            // Validate dimensions
            // ------------------------------------------

            console.log(
              `  📐 ${product.productName}: ${embedding.length} dimensions`,
            );

            if (embedding.length !== EXPECTED_DIMENSIONS) {
              throw new Error(
                `Expected ${EXPECTED_DIMENSIONS} dimensions, got ${embedding.length}`,
              );
            }

            // ------------------------------------------
            // Save embedding
            // ------------------------------------------

            await productModel.updateOne(
              { _id: product._id },
              {
                $set: {
                  embedding,
                },
              },
            );

            console.log(`  ✅ Embedded: ${product.productName}`);

            successCount++;
          } catch (err) {
            // ------------------------------------------
            // Handle rate limiting
            // ------------------------------------------

            if (
              err.message?.includes("429") ||
              err.message?.includes("RESOURCE_EXHAUSTED")
            ) {
              console.warn(`  ⏳ Rate limited: ${product.productName}`);

              console.warn("  Waiting 35 seconds before retry...");

              await sleep(35000);

              try {
                const text = buildProductText(product);

                const embedding = await generateEmbedding(text);

                // Validate retry embedding
                if (embedding.length !== EXPECTED_DIMENSIONS) {
                  throw new Error(
                    `Expected ${EXPECTED_DIMENSIONS} dimensions, got ${embedding.length}`,
                  );
                }

                await productModel.updateOne(
                  { _id: product._id },
                  {
                    $set: {
                      embedding,
                    },
                  },
                );

                console.log(
                  `  ✅ Embedded after retry: ${product.productName}`,
                );

                successCount++;
              } catch (retryErr) {
                console.error(
                  `  ❌ Failed after retry: ${product.productName}`,
                );

                console.error(`     ${retryErr.message}`);

                failCount++;
              }
            } else {
              console.error(`  ❌ Failed: ${product.productName}`);

              console.error(`     ${err.message}`);

              failCount++;
            }
          }
        }),
      );

      // ------------------------------------------------
      // Delay between batches
      // ------------------------------------------------

      if (i + BATCH_SIZE < products.length) {
        console.log(`  ⏳ Waiting ${DELAY_MS / 1000}s before next batch...`);

        await sleep(DELAY_MS);
      }
    }

    // --------------------------------------------------
    // Final result
    // --------------------------------------------------

    console.log("\n═══════════════════════════════");
    console.log(`✅ Success: ${successCount} products`);
    console.log(`❌ Failed:  ${failCount} products`);
    console.log("═══════════════════════════════");

    if (failCount === 0) {
      console.log("🎉 All products successfully embedded with 768 dimensions!");
    } else {
      console.log(
        "⚠️ Some products failed. Run the script again to retry them.",
      );
    }
  } catch (error) {
    console.error("\n❌ Migration failed:");
    console.error(error.message);
  } finally {
    await mongoose.disconnect();

    console.log("🔌 MongoDB connection closed");
  }
};

embedAllProducts();
