import { useQuery } from "@tanstack/react-query";
import { getAllProducts } from "../../api/productApi";

export const useAllProducts = () => {
  return useQuery({

    queryKey: ["products", "all"],
    queryFn: getAllProducts,
    // Product catalog doesn't change frequently
    staleTime: 5 * 60 * 1000,
    // Keep unused cache for 30 minutes
    gcTime: 30 * 60 * 1000,
    refetchOnWindowFocus: false,
    refetchOnReconnect: true,
  });
};

