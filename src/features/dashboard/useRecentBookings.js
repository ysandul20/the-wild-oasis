import { useQuery } from "@tanstack/react-query";
import { subDays } from "date-fns";
import { useSearchParams } from "react-router-dom";
import { getBookingsAfterDate } from "../../services/apiBookings";

function useRecentBookings() {
   const [searchParams] = useSearchParams();
   const numDays = !searchParams.get("last")
      ? 7
      : Number(searchParams.get("last"));
   const daysAgo = subDays(new Date(), numDays).toISOString();
   const { data: bookings, isLoadingBookings } = useQuery({
      queryFn: () => getBookingsAfterDate(daysAgo),
      queryKey: ["bookings", `last-${numDays}`],
   });
   return { bookings, isLoadingBookings };
}

export default useRecentBookings;
