import stripe from "../../config/stripe.js";

export const payment = async (req, res) => {
    try {
        const { cartItems } = req?.body;
        const email = req?.user?.email;

        const params = {
            submit_type: "pay",
            mode: "payment",
            payment_method_type: ["card"],
            billing_address_collection: "auto",
            shipping_options: [
                {
                    shipping_rate: "shr_1PUu9gF3ve2G57TDsulWgrFA"
                }
            ],
            customer_email: email,
            liline_items:cartItems.map((product,index)=>{
                return {

                };
            })
        };

        const session = await stripe.checkout.sessions.create(params);

    } catch (error) {
        res.status(400).json({
            message: error?.message,
            success: false,
            error: true
        });
    };
};