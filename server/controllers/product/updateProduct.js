import { uploadProductPermission } from "../../helper/permission.js";
import productModel from "../../models/productModel.js";

export const updateProduct = async (req, res) => {
    try {

        const sessionUserId = req?.user?.id;
        const validUser = await uploadProductPermission(sessionUserId);

        if (!validUser) {
            throw new Error("Permission denied...🔐");
        };

        const { _id, ...restBody } = req.body;

        const updatedData = await productModel.findByIdAndUpdate(_id, restBody)

        res.status(200).json({
            message: "Product updated successfully...🎉",
            data: updatedData,
            success: true,
            error: false
        });

    } catch (error) {
        console.log(error);
        res.status(400).json({
            message: error.message || error,
            success: false,
            error: true
        });
    }
};