import React, { useContext, useEffect, useState } from 'react';
import axios from "axios";
import endPoints from '../../common/configApi';
import userContext from '../context/userContext';
import displayCurrency from "../helpers/displayCurrency";
import toast from "react-hot-toast";
import { MdDeleteOutline } from "react-icons/md";



const Cart = () => {

    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(false);
    const contexts = useContext(userContext);
    const loadingCart = new Array(contexts?.cartProductCount).fill(null);


    const fetchCartData = async () => {

        try {
            setLoading(true);
            const response = await axios.get(endPoints.cartViewProduct.url, { withCredentials: true });
            setLoading(false);
            const fetchData = response?.data;

            if (fetchData?.success) {
                setData(fetchData?.data);
            };

        } catch (error) {
            console.log(error?.response?.data?.message);
        };
    };


    useEffect(() => {
        fetchCartData();
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
    }


    return (
        <div className='mx-auto p-6 bg-white'>
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
                                <div key={product?._id + index} className='w-full bg-slate-50 h-32 my-2 border border-slate-300 rounded grid grid-cols-[130px,1fr]'>

                                    <div className='w-28 h-full border border-slate-300'>
                                        <img src={product?.productId?.productImage[0]} alt="" className='bg-slate-200 max-h-32 p-1 w-full h-full mix-blend-multiply object-scale-down' />
                                    </div>

                                    <div className='py-1 px-4 relative mx-2'>

                                        {/**Delete product */}
                                        <div title='delete' className='absolute right-0 cursor-pointer p-2 text-xl rounded-full hover:text-white hover:bg-red-700 bg-slate-50 text-red-600' onClick={() => deleteCartProduct(product?._id)}>
                                            <MdDeleteOutline className='hover:scale-125 transition-all' />
                                        </div>

                                        <h2 className='text-lg md:text-xl text-ellipsis line-clamp-1 font-semibold'> {product?.productId?.productName}</h2>
                                        <p className='capitalize text-slate-500'>{product?.productId?.category}</p>
                                        <p className='text-blue-700'>{displayCurrency(product?.productId?.sellingPrice)}</p>


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
                            <div className='h-36 bg-slate-200 animate-pulse rounded border border-slate-300'>
                            </div>
                        ) : (

                            <div className='h-36 bg-white rounded border border-slate-300'>
                            </div>
                        )
                    }
                </div>

            </div>

        </div>
    )
}

export default Cart;