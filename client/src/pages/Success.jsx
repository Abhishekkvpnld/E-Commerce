import { useContext, useEffect } from 'react';
import success from "../assest/success.gif";
import { Link } from 'react-router-dom';
import userContext from '../context/userContext';

const Success = () => {

    const { fetchAddToCart } = useContext(userContext);

    useEffect(() => {
        console.log("fetch add to cart", fetchAddToCart())
        fetchAddToCart();
    }, []);

    return (
        <div className='w-full h-full min-h-[calc(100vh-100px)] flex items-center justify-center bg-white flex-col p-4'>
            <img src={success} width={"400px"} height={"440px"} alt="success..." />
            <p className='font-bold'>Payment Successfull...🎉</p>
            <Link to={"/order"} className='border-2 hover:text-white hover:bg-green-700 py-1 px-2 rounded-lg mt-2 font-semibold'>See Order</Link>
        </div>
    )
}

export default Success;