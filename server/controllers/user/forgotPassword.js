import userModel from "../../models/userModel.js";


export const forgotPassword = async (req, res) => {

        const { email } = req?.body; 

        const checkEmail = await userModel.find({ email: email });

        if (!checkEmail[0]) {
          return  res.status(400).json({
                message: "User not found...🤦",
                success: false,
                error: true
            });
        };

        return res.status(200).json({
            data: checkEmail,
            message: "User Data",
            success: true,
            error: false
        });

};