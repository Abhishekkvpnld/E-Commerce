import api from "../lib/axios";

export const checkout = async (orderData) => {
  const { data } = await api.post(
    "/checkout",
    orderData
  );

  return data;
};