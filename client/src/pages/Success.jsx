import { useContext, useEffect } from "react";
import success from "../assest/success.gif";
import { Link } from "react-router-dom";
import { useQueryClient } from "@tanstack/react-query";
import {
    FiCheck,
    FiPackage,
    FiArrowRight,
    FiShoppingBag,
} from "react-icons/fi";

const Success = () => {

    const queryClient = useQueryClient();

    useEffect(() => {
        // Refresh cart data after successful payment
        queryClient.invalidateQueries({ queryKey: ["cart", "products"], });
    }, [queryClient]);

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
            to-green-50
            px-4
            py-10
        ">

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
                    bg-green-100/70
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

                {/* Success icon */}
                <div className="
                    relative
                    mx-auto
                    flex
                    h-14
                    w-14
                    items-center
                    justify-center
                    rounded-full
                    bg-green-50
                    text-green-600
                    shadow-sm
                    animate-pulse
                ">
                    <div className="
                        flex
                        h-9
                        w-9
                        items-center
                        justify-center
                        rounded-full
                        bg-green-500
                        text-white
                    ">
                        <FiCheck className="text-xl" />
                    </div>
                </div>

                {/* Existing success GIF */}
                <div className="
                    relative
                    mx-auto
                    flex
                    items-center
                    justify-center
                ">
                    <img
                        src={success}
                        width="400"
                        height="440"
                        alt="Payment successful"
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
                        Payment Successful!
                    </h1>

                    <div className="
                        mx-auto
                        mt-3
                        h-1
                        w-12
                        rounded-full
                        bg-green-500
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
                        Your payment has been completed successfully.
                        Thank you for your purchase!
                    </p>

                </div>

                {/* Order confirmation info */}
                <div className="
                    relative
                    mt-6
                    rounded-2xl
                    border
                    border-green-100
                    bg-green-50/70
                    px-4
                    py-3
                    text-left
                ">
                    <div className="flex items-center gap-3">

                        <div className="
                            flex
                            h-10
                            w-10
                            shrink-0
                            items-center
                            justify-center
                            rounded-full
                            bg-white
                            text-green-600
                            shadow-sm
                        ">
                            <FiPackage className="text-lg" />
                        </div>

                        <div>
                            <p className="
                                text-sm
                                font-semibold
                                text-slate-700
                            ">
                                Your order has been placed
                            </p>

                            <p className="
                                mt-0.5
                                text-xs
                                text-slate-500
                            ">
                                You can view your order details anytime.
                            </p>
                        </div>

                    </div>
                </div>

                {/* See Order button */}
                <Link
                    to="/order"
                    className="
                        group
                        relative
                        mt-7
                        flex
                        w-full
                        items-center
                        justify-center
                        gap-3
                        overflow-hidden
                        rounded-2xl
                        bg-green-600
                        px-5
                        py-3.5
                        font-bold
                        text-white
                        shadow-lg
                        shadow-green-200
                        transition-all
                        duration-300
                        hover:-translate-y-0.5
                        hover:bg-green-700
                        hover:shadow-xl
                        hover:shadow-green-300
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

                    <FiShoppingBag
                        className="
                            relative
                            text-lg
                            transition-transform
                            duration-300
                            group-hover:scale-110
                        "
                    />

                    <span className="relative">
                        View My Orders
                    </span>

                    <FiArrowRight
                        className="
                            relative
                            text-lg
                            transition-transform
                            duration-300
                            group-hover:translate-x-1
                        "
                    />

                </Link>

                {/* Bottom message */}
                <p className="
                    relative
                    mt-5
                    flex
                    items-center
                    justify-center
                    gap-1.5
                    text-xs
                    text-slate-400
                ">
                    <FiCheck className="text-green-500" />
                    Thank you for shopping with us!
                </p>

            </div>
        </div>
    );
};

export default Success;

