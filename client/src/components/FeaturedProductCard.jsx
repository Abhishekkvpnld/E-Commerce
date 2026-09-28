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

const FeaturedProductCard = ({ category, heading }) => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);

    const { fetchAddToCart } = useContext(userContext);

    const loadingList = new Array(4).fill(null);

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

            {/* Section Header */}
            <div className="flex items-center justify-between mb-5">

                <div>
                    <p className="text-xs uppercase tracking-widest text-emerald-600 font-semibold">
                        Featured Collection
                    </p>

                    <h2 className="text-xl md:text-2xl font-bold text-slate-800 mt-1">
                        {heading}
                    </h2>
                </div>

                <Link
                    to={`/category-product?category=${category}`}
                    className="
                        hidden sm:flex
                        items-center gap-1
                        text-sm
                        font-semibold
                        text-slate-600
                        hover:text-emerald-600
                        transition
                    "
                >
                    View All
                    <MdArrowForward size={18} />
                </Link>

            </div>

            {/* Loading */}
            {loading ? (

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">

                    {loadingList.map((_, index) => (
                        <div
                            key={index}
                            className="
                                h-[430px]
                                rounded-3xl
                                bg-slate-100
                                animate-pulse
                            "
                        />
                    ))}

                </div>

            ) : (

                <div className="
                    grid
                    grid-cols-1
                    sm:grid-cols-2
                    lg:grid-cols-4
                    gap-5
                ">

                    {data?.slice(0, 8).map((product) => {

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
                                    overflow-hidden
                                    rounded-3xl
                                    bg-white
                                    border
                                    border-slate-200
                                    shadow-sm
                                    hover:shadow-xl
                                    transition-all
                                    duration-300
                                "
                            >

                                {/* Image Area */}
                                <div
                                    className="
                                        relative
                                        h-[245px]
                                        bg-slate-50
                                        flex
                                        items-center
                                        justify-center
                                        overflow-hidden
                                    "
                                >

                                    {/* Featured Badge */}
                                    <div
                                        className="
                                            absolute
                                            top-4
                                            left-4
                                            z-10
                                            flex
                                            items-center
                                            gap-1
                                            px-3
                                            py-1.5
                                            rounded-full
                                            bg-slate-900
                                            text-white
                                            text-[10px]
                                            font-bold
                                            uppercase
                                            tracking-wide
                                        "
                                    >
                                        <MdLocalOffer size={12} />
                                        Featured
                                    </div>

                                    {/* Discount */}
                                    {discount > 0 && (
                                        <span
                                            className="
                                                absolute
                                                top-4
                                                right-4
                                                z-10
                                                rounded-full
                                                bg-red-500
                                                text-white
                                                px-3
                                                py-1.5
                                                text-xs
                                                font-bold
                                            "
                                        >
                                            -{discount}%
                                        </span>
                                    )}

                                    <img
                                        src={product?.productImage?.[0]}
                                        alt={product?.productName}
                                        className="
                                            h-full
                                            w-full
                                            object-contain
                                            p-8
                                            mix-blend-multiply
                                            group-hover:scale-110
                                            transition-transform
                                            duration-500
                                        "
                                    />

                                </div>

                                {/* Details */}
                                <div className="p-5">

                                    <p className="
                                        text-xs
                                        uppercase
                                        tracking-wider
                                        text-emerald-600
                                        font-semibold
                                    ">
                                        {product?.category}
                                    </p>

                                    <h3 className="
                                        mt-2
                                        text-lg
                                        font-bold
                                        text-slate-800
                                        line-clamp-2
                                        min-h-[56px]
                                    ">
                                        {product?.productName}
                                    </h3>

                                    {/* Price */}
                                    <div className="flex items-center gap-2 mt-3">

                                        <span className="
                                            text-xl
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
                                                    text-sm
                                                    text-slate-400
                                                    line-through
                                                ">
                                                    {displayINRCurrency(
                                                        product?.price
                                                    )}
                                                </span>
                                            )}

                                    </div>

                                    {/* Bottom Action */}
                                    <button
                                        onClick={(e) =>
                                            handleAddToCart(
                                                e,
                                                product?._id
                                            )
                                        }
                                        className="
                                            mt-5
                                            w-full
                                            flex
                                            items-center
                                            justify-center
                                            gap-2
                                            rounded-xl
                                            border
                                            border-slate-200
                                            bg-slate-900
                                            text-white
                                            py-3
                                            text-sm
                                            font-semibold
                                            hover:bg-emerald-600
                                            transition-all
                                            duration-300
                                        "
                                    >
                                        <MdShoppingCart size={18} />
                                        Add to Cart
                                    </button>

                                </div>

                            </Link>
                        );
                    })}

                </div>
            )}

        </section>
    );
};

export default FeaturedProductCard;