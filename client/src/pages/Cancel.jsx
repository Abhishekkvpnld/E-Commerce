import React from "react";
import cancel from "../assest/cancel.gif";
import { useNavigate } from "react-router-dom";
import { FiArrowLeft, FiShoppingCart, FiRefreshCw } from "react-icons/fi";

const Cancel = () => {

    const navigate = useNavigate();

    const handleNavigate = () => {
        navigate("/cart");
    };

    return (
        <div className="
            min-h-[calc(100vh-100px)]
            w-full
            flex
            items-center
            justify-center
            bg-gradient-to-br
            from-slate-50
            via-white
            to-red-50
            px-4
            py-10
        ">

            {/* Main Card */}
            <div className="
                relative
                w-full
                max-w-lg
                overflow-hidden
                rounded-3xl
                border
                border-slate-200
                bg-white/90
                p-6
                text-center
                shadow-xl
                shadow-slate-200/60
                backdrop-blur-xl
                transition-all
                duration-500
                hover:-translate-y-1
                hover:shadow-2xl
                md:p-10
            ">

                {/* Decorative background circles */}
                <div className="
                    pointer-events-none
                    absolute
                    -right-16
                    -top-16
                    h-40
                    w-40
                    rounded-full
                    bg-red-100/60
                    blur-2xl
                " />

                <div className="
                    pointer-events-none
                    absolute
                    -bottom-20
                    -left-20
                    h-44
                    w-44
                    rounded-full
                    bg-blue-100/50
                    blur-2xl
                " />


                {/* Status Icon */}
                <div className="
                    relative
                    mx-auto
                    mb-3
                    flex
                    h-12
                    w-12
                    items-center
                    justify-center
                    rounded-full
                    bg-red-50
                    text-red-500
                    shadow-sm
                    animate-[pulse_2s_ease-in-out_infinite]
                ">
                    <span className="text-xl">
                        ✕
                    </span>
                </div>


                {/* Existing Cancel GIF */}
                <div className="
                    relative
                    mx-auto
                    flex
                    items-center
                    justify-center
                ">

                    <img
                        src={cancel}
                        width="350"
                        height="350"
                        alt="Payment cancelled"
                        className="
                            my-2
                            h-56
                            w-56
                            object-contain
                            transition-transform
                            duration-700
                            ease-out
                            hover:scale-105
                            md:h-72
                            md:w-72
                        "
                    />

                </div>


                {/* Heading */}
                <div className="relative">

                    <h1 className="
                        text-2xl
                        font-extrabold
                        tracking-tight
                        text-slate-800
                        md:text-3xl
                    ">
                        Payment Cancelled
                    </h1>

                    <div className="
                        mx-auto
                        mt-3
                        h-1
                        w-12
                        rounded-full
                        bg-red-500
                    " />

                    <p className="
                        mx-auto
                        mt-4
                        max-w-sm
                        text-sm
                        leading-6
                        text-slate-500
                        md:text-base
                    ">
                        Your payment wasn't completed.
                        Don't worry — your items are still
                        waiting for you in the cart.
                    </p>

                </div>


                {/* Info box */}
                <div className="
                    relative
                    mt-6
                    rounded-2xl
                    border
                    border-red-100
                    bg-red-50/70
                    px-4
                    py-3
                    text-left
                ">

                    <div className="
                        flex
                        items-center
                        gap-3
                    ">

                        <div className="
                            flex
                            h-9
                            w-9
                            shrink-0
                            items-center
                            justify-center
                            rounded-full
                            bg-white
                            text-red-500
                            shadow-sm
                        ">
                            <FiRefreshCw />
                        </div>

                        <div>

                            <p className="
                                text-sm
                                font-semibold
                                text-slate-700
                            ">
                                Nothing was charged
                            </p>

                            <p className="
                                mt-0.5
                                text-xs
                                text-slate-500
                            ">
                                You can safely try the checkout again.
                            </p>

                        </div>

                    </div>

                </div>


                {/* Back to cart button */}
                <button
                    type="button"
                    onClick={handleNavigate}
                    className="
                        group
                        relative
                        mt-7
                        flex
                        h-13
                        w-full
                        items-center
                        justify-center
                        gap-3
                        overflow-hidden
                        rounded-2xl
                        bg-blue-600
                        px-5
                        py-3.5
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
                    "
                >

                    {/* Shine animation */}
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

                    <FiShoppingCart
                        className="
                            relative
                            text-lg
                            transition-transform
                            duration-300
                            group-hover:scale-110
                        "
                    />

                    <span className="relative">
                        Return to Cart
                    </span>

                    <FiArrowLeft
                        className="
                            relative
                            order-first
                            text-lg
                            transition-transform
                            duration-300
                            group-hover:-translate-x-1
                        "
                    />

                </button>


                {/* Small footer */}
                <p className="
                    relative
                    mt-5
                    text-xs
                    text-slate-400
                ">
                    Your cart items have been preserved.
                </p>

            </div>

        </div>
    );
};

export default Cancel;

