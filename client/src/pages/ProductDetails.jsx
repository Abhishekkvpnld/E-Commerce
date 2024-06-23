import React, { useCallback, useContext, useEffect, useState } from 'react';
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import endPoints from '../../common/configApi';
import { FaStar } from "react-icons/fa";
import { FaRegStarHalfStroke } from "react-icons/fa6";
import displayINRCurrency from '../helpers/displayCurrency';
import { CategoryWiseProductDisplay } from '../components/CategoryWiseProductDisplay';
import addToCart from '../helpers/addToCart';
import userContext from '../context/userContext';



const ProductDetails = () => {
    const [data, setData] = useState({
        productName: "",
        brandName: "",
        category: "",
        productImage: [],
        description: "",
        price: "",
        sellingPrice: ""
    });

    const [loading, setLoading] = useState(false);
    const [activeImage, setActiveImage] = useState("");
    const [zoomImageCoordinate, setZoomImageCoordinate] = useState({ x: "", y: "" });
    const [zoomImage, setZoomImage] = useState(false);

    const productImageLoading = new Array(4).fill(null);
    const params = useParams();
    const navigate = useNavigate();

    const { fetchAddToCart } = useContext(userContext);

    const fetchProductData = async () => {
        setLoading(true);
        const response = await axios.post(endPoints.getProductDetails.url, { productId: params?.id });
        setLoading(false);
        const productData = response?.data;
        if (productData?.success) {
            setData(productData?.data);
            setActiveImage(productData?.data?.productImage[0]);
        };
    };

    const handleMouseEnterProductImage = (url) => {
        setActiveImage(url);
    };

    const handleImageZoom = useCallback((e) => {
        setZoomImage(true);
        const { top, left, width, height } = e.target.getBoundingClientRect();

        const x = (e.clientX - left) / width;
        const y = (e.clientY - top) / height;

        setZoomImageCoordinate({
            x,
            y
        });

    }, [zoomImageCoordinate]);

    const handleLeaveImageZoom = () => {
        setZoomImage(false);
    };


    const handleAddToCart = async (e, proId) => {
        await addToCart(e, proId);
        fetchAddToCart();
    };


    const handleBuyProduct = async (e, proId) => {
        await addToCart(e, proId);
        fetchAddToCart();
        navigate("/cart");
    };


    useEffect(() => {
        fetchProductData();
    }, [params]);

    return (
        <div className='container mx-auto p-4'>

            <div className='min-h-[200px] flex flex-col lg:flex-row gap-4 items-center'>
                {/**product Image */}
                <div className='h-96 flex flex-col lg:flex-row-reverse gap-4 rounded items-center justify-center'>

                    {
                        loading ? (
                            <div className='w-[300px] h-[300px] lg:h-96 lg:w-96 bg-slate-200 rounded flex items-center justify-center animate-pulse'>
                            </div>
                        ) : (
                            <div className='w-[300px] h-[300px] lg:h-96 lg:w-96 bg-slate-200 rounded flex items-center relative p-1'>
                                <img src={activeImage} alt="" className='h-full w-full mix-blend-multiply object-scale-down ' onMouseMove={handleImageZoom} onMouseLeave={handleLeaveImageZoom} />

                                {/**Product Zoom*/}
                                {
                                    zoomImage && (
                                        <div className='hidden lg:block absolute min-w-[500px] min-h-[400px] bg-slate-200 p-1 -right-[510px] top-0 overflow-hidden'>

                                            <div className='w-full h-full min-h-[400px] min-w-[500px] mix-blend-multiply scale-150' style={
                                                {
                                                    backgroundImage: `url(${activeImage})`,
                                                    backgroundRepeat: "no-repeat",
                                                    backgroundPosition: `${zoomImageCoordinate.x * 100}% ${zoomImageCoordinate.y * 100}%`
                                                }
                                            }>

                                            </div>
                                        </div>
                                    )
                                }

                            </div>
                        )
                    }

                    <div className=''>
                        {
                            loading ? (

                                <div className='flex gap-2 lg:flex-col overflow-scroll scrollbar-none h-full'>
                                    {
                                        productImageLoading.map((i, index) => {
                                            return (
                                                <div className='h-20 w-20 bg-slate-200 rounded animate-pulse' key={index}>
                                                </div>)
                                        })
                                    }
                                </div>

                            ) : (
                                <div className='flex gap-2 lg:flex-col overflow-scroll scrollbar-none h-full'>
                                    {
                                        data?.productImage?.map((imageURL, index) => {
                                            return (
                                                <div className='h-20 w-20 bg-slate-200 rounded p-1 cursor-pointer' key={imageURL}>
                                                    <img src={imageURL} onMouseEnter={() => handleMouseEnterProductImage(imageURL)} onClick={() => handleMouseEnterProductImage(imageURL)} alt="" className='w-full h-full object-scale-down mix-blend-multiply' />
                                                </div>
                                            )
                                        })
                                    }
                                </div>
                            )
                        }
                    </div>
                </div>

                {/**Product Details */}
                {
                    loading ? (
                        <div className='flex flex-col gap-1 mt-2 '>
                            <p className='bg-slate-200 rounded-md inline-block w-full h-6 px-2 py-1 animate-pulse'></p>
                            <h2 className='w-full h-8 bg-slate-200 rounded p-1 animate-pulse'></h2>
                            <p className='w-full h-4 bg-slate-200 rounded p-1 animate-pulse'></p>

                            <div className='flex items-center text-slate-200 gap-1 animate-pulse'>
                                <FaStar />
                                <FaStar />
                                <FaStar />
                                <FaStar />
                                <FaStar />
                            </div>

                            <div className='flex gap-2 items-center my-2 '>
                                <p className='bg-slate-200 w-full h-6 rounded animate-pulse'></p>
                                <p className='bg-slate-200 w-full h-6 rounded animate-pulse'></p>
                            </div>

                            <div className='flex items-center gap-3 my-2'>
                                <button className='border-2 text-slate-300 border-slate-300 rounded-lg px-3 py-1 min-w-[120px] cursor-default animate-pulse'>Buy</button>
                                <button className='border-2 text-slate-300 border-slate-300 rounded-lg px-3 py-1 min-w-[120px] cursor-default animate-pulse' >Add To Cart</button>
                            </div>

                            <div>
                                <p className='bg-slate-200 my-1 w-full h-9 animate-pulse'></p>
                                <p className='bg-slate-200 my-1 w-full h-3 animate-pulse'></p>
                                <p className='bg-slate-200 my-1 w-full h-3 animate-pulse'></p>
                                <p className='bg-slate-200 my-1 w-full h-3 animate-pulse'></p>
                                <p className='bg-slate-200 my-1 w-full h-3 animate-pulse'></p>
                                <p className='bg-slate-200 my-1 w-full h-3 animate-pulse'></p>
                                <p className='bg-slate-200 my-1 w-full h-3 animate-pulse'></p>
                                <p className='bg-slate-200 my-1 w-full h-3 animate-pulse'></p>
                                <p className='bg-slate-200 my-1 w-full h-3 animate-pulse'></p>
                            </div>

                        </div>
                    ) : (
                        <div className='flex flex-col gap-1 mt-2'>
                            <p className='bg-violet-600 text-white rounded-full inline-block w-fit px-2 py-1'>{data?.brandName}</p>
                            <h2 className='text-3xl lg:text-4xl font-medium'>{data?.productName}</h2>
                            <p className='capitalize text-slate-600'>{data?.category}</p>

                            <div className='flex items-center text-red-500 gap-1'>
                                <FaStar />
                                <FaStar />
                                <FaStar />
                                <FaStar />
                                <FaRegStarHalfStroke />
                            </div>

                            <div className='flex gap-2 items-center font-medium text-xl lg:text-2xl my-2 '>
                                <p className='text-blue-600'>{displayINRCurrency(data?.sellingPrice)}</p>
                                <p className='text-slate-400 line-through'>{displayINRCurrency(data?.price)}</p>
                            </div>

                            <div className='flex items-center gap-3 my-2'>
                                <button className='border-2 border-red-700 font-semibold text-red-800 rounded-lg px-3 py-1 min-w-[120px] hover:bg-red-800 hover:text-white' onClick={(e)=>handleBuyProduct(e,data?._id)}>Buy</button>
                                <button className='border-2 border-emerald-700 font-semibold bg-green-200 text-black-600 rounded-lg px-3 py-1 min-w-[120px] hover:bg-green-700 hover:text-white' onClick={(e) => handleAddToCart(e, data?._id)}>Add To Cart</button>
                            </div>

                            <div>
                                <p className='font-medium text-xl text-slate-700 my-1'>Description</p>
                                <p className='ml-2'>{data?.description}</p>
                            </div>

                        </div>
                    )
                }

            </div>

            {
                data?.category && (
                    <CategoryWiseProductDisplay category={data?.category} heading={"Recommended Products"} />
                )
            }

        </div>
    )
}

export default ProductDetails;