import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from "react-router-dom";
import productCategory from '../helpers/productCategory';
import SearchVerticalProducts from '../components/SearchVerticalProducts';
import axios from 'axios';
import endPoints from '../../common/configApi';
import { FiFilter, FiX, FiChevronDown } from 'react-icons/fi';

const CategoryProduct = () => {

    const navigate = useNavigate();
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [mobileFilterOpen, setMobileFilterOpen] = useState(false);

    const location = useLocation();
    const urlSearch = new URLSearchParams(location?.search);
    const urlCategoryListInArray = urlSearch.getAll("category");

    const urlCategoryListObject = {};
    urlCategoryListInArray.forEach((el) => {
        urlCategoryListObject[el] = true
    });

    const [selectedCategory, setSelectedCategory] = useState(urlCategoryListObject);
    const [filterCategoryList, setFilterCategoryList] = useState([]);
    const [sortBy, setSortBy] = useState("");

    const fetchData = async () => {
        try {
            setLoading(true);
            const response = await axios.post(endPoints?.filterProducts?.url, { category: filterCategoryList });
            const responseData = response?.data;
            setLoading(false);
            setData(responseData?.data || []);
        } catch (error) {
            console.log(error?.message);
        };
    };

    const handleSelectedCategory = (e) => {
        const { value, checked } = e.target;
        setSelectedCategory((prev) => ({
            ...prev,
            [value]: checked
        }));
    };

    const handleChangeSortBy = (e) => {
        const value = e?.target.value;
        setSortBy(value);

        if (value === "asc") {
            setData((prev) => [...prev].sort((a, b) => a.sellingPrice - b.sellingPrice));
        }
        if (value === "dsc") {
            setData((prev) => [...prev].sort((a, b) => b.sellingPrice - a.sellingPrice));
        }
    };

    useEffect(() => {
        fetchData();
    }, [filterCategoryList]);

    useEffect(() => {
        if (selectedCategory !== undefined) {
            const arrayOfCategory = Object.keys(selectedCategory)
                .filter((key) => selectedCategory[key]);
            setFilterCategoryList(arrayOfCategory);

            const urlFormat = arrayOfCategory.map((el, index) => {
                return index === arrayOfCategory.length - 1
                    ? `category=${el}`
                    : `category=${el}&&`;
            });
            navigate("/product-category?" + urlFormat.join(""));
        }
    }, [selectedCategory]);

    /* ── Shared filter panel content ───────────────────── */
    const FilterPanel = () => (
        <div className='p-3'>
            {/* Sort By */}
            <div className='mb-4'>
                <h1 className='text-sm uppercase font-semibold text-slate-500 border-b border-slate-300 pb-1 mb-2'>
                    Sort by Price
                </h1>
                <form className='text-sm flex flex-col gap-2'>
                    <label className='flex items-center gap-2 cursor-pointer'>
                        <input
                            type="radio" name='sortby'
                            checked={sortBy === "asc"} value="asc"
                            onChange={handleChangeSortBy}
                            className='cursor-pointer accent-purple-600'
                        />
                        <span className='font-medium'>Low to High</span>
                    </label>
                    <label className='flex items-center gap-2 cursor-pointer'>
                        <input
                            type="radio" name='sortby'
                            checked={sortBy === "dsc"} value="dsc"
                            onChange={handleChangeSortBy}
                            className='cursor-pointer accent-purple-600'
                        />
                        <span className='font-medium'>High to Low</span>
                    </label>
                </form>
            </div>

            {/* Category filter */}
            <div>
                <h1 className='text-sm uppercase font-semibold text-slate-500 border-b border-slate-300 pb-1 mb-2'>
                    Category
                </h1>
                <form className='text-sm flex flex-col gap-2'>
                    {productCategory?.map((cat, index) => (
                        <label className='flex items-center gap-2 cursor-pointer' key={index}>
                            <input
                                type="checkbox" name='category'
                                value={cat?.value}
                                checked={!!selectedCategory[cat?.value]}
                                id={cat?.value}
                                className='cursor-pointer accent-purple-600'
                                onChange={handleSelectedCategory}
                            />
                            <span className='font-medium capitalize'>{cat?.value}</span>
                        </label>
                    ))}
                </form>
            </div>
        </div>
    );

    return (
        <div className='mx-auto p-2 md:p-4'>

            {/* ── Mobile: filter toggle bar ── */}
            <div className='md:hidden flex items-center justify-between mb-3'>
                <p className='text-sm font-medium text-slate-600'>
                    Results: <span className='font-semibold text-slate-800'>{data?.length}</span>
                </p>
                <button
                    onClick={() => setMobileFilterOpen(true)}
                    className='flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-purple-300 bg-purple-50 text-purple-700 text-sm font-medium'
                >
                    <FiFilter className='text-base' />
                    Filter / Sort
                </button>
            </div>

            {/* ── Mobile: slide-in filter drawer ── */}
            {mobileFilterOpen && (
                <div className='fixed inset-0 z-50 md:hidden'>
                    {/* backdrop */}
                    <div
                        className='absolute inset-0 bg-black/40'
                        onClick={() => setMobileFilterOpen(false)}
                    />
                    {/* drawer */}
                    <div className='absolute left-0 top-0 bottom-0 w-72 bg-white shadow-xl overflow-y-auto'>
                        <div className='flex items-center justify-between p-3 border-b'>
                            <h2 className='font-semibold text-base text-slate-700'>Filter & Sort</h2>
                            <button
                                onClick={() => setMobileFilterOpen(false)}
                                className='p-1.5 rounded-lg hover:bg-slate-100 text-slate-500'
                            >
                                <FiX className='text-xl' />
                            </button>
                        </div>
                        <FilterPanel />
                        <div className='p-3'>
                            <button
                                onClick={() => setMobileFilterOpen(false)}
                                className='w-full py-2.5 rounded-xl bg-gradient-to-r from-purple-500 to-indigo-500 text-white font-semibold'
                            >
                                Apply Filters
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* ── Mobile: product grid ── */}
            <div className='md:hidden'>
                <SearchVerticalProducts data={data} loading={loading} />
            </div>

            {/* ── Desktop: sidebar + products ── */}
            <div className='hidden md:grid grid-cols-[250px,1fr]'>

                {/* Left sidebar */}
                <div className='p-2 min-h-[calc(100vh-110px)] overflow-y-scroll max-h-[calc(100vh-110px)]'>
                    <FilterPanel />
                </div>

                {/* Right: product display */}
                <div className='p-1 overflow-y-scroll'>
                    <p className='font-medium my-2 text-lg mx-2 text-slate-700'>
                        Search Results: {data?.length}
                    </p>
                    <div className='min-h-[calc(100vh-120px)] overflow-y-scroll max-h-[calc(100vh-120px)]'>
                        {data?.length !== 0 && (
                            <SearchVerticalProducts data={data} loading={loading} />
                        )}
                    </div>
                </div>

            </div>
        </div>
    )
}

export default CategoryProduct;