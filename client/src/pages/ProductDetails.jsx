import React, { useEffect, useState } from 'react';
import { useParams } from "react-router-dom";
import axios from "axios";
import endPoints from '../../common/configApi';
import { FaStar } from "react-icons/fa";
import { FaRegStarHalfStroke } from "react-icons/fa6";
import displayINRCurrency from '../helpers/displayCurrency';



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


    const params = useParams();

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

    const productImageLoading = new Array(4).fill(null);

    useEffect(() => {
        fetchProductData();
    }, []);

    return (
        <div className='container mx-auto p-4'>

            <div className='min-h-[200px] flex flex-col lg:flex-row gap-4'>
                {/**product Image */}
                <div className='h-96 flex flex-col lg:flex-row-reverse gap-4 rounded'>

                    <div className='w-[300px] h-[300px] lg:h-96 lg:w-96 bg-slate-200 rounded flex items-center justify-center'>
                        <img src={activeImage} alt="" className='h-full w-full mix-blend-multiply object-scale-down ' />
                    </div>

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
                        <button className='border-2 border-red-700 font-semibold text-red-800 rounded-lg px-3 py-1 min-w-[120px] hover:bg-red-800 hover:text-white'>Buy</button>
                        <button className='border-2 border-emerald-700 font-semibold text-black-600 rounded-lg px-3 py-1 min-w-[120px] hover:bg-green-700 hover:text-white'>Add To Cart</button>
                    </div>

                </div>
            </div>

        </div>
    )
}

export default ProductDetails;