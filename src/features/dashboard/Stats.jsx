import { HiOutlineBriefcase, HiOutlineChartBar } from "react-icons/hi";
import Stat from "./Stat";
import { HiOutlineBanknotes, HiOutlineCalendarDays } from "react-icons/hi2";
import { formatCurrency } from "../../utils/helpers";

function Stats({ bookings, confirmedStays }) {
   console.log(bookings);
   const sales = bookings.reduce((acc, val) => acc + val.totalPrice, 0);
   return (
      <>
         <Stat
            icon={<HiOutlineBriefcase />}
            title="Bookings"
            value={bookings.length}
            color="blue"
         />
         <Stat
            icon={<HiOutlineBanknotes />}
            title="Sales"
            value={formatCurrency(sales)}
            color="green"
         />
         <Stat
            icon={<HiOutlineCalendarDays />}
            title="Check ins"
            value={confirmedStays.length}
            color="indigo"
         />
         <Stat
            icon={<HiOutlineChartBar />}
            title="Occupancy rate"
            value="15%"
            color="yellow"
         />
      </>
   );
}

export default Stats;
