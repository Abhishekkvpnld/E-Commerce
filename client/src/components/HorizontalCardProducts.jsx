import React, { useContext, useEffect, useRef, useState } from 'react';
import { getCategoryWiseProduct } from '../helpers/getCategoryWiseProducts';
import displayINRCurrency from '../helpers/displayCurrency';
import { MdArrowBackIosNew } from "react-icons/md";
import { MdArrowForwardIos } from "react-icons/md";
import { Link } from 'react-router-dom';
import addToCart from '../helpers/addToCart';
import userContext from '../context/userContext';



const HorizontalCardProducts = ({ category, heading }) => {


    const [scroll, setScroll] = useState(0);
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);

    const scrollElement = useRef();
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


    const scrollRight = () => {
        scrollElement.current.scrollLeft += 300;
    };

    const scrollLeft = () => {
        scrollElement.current.scrollLeft -= 300;
    };

    return (
        <div className='mx-auto px-4 my-6 relative'>

            <h1 className='font-semibold text-2xl py-2'>{heading}</h1>

            <div className='flex items-center gap-2 md:gap-6 overflow-scroll scrollbar-none transition-all' ref={scrollElement}>


                <button onClick={scrollLeft} className='shadow-md p-1 rounded-full bg-white hover:bg-opacity-50 absolute left-0 hidden md:block '><MdArrowBackIosNew /></button>
                <button onClick={scrollRight} className='shadow-md p-1 rounded-full bg-white hover:bg-opacity-50 absolute right-0 hidden md:block'><MdArrowForwardIos /></button>


                {
                    loading ? (
                      
                        loadingList?.map((i, index) => (

                            <div key={index} className='flex bg-slate-50 w-full min-w-[280px] md:min-w-[320px] max-w-[280px] md:max-w-[320px] h-36 rounded-lg shadow'>
    
                                <div className='bg-slate-200 h-full p-3 min-w-[120px] md:min-w-[145px] animate-pulse '>

                                </div>
    
                                <div className='p-4 grid gap-2'>
    
                                    <h1 className='font-medium text-base md:text-lg text-ellipsis line-clamp-1 text-black bg-slate-200 animate-pulse '></h1>
                                    <p className='bg-slate-200 animate-pulse '></p>
    
                                    <div className='flex gap-1'>
                                        <p className='bg-slate-200 w-full animate-pulse '></p>
                                        <p className='bg-slate-200 w-full animate-pulse '></p>
                                    </div>
    
                                    <button className='text-sm text-white bg-slate-200 w-200 px-16 py-1 rounded animate-pulse '></button>
    
                                </div>
    
                            </div>
                        ))

                    ) : (
                        data?.map((product, index) => (

                            <Link to={"/product-details/"+product?._id} key={index} className='flex bg-slate-50 w-full min-w-[280px] md:min-w-[320px] max-w-[280px] md:max-w-[320px] h-36 rounded-sm shadow'>

                                <div className='bg-slate-200 h-full p-3 min-w-[120px] md:min-w-[145px] '>
                                    <img src={product?.productImage[0]} alt="img" className='h-full mix-blend-multiply object-scale-down hover:scale-110 transition-all' />
                                </div>

                                <div className='p-4 grid'>

                                    <h1 className='font-medium text-base md:text-lg text-ellipsis line-clamp-1 text-black'>{product?.productName}</h1>
                                    <p className='capitalize text-slate-600'>{product?.category}</p>

                                    <div className='flex gap-1'>
                                        <p className='text-blue-700 font-semibold'>{displayINRCurrency(product?.sellingPrice)}</p>
                                        <p className='text-red-500 line-through'>{displayINRCurrency(product?.price)}</p>
                                    </div>

                                    <button className='text-sm text-white bg-green-700 hover:bg-green-800 px-2 py-1 rounded' onClick={(e)=>handleAddToCart(e,product?._id)}>Add to Cart</button>

                                </div>

                            </Link>
                        ))
                    )
                }
            </div>

        </div>
    )
}

export default HorizontalCardProducts;