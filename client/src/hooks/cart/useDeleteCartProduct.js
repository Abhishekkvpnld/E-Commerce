import { useQueryClient } from "@tanstack/react-query";
import { deleteCartProduct } from "../../api/cartApi";

export const useDeleteCartProduct = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteCartProduct,

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["cart"],
      });
    },
  });
};