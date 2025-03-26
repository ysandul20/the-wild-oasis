import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateUserData } from "../../services/apiAuth";
import toast from "react-hot-toast";

export default function useUpdateUser() {
   const queryClient = useQueryClient();
   const { mutate, isLoading } = useMutation({
      mutationFn: ({ fullName, password, avatar }) =>
         updateUserData({ fullName, password, avatar }),
      onSuccess: (data) => {
         console.log("new user data", data);
         queryClient.invalidateQueries("user", data);
         toast.success("User data succsessfully updated");
      },
      onError: (err) => {
         console.error(err.message);
         toast.error("Something went wrong");
      },
   });
   return { mutate, isLoading };
}
