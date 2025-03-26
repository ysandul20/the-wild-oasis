import styled from "styled-components";
import BookingRow from "./BookingRow";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { getAllBookings } from "../../services/apiBookings";
import Spinner from "../../ui/Spinner";
import Empty from "../../ui/Empty";
import { useSearchParams } from "react-router-dom";
import Pagination from "../../ui/Pagination";
import { RESULTS_PER_PAGE } from "../../utils/constans";

const Table = styled.div`
   border: 1px solid var(--color-grey-200);

   font-size: 1.4rem;
   background-color: var(--color-grey-0);
   border-radius: 7px;
   overflow: hidden;
   max-width: 100%;
`;

const TableHeader = styled.header`
   display: grid;
   grid-template-columns: 0.6fr 1.8fr 2.2fr 1fr 1fr 1fr;
   column-gap: 2.4rem;
   align-items: center;

   background-color: var(--color-grey-50);
   border-bottom: 1px solid var(--color-grey-100);
   text-transform: uppercase;
   letter-spacing: 0.4px;
   font-weight: 600;
   color: var(--color-grey-600);
   padding: 1.6rem 2.4rem;
`;
const Footer = styled.footer`
   background-color: var(--color-grey-50);
   display: flex;
   justify-content: center;
   padding: 1.2rem;

   /* This will hide the footer when it contains no child elements. Possible thanks to the parent selector :has 🎉 */
   &:not(:has(*)) {
      display: none;
   }
`;

function BookingTable() {
   const queryClient = useQueryClient();
   const [searchParams] = useSearchParams();
   const filterValue = searchParams.get("status");
   const filterOptions =
      !filterValue || filterValue === "all"
         ? null
         : { field: "status", value: filterValue };
   // console.log("searchParams", filterOptions);
   const sortValue = searchParams.get("sortBy") || "startDate-desc";
   const [field, direction] = sortValue.split("-");
   const sortOptions = { field, direction };

   // console.log(sortOptions);
   const pageValue = Number(searchParams.get("page")) || 1;
   // console.log("pageValue", pageValue);

   const {
      data: { bookings, count } = {},
      isLoading,
      error,
   } = useQuery({
      queryKey: ["bookings", filterOptions, sortOptions, pageValue],
      queryFn: () => getAllBookings(filterOptions, sortOptions, pageValue),
   });

   //TODO: prefetch next page
   if (pageValue + 1 <= Math.ceil(count / RESULTS_PER_PAGE)) {
      queryClient.prefetchQuery({
         queryKey: ["bookings", filterOptions, sortOptions, pageValue + 1],
         queryFn: () =>
            getAllBookings(filterOptions, sortOptions, pageValue + 1),
      });
   }
   //TODO: prefetch previous page
   if (pageValue - 1 >= 1) {
      queryClient.prefetchQuery({
         queryKey: ["bookings", filterOptions, sortOptions, pageValue - 1],
         queryFn: () =>
            getAllBookings(filterOptions, sortOptions, pageValue - 1),
      });
   }

   // console.log("bookings", bookings);

   if (bookings) {
      //TODO: Early return message if cabins is empty
      if (!bookings.length) return <Empty resourceName="bookings" />;
   }

   return (
      <>
         {isLoading && <Spinner />}
         {!isLoading && !error && bookings && count && (
            <Table role="table">
               <TableHeader role="row">
                  <div>Cabin</div>
                  <div>Guest</div>
                  <div>Dates</div>
                  <div>Status</div>
                  <div>Amount</div>
                  <div></div>
               </TableHeader>

               {bookings.map((booking) => (
                  <BookingRow key={booking.id} booking={booking} />
               ))}
               <Footer>
                  <Pagination results={count} />
               </Footer>
            </Table>
         )}
      </>
   );
}

export default BookingTable;

{
   /* <Menus>
            <Table columns="0.6fr 2fr 2.4fr 1.4fr 1fr 3.2rem">
               <Table.Header>
                  <div>Cabin</div>
                  <div>Guest</div>
                  <div>Dates</div>
                  <div>Status</div>
                  <div>Amount</div>
                  <div></div>
               </Table.Header>

               <Table.Body
                  data={bookings}
                  render={(booking) => (
                     <BookingRow key={booking.id} booking={booking} />
                  )}
               />
            </Table>
         </Menus> */
}
