import { useState } from "react";
import { FiPackage, FiPlus, FiRefreshCw, FiSearch } from "react-icons/fi";
import UploadProduct from "../components/UploadProduct";
import AdminProductCard from "../components/AdminProductCard";
import { useAllProducts } from "../hooks/products/useAllProducts";

const AllProducts = () => {
  const [openUploadProduct, setOpenUploadProduct] = useState(false);
  const [search, setSearch] = useState("");

  const {
    data: response,
    isLoading,
    isError,
    error,
    refetch,
    isFetching,
  } = useAllProducts();

  const allProducts = response?.data || [];

  const filteredProducts = allProducts.filter((product) =>
    `${product?.productName || ""} ${product?.brandName || ""} ${product?.category || ""}`
      .toLowerCase()
      .includes(search.toLowerCase())
  );

  return (
    <div className="min-h-full bg-slate-50">
      {/* Header */}
      <div className="sticky top-0 z-10 border-b border-slate-200 bg-white/95 px-4 py-4 backdrop-blur">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          {/* Title */}
          <div className="flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-slate-900 text-white shadow-sm">
              <FiPackage size={21} />
            </div>

            <div>
              <h2 className="text-xl font-bold text-slate-800">
                All Products
              </h2>
              <p className="text-sm text-slate-500">
                Manage your product catalog
              </p>
            </div>
          </div>

          {/* Actions */}
          <div className="flex items-center gap-2">
            <button
              onClick={() => refetch()}
              disabled={isFetching}
              className="flex items-center gap-2 rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm font-medium text-slate-600 transition hover:border-slate-300 hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-60"
              title="Refresh products"
            >
              <FiRefreshCw
                size={16}
                className={isFetching ? "animate-spin" : ""}
              />
              <span className="hidden sm:inline">Refresh</span>
            </button>

            <button
              onClick={() => setOpenUploadProduct(true)}
              className="flex items-center gap-2 rounded-lg bg-slate-900 px-4 py-2 text-sm font-semibold text-white shadow-sm transition-all duration-200 hover:bg-slate-700 hover:shadow-md active:scale-95"
            >
              <FiPlus size={18} />
              Upload Product
            </button>
          </div>
        </div>

        {/* Search + Stats */}
        {!isLoading && !isError && (
          <div className="mt-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            {/* Search */}
            <div className="relative w-full sm:max-w-sm">
              <FiSearch
                size={18}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
              />

              <input
                type="text"
                placeholder="Search products..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full rounded-lg border border-slate-200 bg-slate-50 py-2 pl-10 pr-4 text-sm outline-none transition focus:border-slate-400 focus:bg-white focus:ring-2 focus:ring-slate-100"
              />
            </div>

            {/* Product count */}
            <div className="flex items-center gap-2 text-sm text-slate-500">
              <span className="rounded-full bg-slate-100 px-3 py-1.5 font-medium text-slate-700">
                {allProducts.length} Products
              </span>

              {search && (
                <span className="text-xs">
                  {filteredProducts.length} result
                  {filteredProducts.length !== 1 ? "s" : ""}
                </span>
              )}
            </div>
          </div>
        )}
      </div>

      {/* Loading */}
      {isLoading && (
        <div className="grid grid-cols-2 gap-4 p-4 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
          {Array.from({ length: 10 }).map((_, index) => (
            <div
              key={index}
              className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm"
            >
              <div className="h-44 animate-pulse bg-slate-200" />

              <div className="space-y-3 p-4">
                <div className="h-4 w-3/4 animate-pulse rounded bg-slate-200" />
                <div className="h-3 w-1/2 animate-pulse rounded bg-slate-200" />
                <div className="h-4 w-1/3 animate-pulse rounded bg-slate-200" />
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Error */}
      {isError && (
        <div className="flex min-h-[calc(100vh-230px)] items-center justify-center p-6">
          <div className="max-w-md rounded-2xl border border-red-100 bg-white p-8 text-center shadow-sm">
            <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-red-50 text-red-500">
              <FiPackage size={24} />
            </div>

            <h3 className="text-lg font-bold text-slate-800">
              Unable to load products
            </h3>

            <p className="mt-2 text-sm text-slate-500">
              {error?.message || "Something went wrong while fetching products."}
            </p>

            <button
              onClick={() => refetch()}
              className="mt-5 rounded-lg bg-slate-900 px-5 py-2 text-sm font-semibold text-white transition hover:bg-slate-700"
            >
              Try Again
            </button>
          </div>
        </div>
      )}

      {/* Products */}
      {!isLoading && !isError && (
        <div className="h-[calc(100vh-245px)] overflow-y-auto p-4">
          {filteredProducts.length > 0 ? (
            <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6">
              {filteredProducts.map((product) => (
                <AdminProductCard
                  data={product}
                  key={product?._id}
                />
              ))}
            </div>
          ) : (
            <div className="flex min-h-[50vh] items-center justify-center">
              <div className="text-center">
                <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-slate-100 text-slate-400">
                  <FiPackage size={30} />
                </div>

                <h3 className="text-lg font-semibold text-slate-700">
                  {search ? "No products found" : "No products available"}
                </h3>

                <p className="mt-1 text-sm text-slate-400">
                  {search
                    ? "Try searching with a different product name."
                    : "Start adding products to your catalog."}
                </p>

                {!search && (
                  <button
                    onClick={() => setOpenUploadProduct(true)}
                    className="mt-4 inline-flex items-center gap-2 rounded-lg bg-slate-900 px-4 py-2 text-sm font-semibold text-white transition hover:bg-slate-700"
                  >
                    <FiPlus size={17} />
                    Add Product
                  </button>
                )}
              </div>
            </div>
          )}
        </div>
      )}

      {/* Upload Product Modal */}
      {openUploadProduct && (
        <UploadProduct
          onClose={() => setOpenUploadProduct(false)}
        />
      )}
    </div>
  );
};

export default AllProducts;