import React, { useEffect, useState } from 'react';
import { getCategoryWiseProduct } from '../helpers/getCategoryWiseProducts';
import displayINRCurrency from '../helpers/displayCurrency';

const HorizontalCardProducts = ({ category, heading }) => {

    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(false);

    const loadingList = new Array(13).fill(null);

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
        <div className='mx-auto px-4 my-6'>

            <h1 className='font-semibold text-2xl py-2'>{heading}</h1>

            <div className='flex items-center gap-2 md:gap-6 overflow-scroll scrollbar-none'>
                {
                    data?.map((product, index) => (

                        <div key={index} className='flex bg-slate-50 w-full min-w-[280px] md:min-w-[320px] max-w-[280px] md:max-w-[320px] h-36 rounded-sm shadow'>
                            
                            <div className='bg-slate-200 h-full p-3 min-w-[120px] md:min-w-[145px] '>
                                <img src={product?.productImage[0]} alt="img" className='h-full object-scale-down hover:scale-110 transition-all' />
                            </div>

                            <div className='p-4 grid'>

                                <h1 className='font-medium text-base md:text-lg text-ellipsis line-clamp-1 text-black'>{product?.productName}</h1>
                                <p className='capitalize text-slate-600'>{product?.category}</p>

                                <div className='flex gap-1'>
                                    <p className='text-blue-700 font-semibold'>{displayINRCurrency(product?.sellingPrice)}</p>
                                    <p className='text-red-500 line-through'>{displayINRCurrency(product?.price)}</p>
                                </div>

                                <button className='text-sm text-white bg-green-700 hover:bg-green-800 px-2 py-1 rounded'>Add to Cart</button>

                            </div>

                        </div>
                    ))
                }
            </div>

        </div>
    )
}

export default HorizontalCardProducts;