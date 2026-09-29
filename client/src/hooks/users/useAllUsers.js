import { useQuery } from "@tanstack/react-query";
import { getAllUsers } from "../../api/userApi";

export const useAllUsers = () => {
  return useQuery({
    queryKey: ["users", "all"],
    queryFn: getAllUsers,
    staleTime: 60 * 1000, // 1 minute
    gcTime: 30 * 60 * 1000, // 30 minutes
    refetchOnWindowFocus: false,
    refetchOnReconnect: true,
  });
};