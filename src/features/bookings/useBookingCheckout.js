import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateBooking } from "../../services/apiBookings";
import toast from "react-hot-toast";

export default function useBookingCheckout() {
   const queryClient = useQueryClient();
   const { mutate, isLoading } = useMutation({
      mutationFn: (bookingId) =>
         updateBooking(bookingId, {
            status: "checked-out",
         }),
      onSuccess: (data) => {
         queryClient.invalidateQueries({ active: true });
         toast.success(`Status ob booking #${data.id} successfully changed`);
      },
      onError: (err) => toast.error(err.message),
   });
   return { mutate, isLoading };
}
