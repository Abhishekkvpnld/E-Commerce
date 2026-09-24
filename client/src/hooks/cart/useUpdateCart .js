import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateCartProduct } from "../../api/cartApi";

export const useUpdateCart = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateCartProduct,

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["cart"],
      });
    },
  });
};