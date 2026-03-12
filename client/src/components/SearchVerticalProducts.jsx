import { useContext } from 'react'
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
        <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-4 p-1'>

            {
                loading ? (
                    loadingList?.map((product, index) => (

                        <div key={index} className='bg-slate-50 rounded-sm shadow'>

                            <div className='bg-slate-200 h-36 md:h-48 p-3 flex items-center justify-center animate-pulse'>

                            </div>

                            <div className='p-3 grid gap-2'>

                                <h1 className='bg-slate-200 p-2 animate-pulse'></h1>
                                <p className='bg-slate-200 p-1 animate-pulse'></p>

                                <div className='flex gap-2'>
                                    <p className='bg-slate-200 w-full p-1 animate-pulse'></p>
                                    <p className='bg-slate-200 w-full p-1 animate-pulse'></p>
                                </div>

                                <button className='text-sm text-white bg-slate-200 w-full py-2 rounded'></button>

                            </div>

                        </div>
                    ))
                ) : (
                    data?.map((product, index) => (

                        <Link to={"/product-details/" + product?._id} key={index} className='bg-slate-50 rounded-sm shadow border hover:shadow-md transition-shadow' onClick={scrollTop}>

                            <div className='bg-slate-200 h-36 md:h-48 p-3 flex items-center justify-center '>
                                <img src={product?.productImage[0]} alt="img" className='h-[80%] mix-blend-multiply object-scale-down hover:scale-110 transition-all' />
                            </div>

                            <div className='p-3 grid gap-1'>

                                <h1 className='font-medium text-sm md:text-base text-ellipsis line-clamp-2 text-black'>{product?.productName}</h1>
                                <p className='capitalize text-slate-500 text-xs'>{product?.category}</p>

                                <div className='flex flex-wrap gap-1 mt-1'>
                                    <p className='text-blue-700 font-semibold text-sm'>{displayINRCurrency(product?.sellingPrice)}</p>
                                    <p className='text-red-500 line-through text-xs self-center'>{displayINRCurrency(product?.price)}</p>
                                </div>

                                <button className='text-xs md:text-sm text-white bg-green-700 hover:bg-green-800 px-2 py-1.5 rounded mt-1 w-full' onClick={(e) => handleAddToCart(e, product?._id)}>Add to Cart</button>

                            </div>

                        </Link>
                    ))
                )
            }
        </div>
    )
}

export default SearchVerticalProducts;