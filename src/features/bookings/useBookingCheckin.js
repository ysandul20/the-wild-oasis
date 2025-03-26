import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateBooking } from "../../services/apiBookings";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

export default function useBookingCheckin() {
   const queryClient = useQueryClient();
   const navigate = useNavigate();
   const { mutate, isLoading } = useMutation({
      mutationFn: ({ bookingId, breakfastObj }) => {
         // console.log(breakfastObj);
         return updateBooking(bookingId, {
            ...breakfastObj,
            isPaid: true,
            status: "checked-in",
         });
      },
      onSuccess: (data) => {
         console.log(data);
         queryClient.invalidateQueries({ active: true });
         navigate("/bookings");
         toast.success(`Status ob booking #${data.id} successfully changed`);
      },
      onError: (err) => toast.error(err.message),
   });
   return { mutate, isLoading };
}
