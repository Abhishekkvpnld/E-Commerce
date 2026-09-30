import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

import productCategory from "../helpers/productCategory";
import SearchVerticalProducts from "../components/SearchVerticalProducts";
import { useFilterProducts } from "../hooks/products/useFilterProducts";

import {
  FiFilter,
  FiX,
  FiSliders,
  FiCheck,
  FiSearch,
  FiRotateCcw,
} from "react-icons/fi";

const CategoryProduct = () => {
  const navigate = useNavigate();
  const location = useLocation();

  // =========================
  // URL CATEGORY
  // =========================

  const urlSearch = new URLSearchParams(location?.search);
  const urlCategoryListInArray = urlSearch.getAll("category");

  const urlCategoryListObject = {};

  urlCategoryListInArray.forEach((el) => {
    urlCategoryListObject[el] = true;
  });

  // =========================
  // STATE
  // =========================

  const [selectedCategory, setSelectedCategory] = useState(
    urlCategoryListObject
  );

  const [filterCategoryList, setFilterCategoryList] = useState(
    urlCategoryListInArray
  );

  const [sortBy, setSortBy] = useState("");
  const [mobileFilterOpen, setMobileFilterOpen] = useState(false);

  // =========================
  // TANSTACK QUERY
  // =========================

  const {
    data: response,
    isLoading,
    isFetching,
    isError,
    error,
  } = useFilterProducts({
    category: filterCategoryList,
  });

  const data = response?.data || [];

  // =========================
  // SORT PRODUCTS
  // =========================

  const sortedData = [...data].sort((a, b) => {
    if (sortBy === "asc") {
      return a.sellingPrice - b.sellingPrice;
    }

    if (sortBy === "dsc") {
      return b.sellingPrice - a.sellingPrice;
    }

    return 0;
  });

  // =========================
  // CATEGORY SELECTION
  // =========================

  const handleSelectedCategory = (e) => {
    const { value, checked } = e.target;

    setSelectedCategory((prev) => ({
      ...prev,
      [value]: checked,
    }));
  };

  // =========================
  // SORT
  // =========================

  const handleChangeSortBy = (e) => {
    const value = e?.target.value;
    setSortBy(value);
  };

  // =========================
  // UPDATE CATEGORY + URL
  // =========================

  useEffect(() => {
    if (selectedCategory !== undefined) {
      const arrayOfCategory = Object.keys(selectedCategory).filter(
        (key) => selectedCategory[key]
      );

      setFilterCategoryList(arrayOfCategory);

      const query = arrayOfCategory
        .map(
          (category) =>
            `category=${encodeURIComponent(category)}`
        )
        .join("&");

      navigate(
        query
          ? `/product-category?${query}`
          : "/product-category",
        {
          replace: true,
        }
      );
    }
  }, [selectedCategory, navigate]);

  // =========================
  // CLEAR FILTERS
  // =========================

  const clearFilters = () => {
    setSelectedCategory({});
    setSortBy("");
  };

  const selectedCount = filterCategoryList.length;

  // =========================
  // FILTER PANEL
  // =========================

  const FilterPanel = () => (
    <div className="space-y-7 p-5">

      {/* ================= SORT ================= */}

      <div>
        <div className="mb-4 flex items-center justify-between">
          <div>
            <p className="text-xs font-semibold uppercase tracking-wider text-slate-400">
              Sort
            </p>

            <h3 className="mt-1 text-sm font-bold text-slate-800">
              Sort by Price
            </h3>
          </div>

          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-slate-100 text-slate-500">
            <FiSliders size={15} />
          </div>
        </div>

        <div className="space-y-2">

          {/* LOW TO HIGH */}

          <label
            className={`group flex cursor-pointer items-center justify-between rounded-xl border p-3 transition-all duration-200 ${
              sortBy === "asc"
                ? "border-purple-200 bg-purple-50 shadow-sm"
                : "border-slate-100 bg-white hover:border-slate-200 hover:bg-slate-50"
            }`}
          >
            <div className="flex items-center gap-3">

              <input
                type="radio"
                name="sortby"
                value="asc"
                checked={sortBy === "asc"}
                onChange={handleChangeSortBy}
                className="hidden"
              />

              <span
                className={`flex h-5 w-5 items-center justify-center rounded-full border transition-all ${
                  sortBy === "asc"
                    ? "border-purple-600 bg-purple-600"
                    : "border-slate-300"
                }`}
              >
                {sortBy === "asc" && (
                  <FiCheck
                    size={12}
                    className="text-white"
                  />
                )}
              </span>

              <span
                className={`text-sm font-medium ${
                  sortBy === "asc"
                    ? "text-purple-700"
                    : "text-slate-600"
                }`}
              >
                Low to High
              </span>
            </div>
          </label>

          {/* HIGH TO LOW */}

          <label
            className={`group flex cursor-pointer items-center justify-between rounded-xl border p-3 transition-all duration-200 ${
              sortBy === "dsc"
                ? "border-purple-200 bg-purple-50 shadow-sm"
                : "border-slate-100 bg-white hover:border-slate-200 hover:bg-slate-50"
            }`}
          >
            <div className="flex items-center gap-3">

              <input
                type="radio"
                name="sortby"
                value="dsc"
                checked={sortBy === "dsc"}
                onChange={handleChangeSortBy}
                className="hidden"
              />

              <span
                className={`flex h-5 w-5 items-center justify-center rounded-full border transition-all ${
                  sortBy === "dsc"
                    ? "border-purple-600 bg-purple-600"
                    : "border-slate-300"
                }`}
              >
                {sortBy === "dsc" && (
                  <FiCheck
                    size={12}
                    className="text-white"
                  />
                )}
              </span>

              <span
                className={`text-sm font-medium ${
                  sortBy === "dsc"
                    ? "text-purple-700"
                    : "text-slate-600"
                }`}
              >
                High to Low
              </span>
            </div>
          </label>

        </div>
      </div>

      {/* DIVIDER */}

      <div className="h-px bg-slate-100" />

      {/* ================= CATEGORIES ================= */}

      <div>
        <div className="mb-4 flex items-center justify-between">

          <div>
            <p className="text-xs font-semibold uppercase tracking-wider text-slate-400">
              Categories
            </p>

            <h3 className="mt-1 text-sm font-bold text-slate-800">
              Browse Categories
            </h3>
          </div>

          {selectedCount > 0 && (
            <span className="rounded-full bg-purple-100 px-2.5 py-1 text-xs font-bold text-purple-700">
              {selectedCount}
            </span>
          )}
        </div>

        <div className="space-y-1">

          {productCategory?.map((cat, index) => {
            const checked = !!selectedCategory[cat?.value];

            return (
              <label
                key={index}
                className={`group flex cursor-pointer items-center gap-3 rounded-xl px-3 py-2.5 transition-all duration-200 ${
                  checked
                    ? "bg-purple-50 text-purple-700"
                    : "text-slate-600 hover:bg-slate-50"
                }`}
              >

                <input
                  type="checkbox"
                  name="category"
                  value={cat?.value}
                  checked={checked}
                  id={cat?.value}
                  onChange={handleSelectedCategory}
                  className="hidden"
                />

                <span
                  className={`flex h-5 w-5 items-center justify-center rounded-md border transition-all duration-200 ${
                    checked
                      ? "border-purple-600 bg-purple-600"
                      : "border-slate-300 bg-white group-hover:border-purple-300"
                  }`}
                >
                  {checked && (
                    <FiCheck
                      size={13}
                      className="text-white"
                    />
                  )}
                </span>

                <span className="flex-1 text-sm font-medium capitalize">
                  {cat?.value}
                </span>

                {checked && (
                  <span className="h-1.5 w-1.5 rounded-full bg-purple-500" />
                )}

              </label>
            );
          })}

        </div>
      </div>

      {/* ================= CLEAR ================= */}

      {(selectedCount > 0 || sortBy) && (
        <button
          onClick={clearFilters}
          className="flex w-full items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white py-2.5 text-sm font-semibold text-slate-600 transition-all duration-200 hover:border-red-200 hover:bg-red-50 hover:text-red-500 active:scale-[0.98]"
        >
          <FiRotateCcw size={15} />
          Clear All Filters
        </button>
      )}
    </div>
  );

  // =========================
  // RETURN
  // =========================

  return (
    <div className="min-h-screen bg-slate-50">

      {/* ================= HEADER ================= */}

      <div className="border-b border-slate-200 bg-white">
        <div className="mx-auto max-w-[1600px] px-4 py-5 md:px-6">

          <div className="flex items-center justify-between">

            <div>
              <p className="text-xs font-semibold uppercase tracking-widest text-purple-500">
                Explore
              </p>

              <h1 className="mt-1 text-xl font-bold text-slate-800 md:text-2xl">
                Discover Products
              </h1>

              <p className="mt-1 hidden text-sm text-slate-400 sm:block">
                Find products that match your preferences
              </p>
            </div>

            {/* MOBILE FILTER BUTTON */}

            <button
              onClick={() => setMobileFilterOpen(true)}
              className="flex items-center gap-2 rounded-xl border border-purple-200 bg-purple-50 px-4 py-2.5 text-sm font-semibold text-purple-700 transition-all duration-200 hover:bg-purple-100 active:scale-95 md:hidden"
            >
              <FiFilter size={17} />

              Filter

              {selectedCount > 0 && (
                <span className="flex h-5 min-w-5 items-center justify-center rounded-full bg-purple-600 px-1.5 text-[10px] text-white">
                  {selectedCount}
                </span>
              )}
            </button>

          </div>
        </div>
      </div>

      {/* ================= ACTIVE FILTERS ================= */}

      {(selectedCount > 0 || sortBy) && (
        <div className="border-b border-slate-100 bg-white">

          <div className="mx-auto flex max-w-[1600px] items-center gap-2 overflow-x-auto px-4 py-3 md:px-6">

            <span className="shrink-0 text-xs font-semibold text-slate-400">
              Active:
            </span>

            {filterCategoryList.map((category) => (
              <button
                key={category}
                onClick={() =>
                  handleSelectedCategory({
                    target: {
                      value: category,
                      checked: false,
                    },
                  })
                }
                className="group flex shrink-0 items-center gap-1.5 rounded-full bg-purple-50 px-3 py-1.5 text-xs font-medium capitalize text-purple-700 transition-all hover:bg-purple-100"
              >
                {category}

                <FiX
                  size={13}
                  className="transition-transform group-hover:rotate-90"
                />
              </button>
            ))}

            {sortBy && (
              <span className="shrink-0 rounded-full bg-slate-100 px-3 py-1.5 text-xs font-medium text-slate-600">
                Price:{" "}
                {sortBy === "asc"
                  ? "Low → High"
                  : "High → Low"}
              </span>
            )}

            <button
              onClick={clearFilters}
              className="ml-auto shrink-0 text-xs font-semibold text-red-500 hover:text-red-600"
            >
              Clear
            </button>

          </div>
        </div>
      )}

      {/* ================= MOBILE DRAWER ================= */}

      {mobileFilterOpen && (
        <div className="fixed inset-0 z-50 md:hidden">

          {/* BACKDROP */}

          <div
            className="absolute inset-0 animate-[fadeIn_0.2s_ease-out] bg-slate-900/50 backdrop-blur-sm"
            onClick={() => setMobileFilterOpen(false)}
          />

          {/* DRAWER */}

          <div className="absolute bottom-0 left-0 top-0 w-[85%] max-w-sm animate-[slideIn_0.25s_ease-out] overflow-y-auto bg-white shadow-2xl">

            <div className="sticky top-0 z-10 flex items-center justify-between border-b border-slate-100 bg-white px-5 py-4">

              <div>
                <h2 className="font-bold text-slate-800">
                  Filters & Sort
                </h2>

                <p className="mt-0.5 text-xs text-slate-400">
                  Refine your results
                </p>
              </div>

              <button
                onClick={() => setMobileFilterOpen(false)}
                className="flex h-9 w-9 items-center justify-center rounded-full bg-slate-100 text-slate-500 transition-all duration-200 hover:rotate-90 hover:bg-slate-200"
              >
                <FiX size={19} />
              </button>

            </div>

            <FilterPanel />

            <div className="sticky bottom-0 border-t border-slate-100 bg-white p-4">

              <button
                onClick={() => setMobileFilterOpen(false)}
                className="w-full rounded-xl bg-gradient-to-r from-purple-600 to-indigo-600 py-3 text-sm font-bold text-white shadow-lg shadow-purple-200 transition-all duration-200 hover:shadow-xl active:scale-[0.98]"
              >
                Show {sortedData.length} Products
              </button>

            </div>

          </div>
        </div>
      )}

      {/* ================= MAIN CONTENT ================= */}

      <div className="mx-auto max-w-[1600px] md:p-5">

        <div className="md:grid md:grid-cols-[260px_minmax(0,1fr)] md:gap-5">

          {/* ================= DESKTOP SIDEBAR ================= */}

          <aside className="hidden md:block">

            <div className="sticky top-5 overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">

              <div className="flex items-center gap-2 border-b border-slate-100 px-5 py-4">

                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-purple-50 text-purple-600">
                  <FiFilter size={16} />
                </div>

                <div>
                  <h2 className="text-sm font-bold text-slate-800">
                    Filters
                  </h2>

                  <p className="text-[11px] text-slate-400">
                    Refine products
                  </p>
                </div>

              </div>

              <div className="max-h-[calc(100vh-150px)] overflow-y-auto">
                <FilterPanel />
              </div>

            </div>

          </aside>

          {/* ================= PRODUCTS ================= */}

          <main className="min-w-0 p-3 md:p-0">

            {/* RESULT HEADER */}

            <div className="mb-4 flex items-center justify-between">

              <div>
                <h2 className="text-base font-bold text-slate-800 md:text-lg">
                  {isLoading
                    ? "Finding products..."
                    : "Search Results"}
                </h2>

                <p className="mt-0.5 text-xs text-slate-400">
                  {isLoading
                    ? "Please wait"
                    : `${sortedData.length} products found`}
                </p>
              </div>

              {/* RESULT COUNT */}

              <div className="hidden rounded-full bg-white px-4 py-2 text-xs font-semibold text-slate-500 shadow-sm ring-1 ring-slate-100 md:block">
                {sortedData.length} Results
              </div>

            </div>

            {/* ================= BACKGROUND FETCH ================= */}

            {isFetching && !isLoading && (
              <div className="mb-3 flex items-center gap-2 text-xs font-medium text-purple-600">
                <span className="h-2 w-2 animate-pulse rounded-full bg-purple-600" />
                Updating products...
              </div>
            )}

            {/* ================= ERROR ================= */}

            {isError ? (
              <div className="flex min-h-[450px] flex-col items-center justify-center rounded-2xl border border-red-100 bg-white px-5 text-center">

                <div className="mb-5 flex h-20 w-20 items-center justify-center rounded-3xl bg-red-50 text-red-400">
                  <FiSearch size={32} />
                </div>

                <h3 className="text-lg font-bold text-slate-700">
                  Something went wrong
                </h3>

                <p className="mt-2 max-w-sm text-sm leading-6 text-slate-400">
                  {error?.message ||
                    "Unable to load products. Please try again."}
                </p>

              </div>
            ) : isLoading ? (

              /* ================= LOADING ================= */

              <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">

                {Array.from({ length: 10 }).map((_, index) => (
                  <div
                    key={index}
                    className="overflow-hidden rounded-xl border border-slate-100 bg-white shadow-sm"
                  >
                    <div className="aspect-square animate-pulse bg-slate-200" />

                    <div className="space-y-3 p-3">
                      <div className="h-3 w-3/4 animate-pulse rounded bg-slate-200" />
                      <div className="h-3 w-1/2 animate-pulse rounded bg-slate-200" />
                      <div className="h-4 w-1/3 animate-pulse rounded bg-slate-200" />
                    </div>
                  </div>
                ))}

              </div>

            ) : sortedData.length > 0 ? (

              /* ================= PRODUCTS ================= */

              <div className="animate-[productsIn_0.3s_ease-out]">

                <SearchVerticalProducts
                  data={sortedData}
                  loading={isLoading}
                />

              </div>

            ) : (

              /* ================= EMPTY STATE ================= */

              <div className="flex min-h-[450px] flex-col items-center justify-center rounded-2xl border border-dashed border-slate-200 bg-white px-5 text-center">

                <div className="mb-5 flex h-20 w-20 items-center justify-center rounded-3xl bg-slate-100 text-slate-400">
                  <FiSearch size={32} />
                </div>

                <h3 className="text-lg font-bold text-slate-700">
                  No products found
                </h3>

                <p className="mt-2 max-w-sm text-sm leading-6 text-slate-400">
                  We couldn't find products matching your
                  selected filters. Try changing or clearing
                  your filters.
                </p>

                <button
                  onClick={clearFilters}
                  className="mt-5 flex items-center gap-2 rounded-xl bg-slate-900 px-5 py-2.5 text-sm font-semibold text-white transition-all duration-200 hover:bg-slate-700 active:scale-95"
                >
                  <FiRotateCcw size={15} />
                  Clear Filters
                </button>

              </div>
            )}

          </main>
        </div>
      </div>

      {/* ================= ANIMATIONS ================= */}

      <style>
        {`
          @keyframes fadeIn {
            from {
              opacity: 0;
            }
            to {
              opacity: 1;
            }
          }

          @keyframes slideIn {
            from {
              transform: translateX(-100%);
            }
            to {
              transform: translateX(0);
            }
          }

          @keyframes productsIn {
            from {
              opacity: 0;
              transform: translateY(8px);
            }
            to {
              opacity: 1;
              transform: translateY(0);
            }
          }
        `}
      </style>

    </div>
  );
};

export default CategoryProduct;