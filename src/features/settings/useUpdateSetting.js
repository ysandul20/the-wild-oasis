import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { updateSetting } from "../../services/apiSettings";

export default function useUpdateSetting() {
   const queryClient = useQueryClient();
   const { mutate, isLoading: isUpdating } = useMutation({
      mutationFn: updateSetting,
      onSuccess: () => {
         queryClient.invalidateQueries({ queryKey: ["settings"] });
         toast.success("Setting successfully updated");
      },
      onError: (err) => toast.error(err.message),
   });
   return { mutate, isUpdating };
}
