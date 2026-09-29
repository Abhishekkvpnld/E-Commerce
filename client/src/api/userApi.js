import api from "../lib/axios";

export const getAllUsers = async () => {
  const response = await api.get("/all-users");

  return response?.data;
};