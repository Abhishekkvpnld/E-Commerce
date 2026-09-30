import { useContext, useState } from "react";
import axios from "axios";
import endPoints from "../common/configApi";
import userContext from "../context/userContext";
import displayCurrency from "../helpers/displayCurrency";
import toast from "react-hot-toast";

import { MdDeleteOutline, MdOutlinePayment } from "react-icons/md";
import {
    FiMinus,
    FiPlus,
    FiShoppingBag,
    FiArrowRight,
    FiShield,
    FiTruck,
    FiCreditCard,
} from "react-icons/fi";

import { loadStripe } from "@stripe/stripe-js";
import paymentLoadingGif from "../assest/paymentLoading.gif";
import cartLoaderGif from "../assest/cartLoader.gif";

import { useCartProducts } from "../hooks/cart/useCartProducts ";
import { useQueryClient } from "@tanstack/react-query";


const Cart = () => {

    const [paymentLoading, setPaymentLoading] = useState(false);

    const contexts = useContext(userContext);

    const {
        data = [],
        isLoading: loading,
        isError,
        error,
    } = useCartProducts();

    const queryClient = useQueryClient();

    const cartItems = data?.data || [];

    const loadingCart = new Array(
        contexts?.cartProductCount || 3
    ).fill(null);


    // --------------------------------------------------
    // Increase quantity
    // --------------------------------------------------

    const increaseQty = async (cartId, qty) => {
        try {

            const response = await axios.post(
                endPoints?.updateCartProduct.url,
                {
                    productQty: qty + 1,
                    cartId: cartId,
                },
                {
                    withCredentials: true,
                }
            );

            const responseData = response?.data;

            if (responseData?.success) {

                await queryClient.invalidateQueries({
                    queryKey: ["cart", "products"],
                });

                toast.success(responseData?.message);
            }

        } catch (error) {

            toast.error(
                error?.response?.data?.message ||
                "Unable to update quantity"
            );
        }
    };


    // --------------------------------------------------
    // Decrease quantity
    // --------------------------------------------------

    const decreaseQty = async (cartId, qty) => {

        if (qty < 2) return;

        try {

            const response = await axios.post(
                endPoints?.updateCartProduct.url,
                {
                    productQty: qty - 1,
                    cartId: cartId,
                },
                {
                    withCredentials: true,
                }
            );

            const responseData = response?.data;

            if (responseData?.success) {

                await queryClient.invalidateQueries({
                    queryKey: ["cart", "products"],
                });

                toast.success(responseData?.message);
            }

        } catch (error) {

            toast.error(
                error?.response?.data?.message ||
                "Unable to update quantity"
            );
        }
    };


    // --------------------------------------------------
    // Delete product
    // --------------------------------------------------

    const deleteCartProduct = async (cartId) => {

        try {

            const response = await axios.post(
                endPoints.deleteCartProduct.url,
                {
                    cartId: cartId,
                },
                {
                    withCredentials: true,
                }
            );

            const responseData = response?.data;

            if (responseData?.success) {

                await queryClient.invalidateQueries({
                    queryKey: ["cart", "products"],
                });

                contexts?.fetchAddToCart();

                toast.success(responseData?.message);
            }

        } catch (error) {

            toast.error(
                error?.response?.data?.message ||
                "Unable to remove product"
            );
        }
    };


    // --------------------------------------------------
    // Payment
    // --------------------------------------------------

    const handlePayment = async () => {

        try {

            setPaymentLoading(true);

            const stripePromise = await loadStripe(
                "pk_test_51PUtq8F3ve2G57TDVhN9ZthiQRGIlsrVu0RBhN8BK7deXYwN3T9FrwL8AmciqeZHT47Ef9yaYZSveDZi92ywKXbe00dOwVapbq"
            );

            const response = await axios.post(
                endPoints?.payment.url,
                {
                    cartItems: cartItems,
                },
                {
                    withCredentials: true,
                }
            );

            const responseData = response?.data;

            if (responseData?.id) {

                setPaymentLoading(false);

                await stripePromise.redirectToCheckout({
                    sessionId: responseData?.id,
                });
            }

        } catch (error) {

            setPaymentLoading(false);

            toast.error(
                error?.response?.data?.message ||
                "Payment could not be started"
            );
        }
    };


    // --------------------------------------------------
    // Calculations
    // --------------------------------------------------

    const totalQuantity = cartItems.reduce(
        (total, current) =>
            total + (current?.quantity || 0),
        0
    );

    const totalPrice = cartItems.reduce(
        (total, current) =>
            total +
            (
                (current?.quantity || 0) *
                (current?.productId?.sellingPrice || 0)
            ),
        0
    );

    const originalPrice = cartItems.reduce(
        (total, current) =>
            total +
            (
                (current?.quantity || 0) *
                (current?.productId?.price || 0)
            ),
        0
    );

    const totalSavings = Math.max(
        originalPrice - totalPrice,
        0
    );


    // --------------------------------------------------
    // Loading Skeleton
    // --------------------------------------------------

    const CartSkeleton = () => (
        <div className="space-y-4">

            {loadingCart.map((_, index) => (

                <div
                    key={index}
                    className="
                    relative
                    overflow-hidden
                    rounded-2xl
                    border
                    border-slate-200
                    bg-white
                    p-4
                "
                >

                    <div className="flex gap-4">

                        {/* Product image skeleton */}
                        <div
                            className="
                            h-28
                            w-28
                            shrink-0
                            animate-pulse
                            rounded-xl
                            bg-slate-200
                        "
                        />

                        {/* Product details skeleton */}
                        <div className="flex-1 space-y-3">

                            {/* Product name */}
                            <div
                                className="
                                h-5
                                w-2/3
                                animate-pulse
                                rounded
                                bg-slate-200
                            "
                            />

                            {/* Category */}
                            <div
                                className="
                                h-4
                                w-1/3
                                animate-pulse
                                rounded
                                bg-slate-200
                            "
                            />

                            {/* Price */}
                            <div
                                className="
                                h-5
                                w-1/4
                                animate-pulse
                                rounded
                                bg-slate-200
                            "
                            />

                            {/* Quantity */}
                            <div
                                className="
                                h-8
                                w-24
                                animate-pulse
                                rounded-lg
                                bg-slate-200
                            "
                            />

                        </div>

                    </div>

                </div>

            ))}

        </div>
    );



    // --------------------------------------------------
    // Empty Cart
    // --------------------------------------------------

    if (!loading && cartItems.length === 0) {

        return (

            <div className="
                min-h-[calc(100vh-100px)]
                bg-gradient-to-br
                from-slate-50
                via-white
                to-blue-50
                px-4
                py-12
                flex
                items-center
                justify-center
            ">

                <div className="
                    w-full
                    max-w-lg
                    text-center
                    rounded-3xl
                    border
                    border-slate-200
                    bg-white/80
                    backdrop-blur-xl
                    shadow-xl
                    shadow-slate-200/50
                    p-8
                    md:p-12
                    transition-all
                    duration-500
                    hover:-translate-y-1
                    hover:shadow-2xl
                ">

                    <div className="
                        mx-auto
                        mb-6
                        flex
                        h-20
                        w-20
                        items-center
                        justify-center
                        rounded-full
                        bg-blue-50
                        text-blue-600
                    ">

                        <FiShoppingBag
                            className="text-4xl"
                        />

                    </div>

                    <h1 className="
                        text-2xl
                        md:text-3xl
                        font-bold
                        text-slate-800
                    ">
                        Your cart is empty
                    </h1>

                    <p className="
                        mt-3
                        text-sm
                        md:text-base
                        leading-relaxed
                        text-slate-500
                    ">
                        Looks like you haven't added anything
                        to your cart yet. Start shopping and
                        discover something you love.
                    </p>

                    <img
                        src={cartLoaderGif}
                        alt="Empty cart"
                        className="
                            mx-auto
                            mt-5
                            h-44
                            w-44
                            object-contain
                            transition-transform
                            duration-500
                            hover:scale-105
                        "
                    />

                </div>

            </div>
        );
    }


    return (

        <div className="
            min-h-[calc(100vh-100px)]
            bg-gradient-to-br
            from-slate-50
            via-white
            to-blue-50
            px-4
            py-6
            md:px-8
            lg:px-12
        ">

            {/* ------------------------------------------------ */}
            {/* Header */}
            {/* ------------------------------------------------ */}

            <div className="
                mx-auto
                mb-8
                max-w-7xl
            ">

                <div className="
                    flex
                    flex-col
                    gap-2
                    sm:flex-row
                    sm:items-end
                    sm:justify-between
                ">

                    <div>

                        <div className="
                            mb-2
                            flex
                            items-center
                            gap-2
                            text-blue-600
                        ">

                            <FiShoppingBag />

                            <span className="
                                text-sm
                                font-semibold
                                uppercase
                                tracking-wider
                            ">
                                Shopping Cart
                            </span>

                        </div>

                        <h1 className="
                            text-3xl
                            font-bold
                            tracking-tight
                            text-slate-900
                            md:text-4xl
                        ">
                            Your Cart
                        </h1>

                        <p className="
                            mt-1
                            text-sm
                            text-slate-500
                        ">
                            Review your items before checkout.
                        </p>

                    </div>


                    {totalQuantity > 0 && (

                        <div className="
                            w-fit
                            rounded-full
                            border
                            border-blue-100
                            bg-blue-50
                            px-4
                            py-2
                            text-sm
                            font-semibold
                            text-blue-700
                        ">

                            {totalQuantity}{" "}
                            {totalQuantity === 1
                                ? "item"
                                : "items"}

                        </div>

                    )}

                </div>

            </div>


            {/* ------------------------------------------------ */}
            {/* Main Content */}
            {/* ------------------------------------------------ */}

            <div className="
                mx-auto
                grid
                max-w-7xl
                grid-cols-1
                gap-6
                lg:grid-cols-[1fr_380px]
                lg:items-start
            ">


                {/* ================================================= */}
                {/* CART PRODUCTS */}
                {/* ================================================= */}

                <div className="min-w-0">

                    {loading ? (

                        <CartSkeleton />

                    ) : (

                        <div className="space-y-4">

                            {cartItems.map((product, index) => {

                                const itemPrice =
                                    product?.productId?.sellingPrice || 0;

                                const oldPrice =
                                    product?.productId?.price || 0;

                                const itemTotal =
                                    itemPrice *
                                    product?.quantity;

                                const discount =
                                    oldPrice > itemPrice
                                        ? Math.round(
                                            ((oldPrice - itemPrice) /
                                                oldPrice) *
                                            100
                                        )
                                        : 0;

                                return (

                                    <div
                                        key={
                                            product?._id +
                                            index
                                        }
                                        className="
                                            group
                                            relative
                                            overflow-hidden
                                            rounded-2xl
                                            border
                                            border-slate-200
                                            bg-white
                                            p-4
                                            shadow-sm
                                            transition-all
                                            duration-300
                                            hover:-translate-y-1
                                            hover:border-blue-200
                                            hover:shadow-xl
                                            hover:shadow-blue-100/50
                                        "
                                    >

                                        {/* top gradient */}
                                        <div className="
                                            absolute
                                            inset-x-0
                                            top-0
                                            h-px
                                            bg-gradient-to-r
                                            from-transparent
                                            via-blue-400
                                            to-transparent
                                            opacity-0
                                            transition-opacity
                                            duration-300
                                            group-hover:opacity-100
                                        " />


                                        <div className="
                                            flex
                                            gap-4
                                            sm:gap-5
                                        ">


                                            {/* PRODUCT IMAGE */}

                                            <div className="
                                                relative
                                                h-28
                                                w-28
                                                shrink-0
                                                overflow-hidden
                                                rounded-xl
                                                bg-slate-50
                                                sm:h-36
                                                sm:w-36
                                            ">

                                                <img
                                                    src={
                                                        product
                                                            ?.productId
                                                            ?.productImage?.[0]
                                                    }
                                                    alt={
                                                        product
                                                            ?.productId
                                                            ?.productName
                                                    }
                                                    className="
                                                        h-full
                                                        w-full
                                                        object-contain
                                                        p-2
                                                        mix-blend-multiply
                                                        transition-transform
                                                        duration-500
                                                        ease-out
                                                        group-hover:scale-110
                                                    "
                                                />

                                                {discount > 0 && (

                                                    <span className="
                                                        absolute
                                                        left-2
                                                        top-2
                                                        rounded-full
                                                        bg-red-500
                                                        px-2
                                                        py-1
                                                        text-[10px]
                                                        font-bold
                                                        text-white
                                                        shadow
                                                    ">
                                                        -{discount}%
                                                    </span>

                                                )}

                                            </div>


                                            {/* PRODUCT DETAILS */}

                                            <div className="
                                                min-w-0
                                                flex-1
                                            ">


                                                {/* Delete */}

                                                <button
                                                    type="button"
                                                    title="Remove item"
                                                    onClick={() =>
                                                        deleteCartProduct(
                                                            product?._id
                                                        )
                                                    }
                                                    className="
                                                        absolute
                                                        right-3
                                                        top-3
                                                        flex
                                                        h-9
                                                        w-9
                                                        items-center
                                                        justify-center
                                                        rounded-full
                                                        bg-slate-50
                                                        text-slate-400
                                                        transition-all
                                                        duration-300
                                                        hover:rotate-12
                                                        hover:bg-red-50
                                                        hover:text-red-500
                                                    "
                                                >

                                                    <MdDeleteOutline
                                                        className="text-xl"
                                                    />

                                                </button>


                                                {/* Name */}

                                                <h2 className="
                                                    max-w-[75%]
                                                    truncate
                                                    text-base
                                                    font-bold
                                                    text-slate-800
                                                    sm:text-lg
                                                ">
                                                    {
                                                        product
                                                            ?.productId
                                                            ?.productName
                                                    }
                                                </h2>


                                                {/* Category */}

                                                <p className="
                                                    mt-1
                                                    text-xs
                                                    font-medium
                                                    capitalize
                                                    text-slate-400
                                                    sm:text-sm
                                                ">
                                                    {
                                                        product
                                                            ?.productId
                                                            ?.category
                                                    }
                                                </p>


                                                {/* Price */}

                                                <div className="
                                                    mt-3
                                                    flex
                                                    items-center
                                                    gap-2
                                                    flex-wrap
                                                ">

                                                    <span className="
                                                        text-base
                                                        font-bold
                                                        text-blue-600
                                                    ">
                                                        {displayCurrency(
                                                            itemPrice
                                                        )}
                                                    </span>

                                                    {oldPrice >
                                                        itemPrice && (

                                                            <span className="
                                                            text-xs
                                                            text-slate-400
                                                            line-through
                                                        ">
                                                                {displayCurrency(
                                                                    oldPrice
                                                                )}
                                                            </span>

                                                        )}

                                                </div>


                                                {/* Bottom */}

                                                <div className="
                                                    mt-4
                                                    flex
                                                    flex-wrap
                                                    items-center
                                                    justify-between
                                                    gap-3
                                                ">


                                                    {/* Quantity */}

                                                    <div className="
                                                        flex
                                                        items-center
                                                        overflow-hidden
                                                        rounded-xl
                                                        border
                                                        border-slate-200
                                                        bg-slate-50
                                                    ">

                                                        <button
                                                            type="button"
                                                            disabled={
                                                                product?.quantity <
                                                                2
                                                            }
                                                            onClick={() =>
                                                                decreaseQty(
                                                                    product?._id,
                                                                    product?.quantity
                                                                )
                                                            }
                                                            className="
                                                                flex
                                                                h-9
                                                                w-9
                                                                items-center
                                                                justify-center
                                                                text-slate-500
                                                                transition-all
                                                                duration-200
                                                                hover:bg-red-50
                                                                hover:text-red-500
                                                                active:scale-90
                                                                disabled:cursor-not-allowed
                                                                disabled:opacity-30
                                                            "
                                                        >

                                                            <FiMinus />

                                                        </button>


                                                        <span className="
                                                            flex
                                                            h-9
                                                            min-w-10
                                                            items-center
                                                            justify-center
                                                            border-x
                                                            border-slate-200
                                                            bg-white
                                                            px-2
                                                            text-sm
                                                            font-bold
                                                            text-slate-800
                                                        ">
                                                            {
                                                                product?.quantity
                                                            }
                                                        </span>


                                                        <button
                                                            type="button"
                                                            onClick={() =>
                                                                increaseQty(
                                                                    product?._id,
                                                                    product?.quantity
                                                                )
                                                            }
                                                            className="
                                                                flex
                                                                h-9
                                                                w-9
                                                                items-center
                                                                justify-center
                                                                text-slate-500
                                                                transition-all
                                                                duration-200
                                                                hover:bg-blue-50
                                                                hover:text-blue-600
                                                                active:scale-90
                                                            "
                                                        >

                                                            <FiPlus />

                                                        </button>

                                                    </div>


                                                    {/* Total */}

                                                    <div className="
                                                        text-right
                                                    ">

                                                        <p className="
                                                            text-[10px]
                                                            font-medium
                                                            uppercase
                                                            tracking-wider
                                                            text-slate-400
                                                        ">
                                                            Item Total
                                                        </p>

                                                        <p className="
                                                            text-base
                                                            font-bold
                                                            text-slate-800
                                                        ">
                                                            {displayCurrency(
                                                                itemTotal
                                                            )}
                                                        </p>

                                                    </div>

                                                </div>

                                            </div>

                                        </div>

                                    </div>

                                );

                            })}

                        </div>

                    )}

                </div>


                {/* ================================================= */}
                {/* ORDER SUMMARY */}
                {/* ================================================= */}

                {!loading && totalQuantity > 0 && (

                    <div className="
                        lg:sticky
                        lg:top-6
                    ">

                        <div className="
                            overflow-hidden
                            rounded-3xl
                            border
                            border-slate-200
                            bg-white
                            shadow-xl
                            shadow-slate-200/50
                        ">


                            {/* Summary Header */}

                            <div className="
                                border-b
                                border-slate-100
                                bg-gradient-to-br
                                from-slate-900
                                to-slate-800
                                px-6
                                py-5
                                text-white
                            ">

                                <div className="
                                    flex
                                    items-center
                                    justify-between
                                ">

                                    <div>

                                        <p className="
                                            text-xs
                                            font-medium
                                            uppercase
                                            tracking-widest
                                            text-slate-400
                                        ">
                                            Checkout
                                        </p>

                                        <h2 className="
                                            mt-1
                                            text-xl
                                            font-bold
                                        ">
                                            Order Summary
                                        </h2>

                                    </div>

                                    <div className="
                                        flex
                                        h-11
                                        w-11
                                        items-center
                                        justify-center
                                        rounded-xl
                                        bg-white/10
                                        backdrop-blur
                                    ">

                                        <FiCreditCard
                                            className="text-xl"
                                        />

                                    </div>

                                </div>

                            </div>


                            {/* Price Details */}

                            <div className="p-6">

                                <div className="
                                    space-y-4
                                    text-sm
                                ">

                                    <div className="
                                        flex
                                        justify-between
                                        text-slate-500
                                    ">

                                        <span>
                                            Items ({totalQuantity})
                                        </span>

                                        <span className="
                                            font-medium
                                            text-slate-700
                                        ">
                                            {displayCurrency(
                                                originalPrice
                                            )}
                                        </span>

                                    </div>


                                    <div className="
                                        flex
                                        justify-between
                                        text-slate-500
                                    ">

                                        <span>
                                            Discount
                                        </span>

                                        <span className="
                                            font-semibold
                                            text-emerald-600
                                        ">
                                            -
                                            {displayCurrency(
                                                totalSavings
                                            )}
                                        </span>

                                    </div>


                                    <div className="
                                        flex
                                        justify-between
                                        text-slate-500
                                    ">

                                        <span>
                                            Delivery
                                        </span>

                                        <span className="
                                            font-semibold
                                            text-emerald-600
                                        ">
                                            FREE
                                        </span>

                                    </div>


                                    <div className="
                                        my-5
                                        border-t
                                        border-dashed
                                        border-slate-200
                                    " />


                                    <div className="
                                        flex
                                        items-end
                                        justify-between
                                    ">

                                        <div>

                                            <p className="
                                                text-xs
                                                text-slate-400
                                            ">
                                                Total Amount
                                            </p>

                                            <p className="
                                                mt-1
                                                text-2xl
                                                font-extrabold
                                                tracking-tight
                                                text-slate-900
                                            ">
                                                {displayCurrency(
                                                    totalPrice
                                                )}
                                            </p>

                                        </div>

                                        {totalSavings > 0 && (

                                            <span className="
                                                rounded-full
                                                bg-emerald-50
                                                px-3
                                                py-1
                                                text-xs
                                                font-bold
                                                text-emerald-600
                                            ">
                                                You save{" "}
                                                {displayCurrency(
                                                    totalSavings
                                                )}
                                            </span>

                                        )}

                                    </div>


                                    {/* Checkout Button */}

                                    <button
                                        type="button"
                                        onClick={handlePayment}
                                        disabled={paymentLoading}
                                        className="
                                            group
                                            relative
                                            mt-5
                                            flex
                                            h-14
                                            w-full
                                            items-center
                                            justify-center
                                            gap-3
                                            overflow-hidden
                                            rounded-2xl
                                            bg-blue-600
                                            text-base
                                            font-bold
                                            text-white
                                            shadow-lg
                                            shadow-blue-200
                                            transition-all
                                            duration-300
                                            hover:-translate-y-0.5
                                            hover:bg-blue-700
                                            hover:shadow-xl
                                            hover:shadow-blue-300
                                            active:translate-y-0
                                            disabled:cursor-not-allowed
                                            disabled:opacity-60
                                        "
                                    >

                                        <span className="
                                            absolute
                                            inset-0
                                            -translate-x-full
                                            bg-gradient-to-r
                                            from-transparent
                                            via-white/20
                                            to-transparent
                                            transition-transform
                                            duration-700
                                            group-hover:translate-x-full
                                        " />

                                        <MdOutlinePayment
                                            className="
                                                relative
                                                text-xl
                                            "
                                        />

                                        <span className="relative">
                                            Proceed to Checkout
                                        </span>

                                        <FiArrowRight
                                            className="
                                                relative
                                                transition-transform
                                                duration-300
                                                group-hover:translate-x-1
                                            "
                                        />

                                    </button>


                                    {/* Trust */}

                                    <div className="
                                        mt-5
                                        grid
                                        grid-cols-3
                                        gap-2
                                        border-t
                                        border-slate-100
                                        pt-5
                                    ">

                                        <div className="
                                            flex
                                            flex-col
                                            items-center
                                            gap-1
                                            text-center
                                        ">

                                            <FiShield
                                                className="
                                                    text-lg
                                                    text-emerald-500
                                                "
                                            />

                                            <span className="
                                                text-[10px]
                                                font-medium
                                                text-slate-400
                                            ">
                                                Secure
                                            </span>

                                        </div>


                                        <div className="
                                            flex
                                            flex-col
                                            items-center
                                            gap-1
                                            text-center
                                        ">

                                            <FiCreditCard
                                                className="
                                                    text-lg
                                                    text-blue-500
                                                "
                                            />

                                            <span className="
                                                text-[10px]
                                                font-medium
                                                text-slate-400
                                            ">
                                                Safe Payment
                                            </span>

                                        </div>


                                        <div className="
                                            flex
                                            flex-col
                                            items-center
                                            gap-1
                                            text-center
                                        ">

                                            <FiTruck
                                                className="
                                                    text-lg
                                                    text-orange-500
                                                "
                                            />

                                            <span className="
                                                text-[10px]
                                                font-medium
                                                text-slate-400
                                            ">
                                                Fast Delivery
                                            </span>

                                        </div>

                                    </div>

                                </div>

                            </div>

                        </div>

                    </div>

                )}

            </div>


            {/* ================================================= */}
            {/* PAYMENT LOADING */}
            {/* ================================================= */}

            {paymentLoading && (

                <div className="
                    fixed
                    inset-0
                    z-[999]
                    flex
                    flex-col
                    items-center
                    justify-center
                    bg-slate-950/70
                    px-6
                    backdrop-blur-md
                ">

                    <div className="
                        flex
                        w-full
                        max-w-sm
                        flex-col
                        items-center
                        rounded-3xl
                        border
                        border-white/10
                        bg-white
                        p-8
                        shadow-2xl
                    ">

                        <div className="
                            mb-4
                            flex
                            h-14
                            w-14
                            animate-pulse
                            items-center
                            justify-center
                            rounded-full
                            bg-blue-50
                            text-blue-600
                        ">

                            <MdOutlinePayment
                                className="text-2xl"
                            />

                        </div>

                        <h2 className="
                            text-xl
                            font-bold
                            text-slate-800
                        ">
                            Processing Payment
                        </h2>

                        <p className="
                            mt-2
                            text-center
                            text-sm
                            text-slate-500
                        ">
                            Please wait while we securely
                            prepare your checkout.
                        </p>

                        <img
                            src={paymentLoadingGif}
                            alt="Payment loading"
                            className="
                                mt-4
                                h-32
                                w-32
                                object-contain
                            "
                        />

                        <div className="
                            mt-2
                            h-1.5
                            w-full
                            overflow-hidden
                            rounded-full
                            bg-slate-100
                        ">

                            <div className="
                                h-full
                                w-1/2
                                animate-[loading_1.5s_ease-in-out_infinite]
                                rounded-full
                                bg-blue-600
                            " />

                        </div>

                    </div>

                </div>

            )}

        </div>
    );
};


export default Cart;

