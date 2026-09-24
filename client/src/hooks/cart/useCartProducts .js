import { useQuery } from "@tanstack/react-query";
import { getCartProducts } from "../../api/cartApi";

export const useCartProducts = () => {
  return useQuery({
    queryKey: ["cart", "products"],
    queryFn: getCartProducts,
    staleTime: 30 * 1000,
  });
};