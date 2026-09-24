import { useQuery } from "@tanstack/react-query";
import { getCategoryProduct } from "../../api/productApi";


export const useCategoryProduct = (category) => {
  return useQuery({

    queryKey: ["products", "category", category],
    queryFn: () => getCategoryProduct(category),
    enabled: Boolean(category),
    staleTime: 10 * 60 * 1000,
    gcTime: 30 * 60 * 1000,
    refetchOnWindowFocus: false,
  });
};

