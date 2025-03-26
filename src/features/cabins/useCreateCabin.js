import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { createCabin } from "../../services/apiCabins";

export default function useCreateCabin() {
   const queryClient = useQueryClient();
   const { mutate, isLoading: isCreating } = useMutation({
      mutationFn: createCabin,
      onSuccess: () => {
         queryClient.invalidateQueries({ queryKey: ["cabins"] });
         toast.success("Cabin successfully added");
      },
      onError: (err) => toast.error(err.message),
   });
   return { mutate, isCreating };
}
