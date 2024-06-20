import cartModel from "../../models/cartModel.js";

export const addToCartViewProducts = async (req, res) => {
    try {
        const userId = req?.user?.id;

        const allProducts = await cartModel.find({ userId: userId }).populate("productId");

        return res.status(200).json({
            message: "Cart products...",
            data: allProducts || [],
            success: true,
            error: false
        });

    } catch (error) {
        res.status(400).json({
            message: error?.message || error,
            success: false,
            error: true
        });
    };
};