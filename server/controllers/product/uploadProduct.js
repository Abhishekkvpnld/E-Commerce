import { uploadProductPermission } from "../../helper/permission.js";
import productModel from "../../models/productModel.js";
import { generateEmbedding, buildProductText } from "../../helper/embeddings.js";


export const uploadproduct = async (req, res) => {
    try {

        const sessionUserId = req.user.id;
        const validUser = await uploadProductPermission(sessionUserId);

        if (!validUser) {
            throw new Error("Permission denied...🔐");
        };

        const productData = req.body;

        // ── Auto-generate embedding for Vector Search ─────────────────────────
        try {
            const text = buildProductText(productData);
            productData.embedding = await generateEmbedding(text);
        } catch (embErr) {
            // Embedding failure should NOT block product upload
            console.warn("⚠️ Embedding generation failed (product saved without it):", embErr.message);
        }

        const uploadProduct = new productModel(productData);
        const savedProduct = await uploadProduct.save();

        res.status(200).json({
            message: "Product added successfully...🎉",
            success: true,
            error: false,
            data: savedProduct
        });

    } catch (error) {
        console.log(error.message)
        res.status(400).json({
            message: error.message || error,
            success: false,
            error: true
        });
    };
};