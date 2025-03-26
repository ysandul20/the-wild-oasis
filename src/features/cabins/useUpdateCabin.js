import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { updateCabin } from "../../services/apiCabins";

export default function useUpdateCabin() {
   const queryClient = useQueryClient();
   const { mutate, isLoading: isCreating } = useMutation({
      mutationFn: updateCabin,
      onSuccess: () => {
         queryClient.invalidateQueries({ queryKey: ["cabins"] });
         toast.success("Cabin successfully added");
      },
      onError: (err) => toast.error(err.message),
   });
   return { mutate, isCreating };
}
