import React, { useEffect, useState } from 'react';
import { useLocation, useParams } from "react-router-dom";
import productCategory from '../helpers/productCategory';
import SearchVerticalProducts from '../components/SearchVerticalProducts';
import axios from 'axios';
import endPoints from '../../common/configApi';


const CategoryProduct = () => {
    const params = useParams()
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(false);
    const location = useLocation();
    const urlSearch = new URLSearchParams(location?.search);
    const urlCategoryListInArray = urlSearch.getAll("category");

    const urlCategoryListObject = {};
    urlCategoryListInArray.forEach((el) => {
        urlCategoryListObject[el] = true
    });

    const [selectedCategory, setSelectedCategory] = useState(urlCategoryListObject);
    const [filterCategoryList, setFilterCategoryList] = useState([]);


    const fetchData = async () => {
        try {
            setLoading(true);
            const response = await axios.post(endPoints?.filterProducts?.url, { category: filterCategoryList });
            const responseData = response?.data;
            setLoading(false);

            console.log(responseData);

            setData(responseData?.data || []);

        } catch (error) {
            console.log(error?.message);
        };
    };



    const handleSelectedCategory = (e) => {
        const { name, value, checked } = e.target;

        setSelectedCategory((prev) => {
            return {
                ...prev,
                [value]: checked
            }
        });
    };


    useEffect(() => {
        fetchData();
    }, [filterCategoryList]);


    useEffect(() => {

        if (selectedCategory !== undefined) {
            const arrayOfCategory = Object.keys(selectedCategory).map((categoryName, index) => {
                if (selectedCategory[categoryName]) {
                    return categoryName
                }
                return null
            }).filter((el) => el);
            setFilterCategoryList(arrayOfCategory);
        }

    }, [selectedCategory]);

    return (
        <div className='mx-auto p-4'>

            {/**Desktop version */}
            <div className='hidden md:grid grid-cols-[250px,1fr]'>

                {/**Left section */}
                <div className='p-2 min-h-[calc(100vh-110px)] overflow-y-scroll'>

                    {/**Sort by */}
                    <div>
                        <h1 className='text-base uppercase font-medium text-slate-500 border-b border-slate-500 pb-1'>Sort by</h1>

                        <form className='text-sm py-2 gap-2 flex flex-col' >

                            <div className='flex items-center gap-2'>
                                <input type="radio" name='sortby' className='cursor-pointer' />
                                <label className='font-semibold' > Price - Low to High</label>
                            </div>

                            <div className='flex items-center gap-2'>
                                <input type="radio" name='sortby' className='cursor-pointer' />
                                <label className='font-semibold' > Price - High to Low</label>
                            </div>

                        </form>
                    </div>



                    {/** Category */}
                    <div>
                        <h1 className='text-base uppercase font-medium text-slate-500 border-b border-slate-500 pb-1'>Sort by</h1>

                        <form className='text-sm py-2 gap-2 flex flex-col' >

                            {
                                productCategory?.map((category, index) => (

                                    <div className='flex items-center gap-2' key={index}>
                                        <input type="checkbox" name='category' value={category?.value} checked={selectedCategory[category?.value]} id={category?.value} className='cursor-pointer' onChange={handleSelectedCategory} />
                                        <label className='font-semibold' htmlFor={category?.value} >{category?.value}</label>
                                    </div>

                                ))
                            }

                        </form>
                    </div>

                </div>

                {/**Right section -- Product display */}
                <div className='bg-slate-50 p-2'>
                    {
                        data?.length !== 0 && !loading && (
                            <div></div>
                        )
                    }
                </div>

            </div>


        </div>
    )
}

export default CategoryProduct;