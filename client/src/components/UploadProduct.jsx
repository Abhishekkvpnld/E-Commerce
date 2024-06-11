import React, { useState } from 'react';
import { IoCloseOutline } from "react-icons/io5";
import productCategory from '../helpers/productCategory';


const UploadProduct = ({ onClose }) => {

    const [data, setData] = useState({
        productName: "",
        brandName: "",
        category: "",
        productImage: "",
        description: "",
        price: "",
        selling: ""
    });

    const handleOnChange = (e) => {

    };

    return (
        <div className='fixed w-full h-full bottom-0 right-0 left-0 top-0 flex justify-center items-center bg-slate-200 bg-opacity-60 rounded'>
            <div className='bg-white p-4 rounded w-full max-w-2xl h-full max-h-[80%]' >

                <div className='flex justify-between items-center'>
                    <h1 className='font-bold text-xl px-2'>Upload Product</h1>
                    <div className='border rounded ml-auto px-1 text-2xl hover:bg-slate-200 hover:text-red-600' onClick={onClose}>
                        <button> <IoCloseOutline /></button>
                    </div>
                </div>


                <form className='p-4 grid gap-2'>

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
                    <select value={data.category}>
                        {
                            productCategory.map((product, index) => (
                                <option value={product.value} key={product.value + index}>{product.label}</option>
                            ))
                        }
                    </select>

                </form>

            </div>
        </div>
    )
}

export default UploadProduct;