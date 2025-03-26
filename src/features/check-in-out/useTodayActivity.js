import { useQuery } from "@tanstack/react-query";
import { getStaysTodayActivity } from "../../services/apiBookings";

function useTodayActivity() {
   const { data, isLoading } = useQuery({
      queryFn: getStaysTodayActivity,
      queryKey: ["bookings-today"],
   });
   return { data, isLoading };
}

export default useTodayActivity;
