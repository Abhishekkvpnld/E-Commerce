import userModel from "../models/userModel.js";


export const updateUserRole = async (req, res) => {
    const { userId, email, name, role } = req.body;
    const sessionUser = req.user;
    try {

        const payload = {
            ...(email && { email: email }),
            ...(name && { name: name }),
            ...(role && { role: role })
        };

        const user = await userModel.findOne(sessionUser);

        if (!user) {
            throw new Error("User not Available...🤦");
        };

        if (sessionUser !== userId) {
            throw new Error("User not Authencate...🤦");
        };

        const updatedUser = await userModel.findByIdAndUpdate(userId, payload);

        if (updatedUser) {
            res.status(400).json({
                data: updatedUser,
                success: true,
                error: false,
                message: "User role updated succesfully...🎉"
            });
        };

    } catch (error) {
        console.log(error);
        res.status(400).json({
            message: error.message || error,
            success: false,
            error: true
        });
    };
};