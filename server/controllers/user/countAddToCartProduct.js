import cartModel from "../../models/cartModel.js";

export const countAddToCartProduct = async (req, res) => {
    try {
        const userId = req?.user?.id;
        const count = await cartModel.countDocuments({ userId: userId });

        return res.status(200).json({
            data: { count: count },
            success: true,
            error: false,
            message:"cart product count..."
        });

    } catch (error) {
        res.status(400).json({
            message: error?.message || error,
            success: false,
            error: true
        });
    };
};