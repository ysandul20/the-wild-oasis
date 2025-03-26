import { useQuery } from "@tanstack/react-query";
import { getCurrentUser } from "../../services/apiAuth";

export default function useAuthUser() {
   const { data, isLoading } = useQuery({
      queryKey: ["user"],
      queryFn: getCurrentUser,
   });
   return { data, isLoading };
}
