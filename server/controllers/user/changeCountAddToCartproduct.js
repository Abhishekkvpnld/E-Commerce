import cartModel from "../../models/cartModel.js";

export const changeCountAddToCartproduct = async (req, res) => {

    try {

        const userId = req?.user?.id;
        const { productQty, cartId } = req?.body;

        console.log(cartId)

        const updatedproduct = await cartModel.updateOne({ _id: cartId }, {
            ...(productQty && { quantity: productQty })
        });

        return res.status(200).json({
            message: "Producted updated",
            data: updatedproduct,
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
}