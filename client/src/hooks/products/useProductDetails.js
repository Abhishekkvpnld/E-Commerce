import { useQuery } from "@tanstack/react-query";
import { getProductDetails } from "../../api/productApi";

export const useProductDetails = (productId) => {
  return useQuery({
    queryKey: ["product-details", productId],
    queryFn: () => getProductDetails(productId),
    enabled: !!productId,
    staleTime: 10 * 60 * 1000,
  });
};