import api from "../lib/axios";


//get product details
export const getProductDetails = async (productId) => {
  const { data } = await api.post("/get-product-details", {
    productId,
  });

  return data;
};


//search products
export const searchProducts = async (search) => {
  const { data } = await api.post("/search-products", {
    search,
  });

  return data;
};

//filter products
export const filterProducts = async (filters) => {
  const { data } = await api.post(
    "/filter-products",
    filters
  );

  return data;
};


// Get all products
export const getAllProducts = async () => {
  const { data } = await api.get("/get-all-products");
  return data;
};

// Get category products
export const getCategoryProduct = async (category) => {
  const { data } = await api.get("/get-category-product", {
    params: {
      category,
    },
  });

  return data;
};

// Get category-wise products
export const getCategoryWiseProduct = async (category) => {
  const { data } = await api.post(
    "/get-categoryWise-product",
    {
      category,
    }
  );

  return data;
};

