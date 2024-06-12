import React, { useState } from 'react';
import { IoCloseOutline } from "react-icons/io5";
import productCategory from '../helpers/productCategory';
import { FaCloudUploadAlt } from "react-icons/fa";
import uploadImageToCloudinary from '../helpers/uploadImageToCloudinary';
import DisplayImage from './DisplayImage';
import { MdDeleteOutline } from "react-icons/md";



const UploadProduct = ({ onClose }) => {

    const [displayImage, setDisplayImage] = useState(false);
    const [data, setData] = useState({
        productName: "",
        brandName: "",
        category: "",
        productImage: [],
        description: "",
        price: "",
        selling: ""
    });

    const [imageUrl, setImageUrl] = useState('');

    const handleOnChange = (e) => {

    };


    const handleUploadProduct = async (e) => {
        const file = e.target.files[0];
        const uploadImageCloudinary = await uploadImageToCloudinary(file);

        setData((prev) => {
            return {
                ...prev,
                productImage: [...prev.productImage, uploadImageCloudinary?.url]
            }
        });
    };


    const handleProductImageDelete = async (i) => {

    };


    return (
        <div className='fixed w-full h-full bottom-0 right-0 left-0 top-0 flex justify-center items-center bg-slate-200 bg-opacity-60 rounded'>
            <div className='bg-white p-4 rounded w-full max-w-2xl h-full max-h-[80%] overflow-hidden' >

                <div className='flex justify-between items-center'>
                    <h1 className='font-bold text-xl px-2'>Upload Product</h1>
                    <div className='border rounded ml-auto px-1 text-2xl hover:bg-slate-200 hover:text-red-600' onClick={onClose}>
                        <button> <IoCloseOutline /></button>
                    </div>
                </div>


                <form className='p-4 grid gap-2 overflow-y-scroll h-full pb-8'>

                    <label htmlFor="productName" className='font-semibold mt-2'>Product Name :</label>
                    <input
                        type="text"
                        name="productName"
                        id="productName"
                        value={data.productName}
                        placeholder='Enter product name...'
                        onChange={handleOnChange}
                        className='p-2 bg-slate-100 hover:bg-slate-200 rounded px-4 border'
                    />

                    <label htmlFor="brandName" className='font-semibold mt-2'>Brand Name :</label>
                    <input
                        type="text"
                        name="brandName"
                        id="brandName"
                        value={data.brandName}
                        placeholder='Enter brand name...'
                        onChange={handleOnChange}
                        className='p-2 bg-slate-100 hover:bg-slate-200 rounded px-4 border'
                    />

                    <label htmlFor="category" className='font-semibold mt-2'>Category :</label>
                    <select value={data.category} className='p-2 bg-slate-100 hover:bg-slate-200 rounded px-4 border'>
                        {
                            productCategory.map((product, index) => (
                                <option value={product.value} key={product.value + index}>{product.label}</option>
                            ))
                        }
                    </select>



                    <label htmlFor="productImage" className='font-semibold mt-2 cursor-pointer'>Product Image</label>
                    <label htmlFor="uploadImageInput">
                        <div className='p-2 rounded bg-slate-100 h-32 w-full flex justify-center items-center cursor-pointer'>
                            <div className='text-slate-500 gap-2 flex justify-center items-center flex-col border-2 border-slate-400 border-dashed py-2 px-10'>
                                <span className='text-4xl'>
                                    <FaCloudUploadAlt />
                                </span>
                                <p className='text-sm'>Upload Product Image</p>
                                <input
                                    type="file"
                                    name="uploadProductImage"
                                    id="uploadImageInput"
                                    className='hidden'
                                    onChange={handleUploadProduct} />
                            </div>
                        </div>
                    </label>

                    <div>
                        {
                            data?.productImage[0] ? (
                                <div className='flex items-center gap-2 overflow-x-scroll'>
                                    {
                                        data?.productImage?.map((image, index) => (

                                            <div className='relative group'>

                                                <img
                                                    src={image}
                                                    alt={image}
                                                    key={index}
                                                    width={80}
                                                    height={80}
                                                    className='bg-slate-100 border cursor-pointer'
                                                    onClick={() => {
                                                        setDisplayImage(true);
                                                        setImageUrl(image);
                                                    }}
                                                />

                                                <div className='absolute bottom-0 right-0 p-1 bg-white text-red-700 cursor-pointer hidden hover:bg-slate-300 rounded-full overflow-hidden group-hover:block' onClick={() => handleProductImageDelete(index)}>
                                                    <MdDeleteOutline />
                                                </div>

                                            </div>
                                        ))
                                    }
                                </div>
                            ) : (
                                <p className='text-red-500 text-xs'>*Please upload product image</p>
                            )
                        }
                    </div>

                    <button className='px-3 py-2 bg-green-600 text-white mb-5 hover:bg-green-700 rounded'>Upload Product</button>

                </form>

            </div>

            {/** Display image full screen */}
            <div className='bg-opacity-70'>
                {
                    displayImage && (
                        <DisplayImage imageUrl={imageUrl} onClose={() => setDisplayImage(false)} />
                    )
                }
            </div>

        </div>
    )
}

export default UploadProduct;