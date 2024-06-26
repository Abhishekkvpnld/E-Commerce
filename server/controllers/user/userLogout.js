export const userLogout = async (req, res) => {

    try {
        const tokenOption = {
            httpOnly: true,
            secure: true,
            sameSite: "None"
        };
        res.clearCookie("token", tokenOption);

        res.status(200).json({
            message: "Logged out successfully...🎉",
            data: [],
            success: true,
            error: false
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: error.message || error,
            success: false,
            error: true
        });
    };
};