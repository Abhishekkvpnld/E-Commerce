export const userLogout = async (req, res) => {

    try {
        res.clearCookie("token");

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