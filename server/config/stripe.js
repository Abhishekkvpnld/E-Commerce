
import Stripe from 'stripe';


const secret_key = process.env.STRIPE_SECRET_KEY;
const stripe = new Stripe("sk_test_51PUtq8F3ve2G57TD96F3K3IPPNaFFFs53EgCYjV6U8h1T8DaxBZ44M3Gjb1S8O272vYRWvmLVfyE7RH9HUZ1oJ0V002yhKiA2u");
export default stripe;  