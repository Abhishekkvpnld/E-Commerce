import { useCallback, useContext, useEffect, useState } from 'react';
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
        }
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

            <div className='min-h-[200px] flex flex-col lg:flex-row gap-6 items-center lg:items-start'>
                {/**product Image */}
                <div className='h-auto flex flex-col lg:flex-row-reverse gap-4 items-center lg:items-start'>

                    {
                        loading ? (
                            <div className='w-[300px] h-[300px] lg:h-96 lg:w-96 bg-slate-100 rounded-lg ring-1 ring-slate-200 flex items-center justify-center animate-pulse'>
                            </div>
                        ) : (
                            <div className='w-[300px] h-[300px] lg:h-96 lg:w-96 bg-slate-50 rounded-lg ring-1 ring-slate-200 flex items-center relative p-4'>
                                <img
                                    src={activeImage}
                                    alt={data?.productName}
                                    className='h-full w-full mix-blend-multiply object-scale-down transition-opacity duration-200'
                                    onMouseMove={handleImageZoom}
                                    onMouseLeave={handleLeaveImageZoom}
                                />

                                {/**Product Zoom*/}
                                {
                                    zoomImage && (
                                        <div className='hidden lg:block absolute min-w-[500px] min-h-[400px] bg-slate-50 ring-1 ring-slate-200 shadow-lg rounded-lg p-2 -right-[516px] top-0 overflow-hidden z-10'>

                                            <div className='w-full h-full min-h-[400px] min-w-[500px] mix-blend-multiply scale-150 rounded' style={
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
                                                <div className='h-20 w-20 bg-slate-100 rounded-md ring-1 ring-slate-200 animate-pulse' key={index}>
                                                </div>)
                                        })
                                    }
                                </div>

                            ) : (
                                <div className='flex gap-2 lg:flex-col overflow-y-scroll overflow-x-scroll scrollbar-none max-h-[410px] max-w-[320px] h-full py-1 px-0.5'>
                                    {
                                        data?.productImage?.map((imageURL, index) => {
                                            const isActive = imageURL === activeImage;
                                            return (
                                                <div
                                                    className={`h-20 w-20 shrink-0 bg-slate-50 rounded-md p-1 cursor-pointer transition-all duration-150 ${isActive
                                                            ? 'ring-2 ring-indigo-600'
                                                            : 'ring-1 ring-slate-200 hover:ring-slate-300'
                                                        }`}
                                                    key={imageURL + index}
                                                >
                                                    <img
                                                        src={imageURL}
                                                        onMouseEnter={() => handleMouseEnterProductImage(imageURL)}
                                                        onClick={() => handleMouseEnterProductImage(imageURL)}
                                                        alt=""
                                                        className='w-full h-full object-scale-down mix-blend-multiply'
                                                    />
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
                        <div className='flex flex-col gap-2 mt-2 w-full'>
                            <p className='bg-slate-200 rounded-full inline-block w-24 h-6 animate-pulse'></p>
                            <h2 className='w-full h-8 bg-slate-200 rounded animate-pulse'></h2>
                            <p className='w-32 h-4 bg-slate-200 rounded animate-pulse'></p>

                            <div className='flex items-center text-slate-200 gap-1 animate-pulse'>
                                <FaStar />
                                <FaStar />
                                <FaStar />
                                <FaStar />
                                <FaStar />
                            </div>

                            <div className='flex gap-2 items-center my-2 w-1/2'>
                                <p className='bg-slate-200 w-full h-6 rounded animate-pulse'></p>
                                <p className='bg-slate-200 w-full h-6 rounded animate-pulse'></p>
                            </div>

                            <div className='flex items-center gap-3 my-2'>
                                <div className='bg-slate-200 rounded-lg h-9 min-w-[120px] animate-pulse'></div>
                                <div className='bg-slate-200 rounded-lg h-9 min-w-[120px] animate-pulse'></div>
                            </div>

                            <div>
                                <p className='bg-slate-200 rounded my-1 w-32 h-6 animate-pulse'></p>
                                <p className='bg-slate-200 rounded my-1 w-full h-3 animate-pulse'></p>
                                <p className='bg-slate-200 rounded my-1 w-full h-3 animate-pulse'></p>
                                <p className='bg-slate-200 rounded my-1 w-full h-3 animate-pulse'></p>
                                <p className='bg-slate-200 rounded my-1 w-4/5 h-3 animate-pulse'></p>
                            </div>

                        </div>
                    ) : (
                        <div className='flex flex-col gap-1 mt-2'>
                            <p className='bg-indigo-700 text-white text-sm font-medium rounded-full inline-block w-fit px-3 py-1'>{data?.brandName}</p>
                            <h2 className='text-3xl lg:text-4xl font-bold text-slate-900 mt-1'>{data?.productName}</h2>
                            <p className='capitalize text-slate-500'>{data?.category}</p>

                            <div className='flex items-center text-amber-500 gap-1 mt-1'>
                                <FaStar />
                                <FaStar />
                                <FaStar />
                                <FaStar />
                                <FaRegStarHalfStroke />
                            </div>

                            <div className='flex items-baseline gap-3 font-bold text-2xl lg:text-3xl my-2'>
                                <p className='text-slate-900'>{displayINRCurrency(data?.sellingPrice)}</p>
                                <p className='text-slate-400 font-medium line-through text-lg'>{displayINRCurrency(data?.price)}</p>
                            </div>

                            <div className='flex items-center gap-3 my-2'>
                                <button
                                    className='border-2 border-slate-300 font-semibold text-slate-700 rounded-lg px-4 py-2 min-w-[130px] hover:bg-slate-50 hover:border-slate-400 active:scale-95 transition-all duration-150'
                                    onClick={(e) => handleAddToCart(e, data?._id)}
                                >
                                    Add To Cart
                                </button>
                                <button
                                    className='bg-emerald-700 font-semibold text-white rounded-lg px-4 py-2 min-w-[130px] shadow-sm hover:bg-emerald-800 hover:shadow active:scale-95 transition-all duration-150'
                                    onClick={(e) => handleBuyProduct(e, data?._id)}
                                >
                                    Buy Now
                                </button>
                            </div>

                            <div className='mt-2'>
                                <p className='font-semibold text-lg text-slate-800 my-1'>Description</p>
                                <p className='text-slate-600 leading-relaxed'>{data?.description}</p>
                            </div>

                        </div>
                    )
                }

            </div>

            <div className='mt-4'>
                {
                    data?.category && (
                        <CategoryWiseProductDisplay category={data?.category} heading={"Recommended Products"} />
                    )
                }
            </div>

        </div>
    )
}

export default ProductDetails;
