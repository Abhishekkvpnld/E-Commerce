import { useQuery } from "@tanstack/react-query";
import { getAllOrders } from "../../api/orderApi";

export const useAllOrders = () => {
  return useQuery({
    queryKey: ["orders", "all"],
    queryFn: getAllOrders,
    staleTime: 30 * 1000,
  });
};