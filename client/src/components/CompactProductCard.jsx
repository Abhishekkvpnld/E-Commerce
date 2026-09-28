import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
    MdShoppingCart,
    MdFavoriteBorder,
    MdArrowForward,
} from "react-icons/md";

import { getCategoryWiseProduct } from "../helpers/getCategoryWiseProducts";
import displayINRCurrency from "../helpers/displayCurrency";
import addToCart from "../helpers/addToCart";
import userContext from "../context/userContext";
import scrollTop from "../helpers/scrollTop";

const CompactProductCard = ({ category, heading }) => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);

    const { fetchAddToCart } = useContext(userContext);

    const loadingList = new Array(6).fill(null);

    const fetchData = async () => {
        setLoading(true);

        const categoryProduct = await getCategoryWiseProduct(category);

        setData(categoryProduct?.data || []);
        setLoading(false);
    };

    useEffect(() => {
        fetchData();
    }, [category]);

    const handleAddToCart = async (e, id) => {
        e.preventDefault();
        e.stopPropagation();

        await addToCart(e, id);
        fetchAddToCart();
    };

    return (
        <section className="mx-auto px-4 my-10">

            {/* Header */}
            <div className="flex items-center justify-between mb-5">

                <div>
                    <h2 className="
                        text-xl
                        md:text-2xl
                        font-bold
                        text-slate-800
                    ">
                        {heading}
                    </h2>

                    <p className="text-sm text-slate-500 mt-1">
                        Explore our latest collection
                    </p>
                </div>

                <Link
                    to={`/category-product?category=${category}`}
                    className="
                        flex
                        items-center
                        gap-1
                        text-sm
                        font-semibold
                        text-emerald-600
                        hover:text-emerald-700
                    "
                >
                    See More
                    <MdArrowForward size={17} />
                </Link>

            </div>

            {/* Loading */}
            {loading ? (

                <div className="
                    grid
                    grid-cols-2
                    sm:grid-cols-3
                    md:grid-cols-4
                    lg:grid-cols-6
                    gap-3
                    md:gap-5
                ">

                    {loadingList.map((_, index) => (
                        <div
                            key={index}
                            className="
                                rounded-2xl
                                bg-slate-100
                                h-[300px]
                                animate-pulse
                            "
                        />
                    ))}

                </div>

            ) : (

                <div className="
                    grid
                    grid-cols-2
                    sm:grid-cols-3
                    md:grid-cols-4
                    lg:grid-cols-6
                    gap-3
                    md:gap-5
                ">

                    {data?.slice(0, 12).map((product) => {

                        const discount =
                            product?.price > product?.sellingPrice
                                ? Math.round(
                                    ((product.price - product.sellingPrice) /
                                        product.price) *
                                    100
                                )
                                : 0;

                        return (
                            <Link
                                key={product?._id}
                                to={"/product-details/" + product?._id}
                                onClick={scrollTop}
                                className="
                                    group
                                    relative
                                    rounded-2xl
                                    bg-white
                                    border
                                    border-slate-200
                                    overflow-hidden
                                    hover:border-emerald-300
                                    hover:shadow-lg
                                    transition-all
                                    duration-300
                                "
                            >

                                {/* Product Image */}
                                <div className="
                                    relative
                                    aspect-square
                                    bg-slate-50
                                    flex
                                    items-center
                                    justify-center
                                    overflow-hidden
                                ">

                                    {/* Discount */}
                                    {discount > 0 && (
                                        <span className="
                                            absolute
                                            top-2
                                            left-2
                                            z-10
                                            bg-red-500
                                            text-white
                                            text-[9px]
                                            font-bold
                                            px-2
                                            py-1
                                            rounded-full
                                        ">
                                            {discount}% OFF
                                        </span>
                                    )}

                                    {/* Favorite */}
                                    <button
                                        onClick={(e) => {
                                            e.preventDefault();
                                            e.stopPropagation();
                                        }}
                                        className="
                                            absolute
                                            top-2
                                            right-2
                                            z-10
                                            w-8
                                            h-8
                                            rounded-full
                                            bg-white
                                            shadow-sm
                                            flex
                                            items-center
                                            justify-center
                                            text-slate-500
                                            hover:text-red-500
                                            hover:scale-110
                                            transition
                                        "
                                    >
                                        <MdFavoriteBorder size={17} />
                                    </button>

                                    <img
                                        src={product?.productImage?.[0]}
                                        alt={product?.productName}
                                        className="
                                            w-full
                                            h-full
                                            object-contain
                                            p-5
                                            mix-blend-multiply
                                            group-hover:scale-105
                                            transition-transform
                                            duration-500
                                        "
                                    />

                                    {/* Floating Cart */}
                                    <button
                                        onClick={(e) =>
                                            handleAddToCart(
                                                e,
                                                product?._id
                                            )
                                        }
                                        className="
                                            absolute
                                            bottom-2
                                            right-2
                                            w-9
                                            h-9
                                            rounded-full
                                            bg-emerald-600
                                            text-white
                                            flex
                                            items-center
                                            justify-center
                                            shadow-md
                                            opacity-0
                                            translate-y-2
                                            group-hover:opacity-100
                                            group-hover:translate-y-0
                                            hover:bg-emerald-700
                                            transition-all
                                            duration-300
                                        "
                                    >
                                        <MdShoppingCart size={17} />
                                    </button>

                                </div>

                                {/* Product Information */}
                                <div className="p-3">

                                    <p className="
                                        text-[10px]
                                        uppercase
                                        tracking-wide
                                        text-slate-400
                                        font-semibold
                                    ">
                                        {product?.category}
                                    </p>

                                    <h3 className="
                                        mt-1
                                        text-sm
                                        font-semibold
                                        text-slate-800
                                        line-clamp-2
                                        min-h-[40px]
                                    ">
                                        {product?.productName}
                                    </h3>

                                    {/* Price */}
                                    <div className="
                                        flex
                                        flex-wrap
                                        items-center
                                        gap-1.5
                                        mt-2
                                    ">

                                        <span className="
                                            text-sm
                                            md:text-base
                                            font-bold
                                            text-slate-900
                                        ">
                                            {displayINRCurrency(
                                                product?.sellingPrice
                                            )}
                                        </span>

                                        {product?.price >
                                            product?.sellingPrice && (
                                                <span className="
                                                    text-[10px]
                                                    md:text-xs
                                                    text-slate-400
                                                    line-through
                                                ">
                                                    {displayINRCurrency(
                                                        product?.price
                                                    )}
                                                </span>
                                            )}

                                    </div>

                                </div>

                            </Link>
                        );
                    })}

                </div>
            )}

        </section>
    );
};

export default CompactProductCard;