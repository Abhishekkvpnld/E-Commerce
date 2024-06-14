import productModel from "../../models/productModel.js";



export const getCategoryProduct = async (req, res) => {

    try {

        const productCategory = await productModel.distinct("category");

        /**Array to store one product from each category */
        const productByCategory = [];

        for (const category of productCategory) {
            const product = await productModel.findOne({ category });

            if (product) {
                productByCategory.push(product);
            };

        };

        res.status(200).json({
            message: "Category Product",
            data: productByCategory,
            success: true,
            error: false
        });

    } catch (error) {
        console.log(error)
        res.status(400).json({
            message: error.message || error,
            succuss: true,
            error: false
        });
    }
};