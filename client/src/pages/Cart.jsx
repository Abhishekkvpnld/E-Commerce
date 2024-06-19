import React, { useContext, useEffect, useState } from 'react';
import axios from "axios";
import endPoints from '../../common/configApi';
import userContext from '../context/userContext';


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



    return (
        <div className='mx-auto p-6'>
            <div className='text-center text-xl my-4'>
                {
                    data?.length === 0 && !loading && (
                        <p>No Items</p>
                    )
                }
            </div>

            <div className='flex flex-col lg:flex-row gap-10 lg:justify-between'>

                {/**View Products */}
                <div className='w-full max-w-3xl'>
                    {
                        loading ? (
                            loadingCart?.map((i, index) => (
                                <div key={index + "cartItems"} className='w-full bg-slate-200 h-32 my-2 border border-slate-300 animate-pulse rounded'>

                                </div>
                            ))
                        ) : (
                            <div>

                            </div>
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

                            <div></div>
                        )
                    }
                </div>

            </div>

        </div>
    )
}

export default Cart;