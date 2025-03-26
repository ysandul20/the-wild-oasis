import { useMutation } from "@tanstack/react-query";
import { userSignIn } from "../../services/apiAuth";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

export default function useLogin() {
   const navigate = useNavigate();
   const { mutate, isLoading } = useMutation({
      mutationFn: ({ email, password }) => userSignIn({ email, password }),
      onSuccess: (userData) => {
         console.log("userData", userData);
         navigate("/dashboard");
         toast.success("Successfully log in");
      },
      onError: (err) => {
         console.error(err.message);
         toast.error("Provided email or password are incorrect");
      },
   });
   return { mutate, isLoading };
}
