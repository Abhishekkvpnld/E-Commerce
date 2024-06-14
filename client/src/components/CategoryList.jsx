import React, { useEffect, useState } from 'react';
import axios from "axios";
import endPoints from '../../common/configApi';


const CategoryList = () => {

    const [categoryProduct, setCategoryProduct] = useState([]);
    const [loading, setLoading] = useState(false);

    const fetchCategoryProduct = async () => {
        setLoading(true)
        const response = await axios.get(endPoints.getProductCategory.url);
        const data = response?.data?.data;
        setLoading(false)
        setCategoryProduct(data)
    };

    useEffect(() => {
        fetchCategoryProduct();
    }, []);

    return (
        <div className='container mx-auto p-4'>
            <div className='flex items-center justify-between gap-4 overflow-scroll scrollbar-none'>

                {
                    categoryProduct?.map((product) => (
                        <div className='cursor-pointer'>
                            <div className='w-16 h-16 md:w-20 md:h-20 rounded-full overflow-hidden p-3 bg-slate-100 hover:bg-slate-200 flex justify-center items-center'>
                                <img src={product?.productImage[0]} alt={product?.category} className='h-full object-fill' />
                            </div>
                            <p className='text-center text-sm md:text-base capitalize'>{product?.category}</p>
                        </div>
                    ))
                }

            </div>
        </div>
    )
}

export default CategoryList;