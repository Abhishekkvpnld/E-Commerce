import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
  {
    productName: String,
    brandName: String,
    category: String,
    productImage: [],
    description: String,
    price: Number,
    sellingPrice: Number,
    embedding: [Number],
  },
  {
    timestamps: true,
  },
);

const productModel = mongoose.model("product", productSchema);

export default productModel;
