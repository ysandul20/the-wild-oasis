import { useQuery } from "@tanstack/react-query";
import { subDays } from "date-fns";
import { useSearchParams } from "react-router-dom";
import { getStaysAfterDate } from "../../services/apiBookings";

function useRecentStays() {
   const [searchParams] = useSearchParams();
   const numDays = !searchParams.get("last")
      ? 7
      : Number(searchParams.get("last"));
   const daysAgo = subDays(new Date(), numDays).toISOString();
   const { data: stays, isLoadingStays } = useQuery({
      queryFn: () => getStaysAfterDate(daysAgo),
      queryKey: ["stays", `last-${numDays}`],
   });
   return { stays, isLoadingStays, numDays };
}

export default useRecentStays;
