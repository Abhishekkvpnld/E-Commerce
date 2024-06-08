import userModel from "../models/userModel.js";
import bcrypt from "bcrypt";


export const signUp = async (req, res) => {

    try {

        const { username, email, password, profilePicture } = req.body;

        const user = await userModel.findOne({ email });

        if (user) {
            throw new Error("User already exits");
            // return res.status(500).json({
            //     message: 
            // });
        };

        if (!username) {
            throw new Error("Please provide username");
        };

        if (!email) {
            throw new Error("Please provide email");
        }

        if (!password) {
            throw new Error("Please provide password");
        }

        const salt = bcrypt.genSaltSync(10);
        const hashedPassword = bcrypt.hashSync(password, salt);

        if (!hashedPassword) {
            throw new Error("Something went wrong");
        };

        const payload = {
            username,
            email,
            profilePicture,
            password: hashedPassword
        };

        const userData = new userModel(payload);
        const saveUser = await userData.save();

        res.status(201).json({
            data: saveUser,
            success: true,
            error: false,
            message: "User created successfully..🎉🎉"
        });

    } catch (error) {
        console.log(error.message);
        res.status(500).json({
            message: error.message || error,
            error: true,
            success: false
        });
    };

};