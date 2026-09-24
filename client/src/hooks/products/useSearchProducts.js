import { useQuery } from "@tanstack/react-query";
import { searchProducts } from "../../api/productApi";

export const useSearchProducts = (search) => {
  return useQuery({
    
    queryKey: ["products", "search", search],
    queryFn: () => searchProducts(search),
    enabled: Boolean(search),
    staleTime: 2 * 60 * 1000,

    placeholderData: (previousData) => previousData,
  });
};