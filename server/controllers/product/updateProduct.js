import { uploadProductPermission } from "../../helper/permission.js";
import productModel from "../../models/productModel.js";
import { generateEmbedding, buildProductText } from "../../helper/embeddings.js";

export const updateProduct = async (req, res) => {
    try {

        const sessionUserId = req?.user?.id;
        const validUser = await uploadProductPermission(sessionUserId);

        if (!validUser) {
            throw new Error("Permission denied...🔐");
        };

        const { _id, ...restBody } = req.body;

        // ── Re-generate embedding so it stays in sync with updated details ──────
        try {
            // Merge existing product data with updates for full context
            const existing = await productModel.findById(_id).lean();
            const mergedData = { ...existing, ...restBody };
            restBody.embedding = await generateEmbedding(buildProductText(mergedData));
        } catch (embErr) {
            console.warn("⚠️ Embedding regeneration failed (update saved without it):", embErr.message);
        }

        const updatedData = await productModel.findByIdAndUpdate(_id, restBody);

        res.status(200).json({
            message: "Product updated successfully...🎉",
            data: updatedData,
            success: true,
            error: false
        });

    } catch (error) {
        console.log(error);
        res.status(400).json({
            message: error.message || error,
            success: false,
            error: true
        });
    }
};