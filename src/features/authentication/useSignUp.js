import { useMutation } from "@tanstack/react-query";
import { userSignUp } from "../../services/apiAuth";
import toast from "react-hot-toast";

export default function useSignUp() {
   const { mutate, isLoading } = useMutation({
      mutationFn: ({ fullName, email, password }) =>
         userSignUp({ fullName, email, password }),
      onSuccess: () => {
         toast.success(
            "User successfully created. Please verify email address"
         );
      },
      onError: (err) => {
         console.error(err.message);
         toast.error("Something went wrong");
      },
   });
   return { mutate, isLoading };
}
