import productModel from "../../models/productModel.js";


export const getProductDetails = async (req, res) => {
    try {

        const { productId } = req.body;

        const productData = await productModel.findById(productId);

        res.status(200).json({
            message: "Product Data...",
            data: productData,
            success: true,
            error: false
        });

    } catch (error) {
        res.status(400).json({
            message: error.message || error,
            success: false,
            error: true
        });
    };
};