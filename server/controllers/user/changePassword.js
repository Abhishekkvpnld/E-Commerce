import userModel from "../../models/userModel.js";
import bcrypt from "bcrypt";


export const changePassword = async (req, res) => {
    try {
        const { password, email } = req.body;

        const checkUser = await userModel.findOne({ email: email });

        if (!checkUser) {
            throw new Error("User Not Found...🤦");
        };


        const salt = bcrypt.genSaltSync(10);
        const hashedPassword = bcrypt.hashSync(password, salt);

        if (!hashedPassword) {
            throw new Error("Something went wrong🤦");
        };

        const updateUserData = await userModel.findOneAndUpdate(
            { email },
            { password: hashedPassword },
            { new: true }
        );

        return res.status(200).json({
            message: "Password changed successfully...✅",
            success: true,
            error: false,
            data: updateUserData
        });

    } catch (error) {
        res.status(400).json({
            message: error.message || error,
            success: false,
            error: true
        });
    };
};