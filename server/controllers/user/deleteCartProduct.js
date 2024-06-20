import cartModel from "../../models/cartModel.js";


export const deleteCartProduct = async (req, res) => {

    try {
        const userId = req?.user?.id;
        const { cartId } = req?.body;

        const deletedProduct = await cartModel.deleteOne({ _id: cartId });

        return res.status(200).json({
            message: "Product deleted successfully...🎉",
            data: deletedProduct,
            success: true,
            error: false
        });


    } catch (error) {
        res.status(400).json({
            message: error?.message || error,
            success: false,
            error: true
        });
    }
};