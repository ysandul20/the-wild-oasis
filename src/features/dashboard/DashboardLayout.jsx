import styled from "styled-components";
import useRecentBookings from "./useRecentBookings";
import Spinner from "../../ui/Spinner";
import useRecentStays from "./useRecentStays";
import Stats from "./Stats";
import SalesChart from "./SalesChart";
import DurationChart from "./DurationChart";
import TodayActivity from "../check-in-out/TodayActivity";

const StyledDashboardLayout = styled.div`
   display: grid;
   grid-template-columns: 1fr 1fr 1fr 1fr;
   grid-template-rows: auto 34rem auto;
   gap: 2.4rem;
`;
function DashboardLayout() {
   const { bookings, isLoadingBookings } = useRecentBookings();
   const { stays, isLoadingStays, numDays } = useRecentStays();
   if (isLoadingBookings || isLoadingStays || !bookings || !stays)
      return <Spinner />;

   const confirmedStays = stays.filter(
      (stay) => stay.status === "checked-in" || stay.status === "checked-out"
   );
   // console.log(bookings, stays, confirmedStays);
   return (
      <StyledDashboardLayout>
         <Stats bookings={bookings} confirmedStays={confirmedStays} />
         <TodayActivity />
         <DurationChart confirmedStays={confirmedStays} />
         <SalesChart bookings={bookings} numDays={numDays} />
      </StyledDashboardLayout>
   );
}

export default DashboardLayout;
