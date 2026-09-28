import { useQuery } from "@tanstack/react-query";
import { getCategoryProduct } from "../../api/productApi";

export const useCategoryProduct = () => {
  return useQuery({
    queryKey: ["products", "categories"],
    queryFn: getCategoryProduct,
    staleTime: 10 * 60 * 1000,
    gcTime: 30 * 60 * 1000,
    refetchOnWindowFocus: false,
  });
};
