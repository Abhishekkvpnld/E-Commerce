import React, { useEffect, useState } from 'react';
import axios from "axios";
import endPoints from '../../common/configApi';
import { Link } from 'react-router-dom';


const CategoryList = () => {

    const [categoryProduct, setCategoryProduct] = useState([]);
    const [loading, setLoading] = useState(false);

    const categoryLoadingArray = new Array(13).fill(null);

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
        <div className='mx-auto p-3'>
            <div className='flex items-center justify-between gap-4 overflow-scroll scrollbar-none'>
                {
                    loading ? (
                        categoryLoadingArray.map((i,index)=>(
                            <div key={"category"+index} className='w-16 h-16 md:w-20 md:h-20 rounded-full overflow-hidden p-4 animate-pulse'>

                            </div>
                        ))
                    ): (
                        categoryProduct?.map((product,index) => (
                <Link to={"/product-category?category=" + product?.category} key={product?.productName+index} className='cursor-pointer'>
                    <div className='w-16 h-16 md:w-20 md:h-20 rounded-full overflow-hidden p-4 bg-slate-200 hover:bg-slate-300 flex justify-center items-center'>
                        <img src={product?.productImage[0]} alt={product?.category} className='h-full object-scale-down mix-blend-multiply hover:scale-125 transition-all' />
                    </div>
                    <p className='text-center text-sm md:text-base capitalize'>{product?.category}</p>
                </Link>
                ))
                )
                
                }

            </div>
        </div>
    )
}

export default CategoryList;