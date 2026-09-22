import React, { useContext, useEffect, useRef, useState } from 'react';
import { getCategoryWiseProduct } from '../helpers/getCategoryWiseProducts';
import displayINRCurrency from '../helpers/displayCurrency';
import { MdArrowBackIosNew } from "react-icons/md";
import { MdArrowForwardIos } from "react-icons/md";
import addToCart from '../helpers/addToCart';
import { Link } from 'react-router-dom';
import userContext from '../context/userContext';



export const VerticalCardProduct = ({ category, heading }) => {


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
        scrollElement.current.scrollBy({ left: 300, behavior: 'smooth' });
    };

    const scrollLeft = () => {
        scrollElement.current.scrollBy({ left: -300, behavior: 'smooth' });
    };

    return (
        <div className='mx-auto px-4 my-6 relative py-1'>

            <style>{`
                @keyframes cardFadeIn {
                    from { opacity: 0; transform: translateY(8px); }
                    to { opacity: 1; transform: translateY(0); }
                }
                .card-fade-in {
                    animation: cardFadeIn 0.4s ease-out both;
                }
            `}</style>

            <h1 className='font-semibold text-lg md:text-2xl py-2 text-slate-800'>{heading}</h1>

            <div className='flex items-center gap-3 md:gap-6 overflow-scroll scrollbar-none scroll-smooth snap-x transition-all py-1' ref={scrollElement}>


                <button onClick={scrollLeft} className='shadow-sm p-2 rounded-full bg-white ring-1 ring-slate-200 hover:shadow-md hover:ring-slate-300 active:scale-90 transition-all duration-200 absolute left-1 top-1/2 -translate-y-1/2 z-10 hidden md:block text-slate-600'><MdArrowBackIosNew size={14} /></button>
                <button onClick={scrollRight} className='shadow-sm p-2 rounded-full bg-white ring-1 ring-slate-200 hover:shadow-md hover:ring-slate-300 active:scale-90 transition-all duration-200 absolute right-1 top-1/2 -translate-y-1/2 z-10 hidden md:block text-slate-600'><MdArrowForwardIos size={14} /></button>


                {
                    loading ? (
                        loadingList?.map((product, index) => (

                            <div key={index} className='bg-slate-50 w-full min-w-[160px] md:min-w-[320px] max-w-[160px] md:max-w-[320px] rounded-lg ring-1 ring-slate-200 overflow-hidden'>

                                <div className='bg-slate-200 h-36 md:h-48 p-3 flex items-center justify-center animate-pulse'>

                                </div>

                                <div className='p-4 grid gap-2'>

                                    <h1 className='bg-slate-200 rounded p-2 animate-pulse'></h1>
                                    <p className='bg-slate-200 rounded p-1 w-2/5 animate-pulse'></p>

                                    <div className='flex gap-2'>
                                        <p className='bg-slate-200 rounded w-full p-1 animate-pulse'></p>
                                        <p className='bg-slate-200 rounded w-full p-1 animate-pulse'></p>
                                    </div>

                                    <button className='text-sm text-white bg-slate-200 px-16 py-3 rounded-md animate-pulse'></button>

                                </div>

                            </div>
                        ))
                    ) : (
                        data?.map((product, index) => (

                            <Link
                                to={"/product-details/" + product?._id}
                                key={index}
                                style={{ animationDelay: `${Math.min(index, 10) * 40}ms` }}
                                className='card-fade-in group bg-slate-50 w-full min-w-[160px] md:min-w-[320px] max-w-[160px] md:max-w-[320px] rounded-lg ring-1 ring-slate-200 overflow-hidden shadow-sm snap-start transition-all duration-300 ease-out hover:shadow-lg hover:ring-slate-300 hover:-translate-y-1'
                            >

                                <div className='bg-slate-200 h-36 md:h-48 p-3 flex items-center justify-center overflow-hidden'>
                                    <img src={product?.productImage[0]} alt="img" className='h-full mix-blend-multiply object-scale-down transition-transform duration-500 ease-out group-hover:scale-105' />
                                </div>

                                <div className='p-4 grid gap-1.5'>

                                    <h1 className='font-semibold text-base md:text-lg text-ellipsis line-clamp-1 text-slate-800'>{product?.productName}</h1>
                                    <p className='capitalize text-slate-500 text-sm'>{product?.category}</p>

                                    <div className='flex items-baseline gap-2 pt-0.5'>
                                        <p className='text-slate-900 font-bold text-lg'>{displayINRCurrency(product?.sellingPrice)}</p>
                                        <p className='text-slate-400 line-through text-sm'>{displayINRCurrency(product?.price)}</p>
                                    </div>

                                    <button
                                        className='text-sm text-white bg-emerald-700 hover:bg-emerald-800 active:scale-95 shadow-sm hover:shadow transition-all duration-200 px-2 py-2 mt-2 rounded-md font-medium'
                                        onClick={(e) => handleAddToCart(e, product?._id)}
                                    >
                                        Add to Cart
                                    </button>

                                </div>

                            </Link>
                        ))
                    )
                }
            </div>

        </div>
    )
};
