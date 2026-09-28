import moment from "moment";
import {
  FiPackage,
  FiCreditCard,
  FiTruck,
  FiCalendar,
} from "react-icons/fi";

import displayINRCurrency from "../helpers/displayCurrency";
import { useCartProducts } from "../hooks/cart/useCartProducts ";

const OrderPage = () => {
  const {
    data: responseData,
    isLoading,
    isError,
  } = useCartProducts();

  const fetchData = responseData?.data || [];

  if (isLoading) {
    return (
      <div className="min-h-[calc(100vh-100px)] bg-slate-50 flex justify-center items-center">
        <div className="flex flex-col items-center gap-3">
          <div className="w-10 h-10 border-4 border-slate-200 border-t-purple-600 rounded-full animate-spin" />
          <p className="font-medium text-slate-600">
            Loading Orders...
          </p>
        </div>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="min-h-[calc(100vh-100px)] bg-slate-50 flex justify-center items-center">
        <div className="bg-white border border-red-100 rounded-2xl p-8 text-center shadow-sm">
          <div className="w-14 h-14 mx-auto rounded-full bg-red-50 flex items-center justify-center">
            <FiPackage className="text-2xl text-red-500" />
          </div>

          <h2 className="mt-4 text-lg font-semibold text-slate-800">
            Unable to load orders
          </h2>

          <p className="text-sm text-slate-500 mt-1">
            Something went wrong while fetching your orders.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-[calc(100vh-100px)] bg-slate-50 px-4 py-6 md:px-6 lg:px-10">

      {/* Page Header */}
      <div className="max-w-6xl mx-auto mb-6">
        <div className="flex items-center gap-3">
          <div className="w-11 h-11 rounded-xl bg-purple-100 flex items-center justify-center">
            <FiPackage className="text-xl text-purple-600" />
          </div>

          <div>
            <h1 className="text-2xl font-bold text-slate-800">
              My Orders
            </h1>

            <p className="text-sm text-slate-500">
              View your order history and purchase details
            </p>
          </div>
        </div>
      </div>

      {/* Empty State */}
      {!fetchData.length && (
        <div className="max-w-6xl mx-auto">
          <div className="bg-white border border-slate-200 rounded-2xl p-12 text-center shadow-sm">
            <div className="w-16 h-16 mx-auto rounded-full bg-slate-100 flex items-center justify-center">
              <FiPackage className="text-2xl text-slate-400" />
            </div>

            <h2 className="mt-4 text-lg font-semibold text-slate-800">
              No orders yet
            </h2>

            <p className="mt-1 text-sm text-slate-500">
              Your completed orders will appear here.
            </p>
          </div>
        </div>
      )}

      {/* Orders */}
      <div className="max-w-6xl mx-auto space-y-5">
        {fetchData.map((item, index) => (
          <div
            key={item?.userId + index}
            className="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-shadow"
          >

            {/* Order Header */}
            <div className="px-5 py-4 border-b border-slate-100 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
              <div className="flex items-center gap-3">

                <div className="w-10 h-10 rounded-lg bg-purple-50 flex items-center justify-center">
                  <FiPackage className="text-purple-600" />
                </div>

                <div>
                  <p className="text-xs text-slate-500">
                    Order #{index + 1}
                  </p>

                  <div className="flex items-center gap-1.5 text-sm font-semibold text-slate-700">
                    <FiCalendar className="text-slate-400" />
                    {moment(item?.createdAt).format("LL")}
                  </div>
                </div>

              </div>

              <div className="text-sm font-semibold text-slate-700">
                {item?.productDetails?.length || 0}{" "}
                {item?.productDetails?.length === 1
                  ? "Item"
                  : "Items"}
              </div>
            </div>

            {/* Products */}
            <div className="p-5">

              <div className="space-y-3">
                {item?.productDetails?.map((product, productIndex) => (
                  <div
                    key={product?.productId + productIndex}
                    className="flex gap-4 p-3 rounded-xl bg-slate-50 border border-slate-100"
                  >
                    <div className="w-24 h-24 shrink-0 rounded-lg bg-white border border-slate-200 flex items-center justify-center overflow-hidden">
                      <img
                        src={product?.image?.[0]}
                        alt={product?.name || "Product"}
                        className="w-full h-full object-contain p-2"
                      />
                    </div>

                    <div className="flex-1 min-w-0 flex flex-col justify-center">

                      <h3 className="font-semibold text-slate-800 text-base line-clamp-2">
                        {product?.name}
                      </h3>

                      <div className="flex flex-wrap gap-x-5 gap-y-1 mt-2 text-sm">

                        <p className="text-slate-500">
                          Price:{" "}
                          <span className="font-semibold text-slate-700">
                            {displayINRCurrency(product?.price)}
                          </span>
                        </p>

                        <p className="text-slate-500">
                          Qty:{" "}
                          <span className="font-semibold text-purple-600">
                            {product?.quantity}
                          </span>
                        </p>

                      </div>

                    </div>
                  </div>
                ))}
              </div>

              {/* Details */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-5">

                {/* Payment */}
                <div className="border border-slate-200 rounded-xl p-4">

                  <div className="flex items-center gap-2 mb-3">
                    <div className="w-8 h-8 rounded-lg bg-blue-50 flex items-center justify-center">
                      <FiCreditCard className="text-blue-600" />
                    </div>

                    <h3 className="font-semibold text-slate-800">
                      Payment Details
                    </h3>
                  </div>

                  <div className="space-y-2 text-sm">

                    <div className="flex justify-between gap-3">
                      <span className="text-slate-500">
                        Payment Method
                      </span>

                      <span className="font-semibold text-slate-700 capitalize">
                        {item?.paymentDetails?.payment_method_type?.[0] || "-"}
                      </span>
                    </div>

                    <div className="flex justify-between gap-3">
                      <span className="text-slate-500">
                        Payment Status
                      </span>

                      <span className="font-semibold text-green-600 capitalize">
                        {item?.paymentDetails?.payment_status || "-"} ✓
                      </span>
                    </div>

                  </div>
                </div>

                {/* Shipping */}
                <div className="border border-slate-200 rounded-xl p-4">

                  <div className="flex items-center gap-2 mb-3">
                    <div className="w-8 h-8 rounded-lg bg-green-50 flex items-center justify-center">
                      <FiTruck className="text-green-600" />
                    </div>

                    <h3 className="font-semibold text-slate-800">
                      Shipping Details
                    </h3>
                  </div>

                  <div className="space-y-2 text-sm">

                    {item?.shipping_options?.map(
                      (shipping, shippingIndex) => (
                        <div
                          key={shippingIndex}
                          className="flex justify-between"
                        >
                          <span className="text-slate-500">
                            Shipping Amount
                          </span>

                          <span className="font-semibold text-green-700">
                            {displayINRCurrency(
                              shipping?.shipping_amount
                            )}
                          </span>
                        </div>
                      )
                    )}

                  </div>
                </div>

              </div>

              {/* Total */}
              <div className="mt-5 pt-4 border-t border-slate-200 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">

                <span className="text-sm text-slate-500">
                  Total Amount
                </span>

                <span className="text-xl font-bold text-slate-800">
                  {displayINRCurrency(item?.total_amount)}
                </span>

              </div>

            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default OrderPage;