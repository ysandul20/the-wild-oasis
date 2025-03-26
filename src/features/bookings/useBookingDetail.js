import { useQuery } from "@tanstack/react-query";
import { getBooking } from "../../services/apiBookings";
import { useParams } from "react-router-dom";

export default function useBookingDetail() {
   const { id } = useParams();

   const { data, isLoading, error } = useQuery({
      queryKey: [`booking/${id}`],
      queryFn: () => getBooking(id),
   });
   return { data, isLoading, error };
}
