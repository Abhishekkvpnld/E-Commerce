import productModel from "../../models/productModel.js";


export const searchProducts = async (req, res) => {
    try {
        const query = req?.query.q;
        if (query) {
            const regex = new RegExp(query, 'ig');

            const product = await productModel.find({
                "$or": [
                    {
                        productName: regex
                    },
                    {
                        category: regex
                    }
                ]
            });    

            return res.status(200).json({
                message: "products",
                data: product,
                success: true,
                error: false
            });

        }

    } catch (error) {
        res.status(400).json({
            message: error?.message || error,
            success: false,
            error: true
        });
    }
};