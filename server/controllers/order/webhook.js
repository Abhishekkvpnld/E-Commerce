import stripe from "../../config/stripe.js";
import orderModel from "../../models/orderModel.js";


const getLineItems = async (lineItems) => {
    const productItems = [];

    if (lineItems?.data?.length) {
        for (const items of lineItems?.data) {

            const product = await stripe.products.retrieve(items?.price?.product);
            const productId = product.metadata.productId;

            const productData = {
                productId: productId,
                name: product.name,
                price: items.price.unit_amount / 100,
                quantity: items.quantity,
                image: product.images
            }

            productItems.push(productData);
        }
    }

    return productItems;

};


export const webhooks = async (req, res) => {

    // Stripe CLI webhook secret for testing your endpoint locally.
    const endpointSecret = process.env.STRIPE_END_POINT_WEBHOOK_SECRET_KEY;

    const sig = req.headers['stripe-signature'];

    const payloadString = JSON.stringify(req?.body);

    const header = stripe.webhooks.generateTestHeaderString({
        payload: payloadString,
        secret: endpointSecret
    });

    let event;

    try {
        // Retrieve the raw body for signature verification 
        event = stripe.webhooks.constructEvent(payloadString, header, endpointSecret);

    } catch (err) {
        console.error(`Webhook signature verification failed.`, err.message);
        res.status(400).send(`Webhook Error: ${err.message}`);
        return;
    }

    // Handle the event
    switch (event.type) {
        case 'checkout.session.completed':
            const session = event.data.object;

            const lineItems = await stripe.checkout.sessions.listLineItems(session.id);

            const productDetails = await getLineItems(lineItems);
            console.log("productDetails", productDetails);

            const orderDetails = {
                productDetails: productDetails,
                email: session?.customer_email,
                userId: session?.metadata?.userId,
                paymentDetails: {
                    paymentId: session?.payment_intent,
                    payment_method_type: session?.payment_method_types,
                    payment_status: session?.payment_status
                },
                shipping_options: session?.shipping_options.map((i) => {
                    return {
                        ...i, shipping_amount: i.shipping_amount / 100
                    }
                }),
                total_amount: session?.amount_total / 100
            }


            const order = new orderModel(orderDetails);
            order.save();

            break;
        // ... handle other event types
        default:
            console.log(`Unhandled event type ${event.type}`);
    };


    res.status(200).send();
};