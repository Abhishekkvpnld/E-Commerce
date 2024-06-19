import mongoose from "mongoose";

const cartSchema = new mongoose.Schema({
    productId: String,
    userId: String,
    quantity: Number
}, {
    timestamps: true
});

const cartModel = mongoose.model("addtocart", cartSchema);

export default cartModel;