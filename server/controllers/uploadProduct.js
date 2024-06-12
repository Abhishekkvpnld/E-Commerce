import { uploadProductPermission } from "../helper/permission.js";
import productModel from "../models/productModel.js";


export const uploadproduct = async (req, res) => {
    console.log(req.body);

    try {

        const sessionUserId = req.user.id;
        const validUser = uploadProductPermission(sessionUserId);

        if (!validUser) {
            throw new Error("Permission denied...🔐");
        };

        const uploadProduct = new productModel(req.body);
        const savedProduct = await uploadProduct.save();

        res.status(200).json({
            message: "Product added successfully...🎉",
            success: true,
            error: false,
            data: savedProduct
        });

    } catch (error) {
        console.log(error)
        res.status(400).json({
            message: error.message || error,
            success: false,
            error: true
        });
    };
};