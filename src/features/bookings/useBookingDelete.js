import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteBooking } from "../../services/apiBookings";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

export default function useBookingDelete() {
   const queryClient = useQueryClient();
   const navigate = useNavigate();
   const { mutate, isLoading } = useMutation({
      mutationFn: (id) => deleteBooking(id),
      onSuccess: () => {
         queryClient.invalidateQueries({ queryKey: ["bookings"] });
         navigate("/bookings");
         toast.success("Booking successfully deleted");
      },
      onError: (err) => toast.error(err.message),
   });
   return { mutate, isLoading };
}
