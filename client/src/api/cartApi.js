import api from "../lib/axios";

// get cart products
export const getCartProducts = async () => {
  const { data } = await api.get("/view-cart-product");

  return data;
};

// update cart product
export const updateCartProduct = async (payload) => {
  const { data } = await api.post("/update-cart-product", payload);

  return data;
};

//delete cart product
export const deleteCartProduct = async (productId) => {
  const { data } = await api.post("/delete-cart-product", { productId });

  return data;
};
