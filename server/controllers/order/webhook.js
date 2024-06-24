
import stripe from "../../config/stripe.js";
import orderModel from "../../models/orderModel.js";

// Stripe CLI webhook secret for testing your endpoint locally.
const endpointSecret = "whsec_29d361d45bd500e2471703826c2203dc01fe948a4aba28050e62446e4ce84516";

const getLineItems = async (lineItems) => {
    const productItems = [];

    if (lineItems?.data?.length) {
        for (const items of lineItems?.data) {

            const product = await stripe.products.retrieve(items.price.products);
            const productId = product.metadata.productId;

            const productData = {
                productId: productId,
                name: product.name,
                price: items.price.unit_amount,
                quantity: items.quantity,
                image: product.images
            }

            productItems.push(productData);
        }
    }

    return productItems;

};


export const webhooks = async (req, res) => {
    const sig = request.headers['stripe-signature'];

    const payloadString = JSON.parse(req.body);

    const header = stripe.webhooks.generateTestHeaderString({
        payload: payloadString,
        secret: endpointSecret
    });

    let event;

    try {
        event = stripe.webhooks.constructEvent(request.body, header, endpointSecret);
    } catch (err) {
        response.status(400).send(`Webhook Error: ${err.message}`);
        return;
    };


    // Handle the event
    switch (event.type) {
        case 'checkout.session.completed':
            const session = event.data.object;

            const lineItems = await stripe.checkout.sessions.listLineItems(session.id);

            const productDetails = await getLineItems(lineItems);

            const orderDetails = {
                productDetails: productDetails,
                email: session?.customer_email,
                userId: session?.metadata?.userId,
                paymentDetails: {
                    paymentId: session?.payment_intent,
                    payment_method_type: session?.payment_method_types,
                    payment_status: session?.payment_status
                },
                shipping_options: session?.shipping_options,
                totalAmount: session?.amount_total
            }

            console.log("first",orderDetails)
            // const order = new orderModel(orderDetails);
            // order.save();

            break;
        // ... handle other event types
        default:
            console.log(`Unhandled event type ${event.type}`);
    }


    res.status(200).send();
};