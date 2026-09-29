import moment from "moment";
import {
  FiCalendar,
  FiCreditCard,
  FiPackage,
  FiTruck,
  FiShoppingBag,
  FiAlertCircle,
} from "react-icons/fi";

import displayINRCurrency from "../helpers/displayCurrency";
import { useAllOrders } from "../hooks/order/useAllOrders";

const OrderSkeleton = () => {
  return (
    <div className="border border-slate-200 rounded-2xl p-5 bg-white shadow-sm animate-pulse">
      {/* Header */}
      <div className="flex justify-between items-center mb-5">
        <div className="h-5 w-32 bg-slate-200 rounded" />
        <div className="h-8 w-28 bg-slate-200 rounded-full" />
      </div>

      {/* Products */}
      <div className="space-y-4">
        {[1, 2].map((item) => (
          <div key={item} className="flex gap-4">
            <div className="w-20 h-20 bg-slate-200 rounded-xl" />

            <div className="flex-1 space-y-3">
              <div className="h-4 w-2/3 bg-slate-200 rounded" />
              <div className="h-4 w-1/3 bg-slate-200 rounded" />
              <div className="h-4 w-1/4 bg-slate-200 rounded" />
            </div>
          </div>
        ))}
      </div>

      {/* Footer */}
      <div className="border-t border-slate-200 mt-5 pt-4 flex justify-end">
        <div className="h-8 w-36 bg-slate-200 rounded" />
      </div>
    </div>
  );
};

const AllOrders = () => {
  const {
    data: fetchData = [],
    isLoading,
    isError,
    error,
  } = useAllOrders();

  // Loading
  if (isLoading) {
    return (
      <div className="p-4 h-[calc(100vh-190px)] overflow-y-auto">
        <div className="mb-6">
          <div className="h-7 w-40 bg-slate-200 rounded animate-pulse" />
          <div className="h-4 w-64 bg-slate-200 rounded mt-2 animate-pulse" />
        </div>

        <div className="space-y-5">
          <OrderSkeleton />
          <OrderSkeleton />
          <OrderSkeleton />
        </div>
      </div>
    );
  }

  // Error
  if (isError) {
    return (
      <div className="h-[calc(100vh-190px)] flex items-center justify-center p-6">
        <div className="max-w-md w-full text-center bg-red-50 border border-red-200 rounded-2xl p-8">
          <div className="w-14 h-14 mx-auto rounded-full bg-red-100 flex items-center justify-center">
            <FiAlertCircle className="text-red-600 text-2xl" />
          </div>

          <h2 className="text-xl font-semibold text-slate-800 mt-4">
            Unable to load orders
          </h2>

          <p className="text-sm text-slate-500 mt-2">
            {error?.message || "Something went wrong while fetching orders."}
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="p-4 h-[calc(100vh-190px)] overflow-y-auto bg-slate-50">
      {/* Header */}
      <div className="mb-6">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-violet-100 flex items-center justify-center">
            <FiShoppingBag className="text-violet-600 text-xl" />
          </div>

          <div>
            <h1 className="text-2xl font-bold text-slate-800">
              All Orders
            </h1>

            <p className="text-sm text-slate-500">
              Manage and monitor customer orders
            </p>
          </div>
        </div>

        {/* Order count */}
        <div className="mt-5 inline-flex items-center gap-2 px-4 py-2 bg-white border border-slate-200 rounded-full shadow-sm">
          <FiPackage className="text-violet-600" />

          <span className="text-sm font-medium text-slate-600">
            {fetchData.length}{" "}
            {fetchData.length === 1 ? "Order" : "Orders"}
          </span>
        </div>
      </div>

      {/* Empty State */}
      {fetchData.length === 0 && (
        <div className="min-h-[400px] flex items-center justify-center">
          <div className="text-center bg-white border border-slate-200 rounded-2xl p-10 shadow-sm max-w-md w-full">
            <div className="w-16 h-16 mx-auto rounded-full bg-slate-100 flex items-center justify-center">
              <FiShoppingBag className="text-slate-400 text-3xl" />
            </div>

            <h2 className="text-xl font-semibold text-slate-800 mt-5">
              No Orders Available
            </h2>

            <p className="text-sm text-slate-500 mt-2">
              There are currently no customer orders to display.
            </p>
          </div>
        </div>
      )}

      {/* Orders */}
      <div className="space-y-5">
        {fetchData.map((item, index) => (
          <div
            key={item?.userId + index}
            className="
              bg-white
              border border-slate-200
              rounded-2xl
              shadow-sm
              hover:shadow-md
              transition-all duration-300
              overflow-hidden
            "
          >
            {/* Order Header */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 px-5 py-4 bg-slate-50 border-b border-slate-200">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-violet-100 flex items-center justify-center">
                  <FiPackage className="text-violet-600" />
                </div>

                <div>
                  <p className="text-xs text-slate-400 uppercase tracking-wide font-medium">
                    Order Date
                  </p>

                  <p className="font-semibold text-slate-700 flex items-center gap-2">
                    <FiCalendar className="text-slate-400" />
                    {moment(item?.createdAt).format("LL")}
                  </p>
                </div>
              </div>

              <div className="px-3 py-1.5 rounded-full bg-green-50 border border-green-200 text-green-700 text-xs font-semibold">
                {item?.paymentDetails?.payment_status || "Unknown"}
              </div>
            </div>

            {/* Order Content */}
            <div className="p-5">
              <div className="flex flex-col lg:flex-row justify-between gap-8">
                {/* Products */}
                <div className="flex-1">
                  <h3 className="text-sm font-semibold text-slate-500 uppercase tracking-wide mb-4">
                    Products
                  </h3>

                  <div className="space-y-4">
                    {item?.productDetails?.map((product, productIndex) => (
                      <div
                        key={product?.productId + productIndex}
                        className="
                          flex gap-4
                          p-3
                          rounded-xl
                          border border-slate-100
                          bg-slate-50
                          hover:bg-slate-100
                          transition-colors
                        "
                      >
                        <div className="w-20 h-20 flex-shrink-0 rounded-xl bg-white border border-slate-200 overflow-hidden">
                          <img
                            src={product?.image?.[0]}
                            alt={product?.name || "Product"}
                            className="w-full h-full object-contain p-2"
                          />
                        </div>

                        <div className="min-w-0 flex-1">
                          <h4 className="font-semibold text-slate-800 text-base truncate">
                            {product?.name}
                          </h4>

                          <div className="flex flex-wrap gap-x-5 gap-y-1 mt-2 text-sm">
                            <p className="text-slate-500">
                              Price:{" "}
                              <span className="font-semibold text-blue-700">
                                {displayINRCurrency(product?.price)}
                              </span>
                            </p>

                            <p className="text-slate-500">
                              Quantity:{" "}
                              <span className="font-semibold text-violet-700">
                                {product?.quantity}
                              </span>
                            </p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Order Details */}
                <div className="lg:w-72">
                  <h3 className="text-sm font-semibold text-slate-500 uppercase tracking-wide mb-4">
                    Order Details
                  </h3>

                  <div className="space-y-4">
                    {/* Payment */}
                    <div className="p-4 rounded-xl bg-blue-50 border border-blue-100">
                      <div className="flex items-center gap-2 mb-2">
                        <FiCreditCard className="text-blue-600" />

                        <p className="font-semibold text-slate-700">
                          Payment
                        </p>
                      </div>

                      <p className="text-sm text-slate-500">
                        Method:{" "}
                        <span className="font-semibold text-blue-700">
                          {item?.paymentDetails?.payment_method_type?.[0] ||
                            "N/A"}
                        </span>
                      </p>

                      <p className="text-sm text-slate-500 mt-1">
                        Status:{" "}
                        <span className="font-semibold text-green-700">
                          {item?.paymentDetails?.payment_status || "N/A"}
                        </span>
                      </p>
                    </div>

                    {/* Shipping */}
                    <div className="p-4 rounded-xl bg-green-50 border border-green-100">
                      <div className="flex items-center gap-2 mb-2">
                        <FiTruck className="text-green-600" />

                        <p className="font-semibold text-slate-700">
                          Shipping
                        </p>
                      </div>

                      {item?.shipping_options?.map((shipping, shippingIndex) => (
                        <p
                          key={shippingIndex}
                          className="text-sm text-slate-500"
                        >
                          Shipping Amount:{" "}
                          <span className="font-semibold text-green-700">
                            {displayINRCurrency(
                              shipping?.shipping_amount
                            )}
                          </span>
                        </p>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Total */}
              <div className="border-t border-slate-200 mt-6 pt-5 flex justify-end">
                <div className="px-5 py-3 rounded-xl bg-slate-900 text-white shadow-sm">
                  <span className="text-sm text-slate-300 mr-2">
                    Total Amount
                  </span>

                  <span className="text-xl font-bold">
                    {displayINRCurrency(item?.total_amount)}
                  </span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AllOrders;