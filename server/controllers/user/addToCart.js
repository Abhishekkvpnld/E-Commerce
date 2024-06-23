import cartModel from "../../models/cartModel.js";

export const addToCart = async (req, res) => {
    try {
        const { productId } = req?.body;
        const currentUser = req?.user?.id;

        const isProductAvailableInCart = await cartModel.findOne({ productId,userId:currentUser });

        if (isProductAvailableInCart) {
            throw new Error("Already exits in Add to cart...🤦");
        };

        const payload = {
            userId: currentUser,
            productId: productId,
            quantity: 1
        };

        const newAddToCart = new cartModel(payload);
        const addedProduct = await newAddToCart.save();

        return res.status(200).json({
            data: addedProduct,
            message: "Product Added in Cart...🛒",
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