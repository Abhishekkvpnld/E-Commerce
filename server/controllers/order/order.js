import orderModel from "../../models/orderModel.js";


export const orderDetails = async (req, res) => {

    try {
        const userId = req?.user.id;

        const orderList = await orderModel.find({ userId: userId });

        res.status(200).json({
            message: "Order Lists...",
            data: orderList,
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