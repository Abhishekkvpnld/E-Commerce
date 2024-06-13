import productModel from "../models/productModel.js";


export const getAllProducts = async (req, res) => {
    try {

        const allProducts = await productModel.find().sort({ createdAt: -1 });

        res.status(200).json({
            message: "all products...",
            data: allProducts,
            success: true,
            error: false
        });

    } catch (error) {
        console.log(error);
        res.status(400).json({
            message: error.message,
            success: false,
            error: true
        });
    }
};