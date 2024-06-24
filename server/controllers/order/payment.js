import stripe from "../../config/stripe.js";

export const payment = async (req, res) => {
    try {
        const { cartItems } = req?.body;
        const email = req?.user?.email;

        // console.log("email", email, "cart", cartItems)
        if (!email || !cartItems || cartItems.length === 0) {
            return res.status(400).json({ error: "Invalid request: missing email or cart items" });
        };

        const params = {
            submit_type: "pay",
            mode: "payment",
            payment_method_types: ["card"],
            billing_address_collection: "auto",
            shipping_options: [
                {
                    shipping_rate: "shr_1PUu9gF3ve2G57TDsulWgrFA"
                }
            ],
            customer_email: email,
            line_items: cartItems.map((product) => ({
                price_data: {
                    currency: "inr",
                    product_data: {
                        name: product?.productId?.productName,
                        images: product?.productId?.productImage,
                        metadata: {
                            productId: product?.productId?._id
                        }
                    },
                    unit_amount: product?.productId?.sellingPrice * 100, // Stripe expects amounts in cents
                },
                adjustable_quantity: {
                    enabled: true,
                    minimum: 1
                },
                quantity: product?.quantity
            })),
            success_url: `${process.env.FRONTEND_URL}/success`,
            cancel_url: `${process.env.FRONTEND_URL}/cancel`
        };

        const session = await stripe.checkout.sessions.create(params);

        //Response Session
        return res.status(200).json(session);

    } catch (error) {
        res.status(400).json({
            message: error?.message,
            success: false,
            error: true
        });
    };
};