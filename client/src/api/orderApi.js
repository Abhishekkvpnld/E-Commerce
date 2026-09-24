import api from "../lib/axios";

export const getOrders = async () => {
  const { data } = await api.get("/order-list");

  return data;
};