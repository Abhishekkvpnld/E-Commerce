import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
    MdArrowForward,
    MdShoppingCart,
    MdLocalOffer,
} from "react-icons/md";

import { getCategoryWiseProduct } from "../helpers/getCategoryWiseProducts";
import displayINRCurrency from "../helpers/displayCurrency";
import addToCart from "../helpers/addToCart";
import userContext from "../context/userContext";
import scrollTop from "../helpers/scrollTop";
import { useCategoryWiseProduct } from "../hooks/products/useCategoryWiseProduct";

const ShowcaseProductCard = ({ category, heading }) => {
    // const [data, setData] = useState([]);
    // const [loading, setLoading] = useState(true);

    const { fetchAddToCart } = useContext(userContext);

    const loadingList = new Array(6).fill(null);

    // const fetchData = async () => {
    //     setLoading(true);

    //     try {
    //         const categoryProduct = await getCategoryWiseProduct(category);

    //         setData(categoryProduct?.data || []);
    //     } catch (error) {
    //         console.error("Showcase product error:", error);
    //         setData([]);
    //     } finally {
    //         setLoading(false);
    //     }
    // };

    // useEffect(() => {
    //     fetchData();
    // }, [category]);


    
        // Using react-query to fetch category-wise products
        const {
            data,
            isLoading: loading,
            isError,
            error,
        } = useCategoryWiseProduct(category);


    const handleAddToCart = async (e, id) => {
        e.preventDefault();
        e.stopPropagation();

        await addToCart(e, id);
        fetchAddToCart();
    };

    return (
        <section className="mx-auto px-4 my-10 relative">

            {/* Header */}
            <div className="flex items-center justify-between mb-5">

                <div>
                    <p className="text-xs uppercase tracking-widest text-emerald-600 font-semibold">
                        Discover
                    </p>

                    <h2 className="text-xl md:text-2xl font-bold text-slate-800 mt-1">
                        {heading}
                    </h2>
                </div>

                <Link
                    to={`/category-product?category=${category}`}
                    className="
                        flex
                        items-center
                        gap-1
                        text-sm
                        font-semibold
                        text-slate-600
                        hover:text-emerald-600
                        transition
                    "
                >
                    Explore
                    <MdArrowForward size={18} />
                </Link>

            </div>

            {/* Loading */}
            {loading ? (

                <div
                    className="
                        grid
                        grid-cols-2
                        md:grid-cols-3
                        lg:grid-cols-4
                        xl:grid-cols-5
                        gap-4
                    "
                >
                    {loadingList.map((_, index) => (
                        <div
                            key={index}
                            className="
                                h-[390px]
                                rounded-2xl
                                bg-slate-100
                                animate-pulse
                            "
                        />
                    ))}
                </div>

            ) : data?.data?.length > 0 ? (

                <div
                    className="
                        grid
                        grid-cols-2
                        md:grid-cols-3
                        lg:grid-cols-4
                        xl:grid-cols-5
                        gap-4
                    "
                >

                    {data?.data?.slice(0, 10).map((product, index) => {

                        const price = Number(product?.price) || 0;
                        const sellingPrice =
                            Number(product?.sellingPrice) || 0;

                        const discount =
                            price > sellingPrice && price > 0
                                ? Math.round(
                                    ((price - sellingPrice) / price) * 100
                                )
                                : 0;

                        return (
                            <Link
                                key={product?._id || index}
                                to={`/product-details/${product?._id}`}
                                onClick={scrollTop}
                                className="
                                    group
                                    relative
                                    overflow-hidden
                                    rounded-2xl
                                    bg-white
                                    border
                                    border-slate-200
                                    shadow-sm
                                    hover:shadow-xl
                                    hover:-translate-y-1
                                    transition-all
                                    duration-300
                                "
                            >

                                {/* Image Section */}
                                <div
                                    className="
                                        relative
                                        h-48
                                        sm:h-52
                                        bg-slate-50
                                        flex
                                        items-center
                                        justify-center
                                        overflow-hidden
                                    "
                                >

                                    {/* Discount */}
                                    {discount > 0 && (
                                        <div
                                            className="
                                                absolute
                                                top-3
                                                left-3
                                                z-10
                                                flex
                                                items-center
                                                gap-1
                                                bg-emerald-600
                                                text-white
                                                px-2.5
                                                py-1
                                                rounded-full
                                                text-[10px]
                                                font-bold
                                            "
                                        >
                                            <MdLocalOffer size={11} />
                                            {discount}% OFF
                                        </div>
                                    )}

                                    {/* Product Number */}
                                    <span
                                        className="
                                            absolute
                                            top-2
                                            right-3
                                            text-4xl
                                            font-black
                                            text-slate-100
                                            select-none
                                        "
                                    >
                                        {String(index + 1).padStart(2, "0")}
                                    </span>

                                    {/* Product Image */}
                                    <img
                                        src={product?.productImage?.[0]}
                                        alt={product?.productName || "Product"}
                                        className="
                                            w-full
                                            h-full
                                            object-contain
                                            p-6
                                            mix-blend-multiply
                                            group-hover:scale-110
                                            transition-transform
                                            duration-500
                                        "
                                    />

                                </div>

                                {/* Content */}
                                <div className="p-4">

                                    {/* Category */}
                                    <p
                                        className="
                                            text-[10px]
                                            uppercase
                                            tracking-widest
                                            text-emerald-600
                                            font-bold
                                        "
                                    >
                                        {product?.category}
                                    </p>

                                    {/* Product Name */}
                                    <h3
                                        className="
                                            mt-1.5
                                            font-semibold
                                            text-sm
                                            text-slate-800
                                            line-clamp-2
                                            min-h-[40px]
                                        "
                                    >
                                        {product?.productName}
                                    </h3>

                                    {/* Price + Cart */}
                                    <div
                                        className="
                                            flex
                                            items-center
                                            justify-between
                                            gap-2
                                            mt-4
                                        "
                                    >

                                        <div className="min-w-0">

                                            <p
                                                className="
                                                    text-base
                                                    sm:text-lg
                                                    font-bold
                                                    text-slate-900
                                                "
                                            >
                                                {displayINRCurrency(
                                                    product?.sellingPrice
                                                )}
                                            </p>

                                            {price > sellingPrice && (
                                                <p
                                                    className="
                                                        text-[11px]
                                                        text-slate-400
                                                        line-through
                                                    "
                                                >
                                                    {displayINRCurrency(
                                                        product?.price
                                                    )}
                                                </p>
                                            )}

                                        </div>

                                        {/* Cart */}
                                        <button
                                            type="button"
                                            onClick={(e) =>
                                                handleAddToCart(
                                                    e,
                                                    product?._id
                                                )
                                            }
                                            className="
                                                flex-shrink-0
                                                w-9
                                                h-9
                                                rounded-full
                                                bg-slate-900
                                                text-white
                                                flex
                                                items-center
                                                justify-center
                                                hover:bg-emerald-600
                                                active:scale-90
                                                transition-all
                                            "
                                        >
                                            <MdShoppingCart size={17} />
                                        </button>

                                    </div>

                                    {/* Bottom */}
                                    <div
                                        className="
                                            flex
                                            items-center
                                            justify-between
                                            mt-4
                                            pt-3
                                            border-t
                                            border-slate-100
                                        "
                                    >
                                        <span
                                            className="
                                                text-[11px]
                                                text-slate-400
                                            "
                                        >
                                            View Details
                                        </span>

                                        <MdArrowForward
                                            size={15}
                                            className="
                                                text-slate-400
                                                group-hover:text-emerald-600
                                                group-hover:translate-x-1
                                                transition-all
                                            "
                                        />
                                    </div>

                                </div>

                            </Link>
                        );
                    })}

                </div>

            ) : (

                /* No Products */
                <div
                    className="
                        py-12
                        text-center
                        rounded-2xl
                        border
                        border-dashed
                        border-slate-300
                        bg-slate-50
                    "
                >
                    <p className="text-slate-500 text-sm">
                        No products available in this category.
                    </p>
                </div>

            )}

        </section>
    );
};

export default ShowcaseProductCard;