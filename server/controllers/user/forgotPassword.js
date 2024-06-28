import { sendMail } from "../../helper/nodeMailer.js";
import { generateOTP } from "../../helper/otpGenerator.js";
import userModel from "../../models/userModel.js";


export const forgotPassword = async (req, res) => {

    const { email } = req?.body;

        const checkEmail = await userModel.find({ email: email });

        if (!checkEmail[0]) {
            return res.status(400).json({
                message: "User not found...🤦",
                success: false,
                error: true
            });
        };
        //OTP Generator
        const newOTP = generateOTP();
        const OTP = parseFloat(newOTP)

        //Send Mail
        const mail = await sendMail(sendMail(email,"OTP Verification",`Your OTP for verification is:${OTP}. Please enter this code to complete your verification process.`));


        return res.status(200).json({
            data: { checkEmail, otp: OTP },
            message: "Please check your email for the OTP we've sent. Enter the code to complete your verification.",
            success: true,
            error: false
        });

};