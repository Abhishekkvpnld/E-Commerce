import { useEffect, useState } from 'react';
import axios from "axios";
import endPoints from '../../common/configApi';
import { Link } from 'react-router-dom';


const CategoryList = () => {

    const [categoryProduct, setCategoryProduct] = useState([]);
    const [loading, setLoading] = useState(true);

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
        <div className='mx-auto p-4'>
            <div className='flex items-center gap-5 md:gap-6 overflow-x-scroll scrollbar-none scroll-smooth snap-x px-1 py-2'>
                {
                    loading ? (
                        categoryLoadingArray.map((i, index) => (
                            <div key={"category" + index} className='flex flex-col items-center gap-2 shrink-0'>
                                <div className='w-16 h-16 md:w-20 md:h-20 rounded-full bg-gradient-to-br from-slate-200 to-slate-100 animate-pulse' />
                                <div className='w-12 h-2.5 rounded-full bg-slate-200 animate-pulse' />
                            </div>
                        ))
                    ) : (
                        categoryProduct?.map((product, index) => (
                            <Link
                                to={"/product-category?category=" + product?.category}
                                key={product?.productName + index}
                                className='group flex flex-col items-center gap-2 shrink-0 snap-start'
                            >
                                <div className='relative w-16 h-16 md:w-20 md:h-20 rounded-full p-[2px] bg-gradient-to-br from-rose-200 via-amber-100 to-teal-200 transition-transform duration-300 ease-out group-hover:scale-105 group-active:scale-95'>
                                    <div className='w-full h-full rounded-full bg-white p-3 shadow-sm shadow-slate-200 flex justify-center items-center overflow-hidden ring-1 ring-slate-100 group-hover:shadow-md group-hover:shadow-slate-300 transition-shadow duration-300'>
                                        <img
                                            src={product?.productImage[0]}
                                            alt={product?.category}
                                            loading='lazy'
                                            className='h-full w-full object-scale-down mix-blend-multiply transition-transform duration-300 ease-out group-hover:scale-110'
                                        />
                                    </div>
                                </div>
                                <p className='text-center text-xs md:text-sm font-medium text-slate-600 capitalize tracking-tight group-hover:text-slate-900 transition-colors duration-200 max-w-[4.5rem] truncate'>
                                    {product?.category}
                                </p>
                            </Link>
                        ))
                    )
                }
            </div>
        </div>
    )
}

export default CategoryList;
