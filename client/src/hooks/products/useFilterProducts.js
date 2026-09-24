import { useQuery } from "@tanstack/react-query";
import { filterProducts } from "../../api/productApi";

export const useFilterProducts = (filters) => {
  return useQuery({

    queryKey: ["products", "filter", filters],
    queryFn: () => filterProducts(filters),
    enabled: Boolean(filters),
    staleTime: 2 * 60 * 1000,
    placeholderData: (previousData) => previousData,
  });

};