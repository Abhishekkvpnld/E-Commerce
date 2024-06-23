import React, { useContext, useEffect, useState } from 'react';
import axios from "axios";
import endPoints from '../../common/configApi';
import userContext from '../context/userContext';
import displayCurrency from "../helpers/displayCurrency";
import toast from "react-hot-toast";
import { MdDeleteOutline } from "react-icons/md";
import { MdOutlinePayment } from "react-icons/md";



const Cart = () => {

    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(false);
    const contexts = useContext(userContext);
    const loadingCart = new Array(contexts?.cartProductCount).fill(null);


    const fetchCartData = async () => {

        try {

            const response = await axios.get(endPoints.cartViewProduct.url, { withCredentials: true });
            const fetchData = response?.data;

            if (fetchData?.success) {
                setData(fetchData?.data);
            };

        } catch (error) {
            console.log(error?.response?.data?.message);
        };
    };

    const handleLoading = async () => {
        await fetchCartData();
    };

    useEffect(() => {
        setLoading(true);
        handleLoading();
        setLoading(false);
    }, []);


    const increaseQty = async (cartId, qty) => {
        try {
            const response = await axios.post(endPoints?.updateCartProduct.url, { productQty: qty + 1, cartId: cartId }, { withCredentials: true });
            const responseData = response?.data;

            if (responseData?.success) {
                fetchCartData();
                toast.success(responseData?.message);
            };

        } catch (error) {
            toast.error(error?.response?.data?.message);
        }
    };



    const decreaseQty = async (cartId, qty) => {
        try {
            if (qty >= 2) {

                const response = await axios.post(endPoints?.updateCartProduct.url, { productQty: qty - 1, cartId: cartId }, { withCredentials: true });
                const responseData = response?.data;

                if (responseData?.success) {
                    fetchCartData();
                    toast.success(responseData?.message);
                };

            };

        } catch (error) {
            toast.error(error?.response?.data?.message);
        }
    };


    const deleteCartProduct = async (cartId) => {
        try {

            const response = await axios.post(endPoints.deleteCartProduct.url, { cartId: cartId }, { withCredentials: true });
            const responseData = response?.data;

            if (responseData?.success) {
                fetchCartData();
                contexts?.fetchAddToCart();
                toast.success(responseData?.message)
            };

        } catch (error) {
            console.log(error);
        };
    };


    const totalQuantity = data?.reduce((prev, current) => prev + current?.quantity, 0);
    const totalPrice = data?.reduce((prev, current) => prev + (current?.quantity * current?.productId?.sellingPrice), 0);


    return (
        <div className='mx-auto p-4 bg-white'>
            <div className='text-center text-xl my-4'>
                {
                    data?.length === 0 && !loading && (
                        <p>No Items</p>
                    )
                }
            </div>

            <div className='flex flex-col lg:flex-row gap-10 lg:justify-between p-4'>

                {/**View Products */}
                <div className='w-full max-w-3xl'>
                    {
                        loading ? (
                            loadingCart?.map((i, index) => (
                                <div key={index + "cartItems"} className='w-full bg-slate-200 h-28 my-2 border border-slate-200 animate-pulse rounded'>

                                </div>
                            ))
                        ) : (
                            data?.map((product, index) => (
                                <div key={product?._id + index} className='w-full h-40 bg-slate-50 md:h-32  my-2 border border-slate-300 rounded grid grid-cols-[130px,1fr]'>

                                    <div className='w-28 h-full border border-slate-300'>
                                        <img src={product?.productId?.productImage[0]} alt="" className='bg-slate-200  mix-blend-multiply object-scale-down max-h-40 md:max-h-32 p-1 w-full h-full' />
                                    </div>

                                    <div className='py-1 px-4 relative mx-2'>

                                        {/**Delete product */}
                                        <div title='delete' className='absolute right-0 cursor-pointer p-2 text-xl rounded-full hover:text-white hover:bg-red-700 bg-slate-50 text-red-600' onClick={() => deleteCartProduct(product?._id)}>
                                            <MdDeleteOutline className='hover:scale-125 transition-all' />
                                        </div>

                                        <h2 className='text-lg md:text-xl text-ellipsis line-clamp-1 font-semibold'> {product?.productId?.productName}</h2>
                                        <p className='capitalize text-slate-500'>{product?.productId?.category}</p>
                                        <div className='flex flex-col md:flex-row justify-between'>
                                            <p className='text-blue-700 font-semibold'>{displayCurrency(product?.productId?.sellingPrice)}</p>
                                            <p className='text-slate-500 font-semibold'><span className='text-black'>total : </span> {displayCurrency(product?.productId?.sellingPrice * product?.quantity)}</p>
                                        </div>


                                        <div className='flex items-center gap-3 mt-2'>
                                            <button
                                                className={`flex justify-center items-center border rounded text-xl w-6 h-6 ${product?.quantity < 2
                                                    ? 'text-gray-600 bg-gray-200 cursor-not-allowed'
                                                    : 'text-red-600 bg-red-50 hover:bg-red-600 hover:text-white'
                                                    }`}
                                                onClick={() => decreaseQty(product?._id, product?.quantity)}
                                                disabled={product?.quantity < 2}
                                            >
                                                -
                                            </button>
                                            <span className='text-lg'>{product?.quantity}</span>
                                            <button className='flex justify-center items-center border rounded text-xl text-green-600 w-6 h-6 bg-green-50 hover:bg-green-600 hover:text-white' onClick={() => increaseQty(product?._id, product?.quantity)}>+</button>
                                        </div>
                                    </div>

                                </div>
                            ))
                        )
                    }
                </div>

                {/**Total Products */}
                <div className='mt-5 lg:mt-0 w-full max-w-sm'>
                    {
                        loading ? (
                            <div className='h-36 bg-slate-200 rounded border border-slate-300'>
                                <h1 className=' py-2 bg-slate-200'></h1>

                                <div className='flex p-2 justify-between items-center'>
                                    <p className='font-bold text-slate-400 cursor-default'>Quantity :</p>
                                    <p className='font-semibold text-slate-400 cursor-default'>0</p>
                                </div>

                                <div className='flex p-2 justify-between items-center'>
                                    <p className='font-bold text-slate-400 cursor-default'>Total Price :</p>
                                    <p className='text-slate-400 font-semibold cursor-default'>{displayCurrency(0)}</p>
                                </div>

                                <div className='bg-slate-400 w-full h-12 flex items-center justify-center'>
                                    <button className=' text-slate-500 font-semibold text-xl cursor-default'> <MdOutlinePayment /></button>
                                    <p className='text-slate-500 font-semibold text-lg m-1 cursor-default'>Payment</p>
                                </div>


                            </div>
                        ) : (
                            totalQuantity > 0 && (

                                <div className='h-36 bg-slate-100 rounded border border-slate-300'>
                                    <h1 className='text-center font-bold py-2 bg-slate-600 text-white'>Summary</h1>

                                    <div className='flex p-2 justify-between items-center'>
                                        <p className='font-bold'>Quantity :</p>
                                        <p className='font-semibold'>{totalQuantity}</p>
                                    </div>

                                    <div className='flex p-2 justify-between items-center'>
                                        <p className='font-bold'>Total Price :</p>
                                        <p className='text-slate-600 font-semibold'>{displayCurrency(totalPrice)}</p>
                                    </div>

                                    <div className='bg-blue-600 w-full h-12 flex items-center justify-center cursor-pointer hover:bg-blue-700'>
                                        <button className=' text-white font-semibold text-xl'> <MdOutlinePayment /></button>
                                        <p className='text-white font-semibold text-lg m-1'>Payment</p>
                                    </div>


                                </div>
                            )
                        )
                    }
                </div>

            </div>

        </div>
    )
}

export default Cart;