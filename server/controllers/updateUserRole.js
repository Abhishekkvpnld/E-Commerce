import userModel from "../models/userModel.js";


export const updateUserRole = async (req, res) => {
    const { userId, email, username, role } = req.body;

    const sessionUserId = req.user.id;

    try {

        const payload = {
            ...(email && { email: email }),
            ...(username && { username: username }),
            ...(role && { role: role })
        };

        const user = await userModel.findById(sessionUserId);

        if (!user) {
            throw new Error("User not Available...🤦");
        };

        const updatedUser = await userModel.findByIdAndUpdate(userId, payload);

        if (updatedUser) {
            res.status(200).json({
                data: updatedUser,
                success: true,
                error: false,
                message: `User role updated to ${role} successfully...🎉`
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