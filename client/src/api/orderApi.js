import api from "../lib/axios";

export const getOrders = async () => {
  const { data } = await api.get("/order-list");

  return data;
};


export const getAllOrders = async () => {
  const response = await api.get("/all-orders");

  return response?.data?.data || [];
};