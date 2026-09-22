import { useContext, useEffect, useRef, useState } from 'react';
import { getCategoryWiseProduct } from '../helpers/getCategoryWiseProducts';
import displayINRCurrency from '../helpers/displayCurrency';
import { MdArrowBackIosNew } from "react-icons/md";
import { MdArrowForwardIos } from "react-icons/md";
import { Link } from 'react-router-dom';
import addToCart from '../helpers/addToCart';
import userContext from '../context/userContext';
import scrollTop from '../helpers/scrollTop';



const HorizontalCardProducts = ({ category, heading }) => {


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

            <h1 className='font-semibold text-lg md:text-2xl py-2 text-slate-800'>{heading}</h1>

            <div className='flex items-center gap-2 md:gap-6 overflow-scroll scrollbar-none scroll-smooth snap-x transition-all' ref={scrollElement}>


                <button onClick={scrollLeft} className='shadow-lg p-2 rounded-full bg-white hover:bg-slate-100 active:scale-90 transition-all absolute left-1 top-1/2 -translate-y-1/2 z-10 hidden md:block '><MdArrowBackIosNew /></button>
                <button onClick={scrollRight} className='shadow-lg p-2 rounded-full bg-white hover:bg-slate-100 active:scale-90 transition-all absolute right-1 top-1/2 -translate-y-1/2 z-10 hidden md:block'><MdArrowForwardIos /></button>


                {
                    loading ? (

                        loadingList?.map((i, index) => (

                            <div key={index} className='flex bg-slate-50 w-full min-w-[220px] md:min-w-[320px] max-w-[220px] md:max-w-[320px] h-36 rounded-xl shadow-sm ring-1 ring-slate-100'>

                                <div className='bg-gradient-to-br from-slate-200 to-slate-100 h-full p-3 min-w-[90px] md:min-w-[145px] rounded-l-xl animate-pulse '>

                                </div>

                                <div className='p-4 grid gap-2'>

                                    <h1 className='font-medium text-base md:text-lg text-ellipsis line-clamp-1 text-black bg-slate-200 rounded animate-pulse '></h1>
                                    <p className='bg-slate-200 rounded animate-pulse '></p>

                                    <div className='flex gap-1'>
                                        <p className='bg-slate-200 rounded w-full animate-pulse '></p>
                                        <p className='bg-slate-200 rounded w-full animate-pulse '></p>
                                    </div>

                                    <button className='text-sm text-white bg-slate-200 rounded w-200 px-16 py-1 animate-pulse '></button>

                                </div>

                            </div>
                        ))

                    ) : (
                        data?.map((product, index) => (

                            <Link to={"/product-details/" + product?._id} key={index} className='group flex bg-slate-50 w-full min-w-[220px] md:min-w-[320px] max-w-[220px] md:max-w-[320px] h-36 rounded-xl ring-1 ring-slate-100 shadow-sm snap-start transition-all duration-300 hover:shadow-lg hover:-translate-y-1 hover:ring-slate-200' onClick={scrollTop} >

                                <div className='bg-slate-100 h-full p-3 min-w-[90px] md:min-w-[145px] rounded-l-xl overflow-hidden '>
                                    <img src={product?.productImage[0]} alt="img" className='h-full mix-blend-multiply object-scale-down transition-transform duration-500 ease-out group-hover:scale-110' />
                                </div>

                                <div className='p-2 grid'>

                                    <h1 className='font-medium text-base md:text-lg text-ellipsis line-clamp-1 text-slate-800'>{product?.productName}</h1>
                                    <p className='capitalize text-slate-500'>{product?.category}</p>

                                    <div className='flex gap-1'>
                                        <p className='text-blue-700 font-semibold'>{displayINRCurrency(product?.sellingPrice)}</p>
                                        <p className='text-red-500 line-through'>{displayINRCurrency(product?.price)}</p>
                                    </div>

                                    <button className='text-sm text-white bg-green-700 hover:bg-green-800 active:scale-95 transition-all px-2 py-1 rounded font-medium' onClick={(e) => handleAddToCart(e, product?._id)}>Add to Cart</button>

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
