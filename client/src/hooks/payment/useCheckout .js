export const useCheckout = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: checkout,

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["orders"],
      });

      queryClient.invalidateQueries({
        queryKey: ["cart"],
      });
    },
  });
};