import mongoose from "mongoose";

const cartSchema = new mongoose.Schema({
    productId: {
        ref: "product",
        type: String
    },
    userId: String,
    quantity: Number
}, {
    timestamps: true
});

const cartModel = mongoose.model("addtocart", cartSchema);

export default cartModel;