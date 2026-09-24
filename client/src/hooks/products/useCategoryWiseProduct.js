import { useQuery } from "@tanstack/react-query";
import { getCategoryWiseProduct } from "../../api/productApi";

export const useCategoryWiseProduct = (category) => {
  return useQuery({

    queryKey: ["products", "category-wise", category],
    queryFn: () => getCategoryWiseProduct(category),
    enabled: Boolean(category),
    staleTime: 5 * 60 * 1000,
    gcTime: 30 * 60 * 1000,
    refetchOnWindowFocus: false,
  });
};
