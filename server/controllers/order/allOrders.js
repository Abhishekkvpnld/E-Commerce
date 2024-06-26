
import orderModel from "../../models/orderModel.js";
import userModel from "../../models/userModel.js";


export const allOrders = async (req, res) => {
    try {

        const userId = req?.user.id;

        const user = await userModel.findById(userId);

        if (user?.role !== "ADMIN") {
            throw new Error("No Access...🔐");
        };

        const allOrders = await orderModel.find().sort({ createdAt: -1 });

        return res.status(200).json({
            message: "All Orders...",
            data: allOrders,
            success: true,
            error: false
        });


    } catch (error) {
        res.status(400).json({
            message: error.message || error,
            success: false,
            error: true
        })
    }
}