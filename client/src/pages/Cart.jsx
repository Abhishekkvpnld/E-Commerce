import React, { useContext, useEffect, useState } from 'react';
import axios from "axios";
import endPoints from '../../common/configApi';
import userContext from '../context/userContext';
import displayCurrency from "../helpers/displayCurrency";


const Cart = () => {

    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(false);
    const contexts = useContext(userContext);
    const loadingCart = new Array(contexts?.cartProductCount).fill(null);
    console.log(data)

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



    return (
        <div className='mx-auto p-6 bg-slate-100'>
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
                                <div key={index + "cartItems"} className='w-full bg-slate-200 h-28 my-2 border border-slate-300 animate-pulse rounded'>

                                </div>
                            ))
                        ) : (
                            data?.map((product, index) => (
                                <div key={product?._id + index} className='w-full bg-white h-32 my-2 border border-slate-300 rounded grid grid-cols-[130px,1fr]'>

                                    <div className='w-28 h-full border border-slate-300'>
                                        <img src={product?.productId?.productImage[0]} alt="" className='bg-slate-200 w-full h-full mix-blend-multiply object-scale-down' />
                                    </div>

                                    <div className='py-1 px-4'>
                                        <h2 className='text-lg md:text-xl text-ellipsis line-clamp-1 font-semibold'> {product?.productId?.productName}</h2>
                                        <p className='capitalize text-slate-500'>{product?.productId?.category}</p>
                                        <p className='text-blue-700'>{displayCurrency(product?.productId?.sellingPrice)}</p>


                                        <div className='flex items-center gap-3 mt-2'>
                                            <button className='flex justify-center items-center border rounded text-xl text-red-600 w-6 h-6 bg-red-50 hover:bg-red-600 hover:text-white'>-</button>
                                            <span className='text-lg'>{product?.quantity}</span>
                                            <button className='flex justify-center items-center border rounded text-xl text-green-600 w-6 h-6 bg-green-50 hover:bg-green-600 hover:text-white'>+</button>
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