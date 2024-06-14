import userModel from "../../models/userModel.js";

export const allUsers = async (req, res) => {
    try {

        const allUsers = await userModel.find();

        res.status(200).json({
            message: "All users 🧑‍🦰🧑‍🦰",
            data: allUsers,
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
    };
};