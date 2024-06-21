import React, { useContext, useEffect, useRef, useState } from 'react';
import { getCategoryWiseProduct } from '../helpers/getCategoryWiseProducts';
import displayINRCurrency from '../helpers/displayCurrency';
import { MdArrowBackIosNew } from "react-icons/md";
import { MdArrowForwardIos } from "react-icons/md";
import addToCart from '../helpers/addToCart';
import { Link } from 'react-router-dom';
import userContext from '../context/userContext';
import scrollTop from '../helpers/scrollTop';



export const CategoryWiseProductDisplay = ({ category, heading }) => {

    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const { fetchAddToCart } = useContext(userContext);


    const loadingList = new Array(13).fill(null);


    const handleAddToCart = async (e, id) => {
        await addToCart(e, id);
        fetchAddToCart();
    };


    const fetchData = async () => {
        setLoading(true);
        const categoryProduct = await getCategoryWiseProduct(category);
        setLoading(false);

        setData(categoryProduct?.data);
    };

    useEffect(() => {
        fetchData();
    }, []);


    return (
        <div className='mx-auto px-4 my-6 relative py-1'>

            <h1 className='font-semibold text-2xl py-2'>{heading}</h1>

            <div className='grid grid-cols-[repeat(auto-fit,minmax(300px,320px))]  md:gap-6 overflow-scroll scrollbar-none transition-all'>

                {
                    loading ? (
                        loadingList?.map((product, index) => (

                            <div key={index} className='bg-slate-50 w-full min-w-[280px] md:min-w-[320px] max-w-[280px] md:max-w-[320px] rounded-sm shadow'>

                                <div className='bg-slate-200 h-48 p-3 min-w-[28 0px] md:min-w-[145px] flex items-center justify-center animate-pulse'>

                                </div>

                                <div className='p-4 grid gap-2'>

                                    <h1 className='bg-slate-200 p-2 animate-pulse'></h1>
                                    <p className='bg-slate-200 p-1 animate-pulse'></p>

                                    <div className='flex gap-2'>
                                        <p className='bg-slate-200 w-full p-1 animate-pulse'></p>
                                        <p className='bg-slate-200 w-full p-1 animate-pulse'></p>
                                    </div>

                                    <button className='text-sm text-white bg-slate-200 px-16 py-3 rounded'></button>

                                </div>

                            </div>
                        ))
                    ) : (
                        data?.map((product, index) => (

                            <Link to={"/product-details/" + product?._id} key={index} className='bg-slate-50 w-full min-w-[280px] md:min-w-[320px] max-w-[280px] md:max-w-[320px] rounded-sm shadow' onClick={scrollTop}>

                                <div className='bg-slate-200 h-48 p-3 min-w-[28 0px] md:min-w-[145px] flex items-center justify-center'>
                                    <img src={product?.productImage[0]} alt="img" className='h-full mix-blend-multiply object-scale-down hover:scale-110 transition-all' />
                                </div>

                                <div className='p-4 grid gap-2'>

                                    <h1 className='font-medium text-base md:text-lg text-ellipsis line-clamp-1 text-black'>{product?.productName}</h1>
                                    <p className='capitalize text-slate-600'>{product?.category}</p>

                                    <div className='flex gap-1'>
                                        <p className='text-blue-700 font-semibold'>{displayINRCurrency(product?.sellingPrice)}</p>
                                        <p className='text-red-500 line-through'>{displayINRCurrency(product?.price)}</p>
                                    </div>

                                    <button className='text-sm text-white bg-green-700 hover:bg-green-800 px-2 py-1 rounded' onClick={(e) => handleAddToCart(e, product?._id)}>Add to Cart</button>

                                </div>

                            </Link>
                        ))
                    )
                }
            </div>

        </div>
    )
};
