import productModel from "../../models/productModel.js";


export const filterProduct = async (req, res) => {

    try {
        const categoryList = req?.body?.category || [];

        const products = await productModel.find({
            category: {
                "$in": categoryList
            }
        });

        return res.status(200).json({
            message: "Filter Products...",
            data: products,
            success: true,
            error: false
        });

    } catch (error) {
        res.status(400).json({
            success: false,
            error: true,
            message: error?.message || error
        });
    };
};