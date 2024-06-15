import productModel from "../../models/productModel.js";


export const getCategoryWiseProduct = async (req, res) => {

    try {
        const { category } = req?.body || req?.params;
        const categoryProduct = await productModel.find({ category });

        res.status(200).json({
            message: "Category products...",
            data: categoryProduct,
            success: true,
            error: false
        });

    } catch (error) {
        res.status(400).json({
            message: error.message,  
            success: false,
            error: true
        });
    };
};