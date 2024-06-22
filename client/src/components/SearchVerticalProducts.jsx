import React, { useContext } from 'react'
import scrollTop from '../helpers/scrollTop';
import displayINRCurrency from '../helpers/displayCurrency';
import addToCart from '../helpers/addToCart';
import userContext from '../context/userContext';
import { Link } from 'react-router-dom';

const SearchVerticalProducts = ({ loading, data = [] }) => {

    const { fetchAddToCart } = useContext(userContext);


    const loadingList = new Array(13).fill(null);


    const handleAddToCart = async (e, id) => {
        await addToCart(e, id);
        fetchAddToCart();
    };


    return (
        <div className='grid grid-cols-[repeat(auto-fit,minmax(200px,220px))]  md:gap-1 overflow-scroll scrollbar-none transition-all justify-center my-4'>

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

                        <Link to={"/product-details/" + product?._id} key={index} className='bg-slate-50 w-full min-w-[240px] md:min-w-[200px] max-w-[240px] md:max-w-[220px] rounded-sm shadow' onClick={scrollTop}>

                            <div className='bg-slate-200 h-48 p-3 min-w-[220px] md:min-w-[145px] flex items-center justify-center '>
                                <img src={product?.productImage[0]} alt="img" className='h-[80%] mix-blend-multiply object-scale-down hover:scale-110 transition-all' />
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
    )
}

export default SearchVerticalProducts;