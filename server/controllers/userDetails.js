import userModel from "../models/userModel.js";


export const userDetails = async (req, res) => {
    try {

        const userData = await userModel.findById(req.user.id);

        res.status(200).json({
            data: userData,
            message: "User details...🪪",
            success: true,
            error: false
        });

    } catch (error) {
        console.log(error);
        res.status(400).json({
            message: error.message || error,
            success: false,
            errror: true
        });
    };
};