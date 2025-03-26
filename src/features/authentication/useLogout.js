import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { logoutUser } from "../../services/apiAuth";
import toast from "react-hot-toast";

export default function useLogout() {
   const navigate = useNavigate();
   const queryClient = useQueryClient();
   const { mutate, isLoading } = useMutation({
      mutationFn: logoutUser,
      onSuccess: () => {
         navigate("/login", { replace: true });
         queryClient.removeQueries();
         toast.success("Successfully log out");
      },
   });
   return { mutate, isLoading };
}
