import { useQuery } from "@tanstack/react-query";
import styled from "styled-components";
import { getCabins } from "../../services/apiCabins";
import Spinner from "../../ui/Spinner";
import CabinRow from "./CabinRow";
import { useSearchParams } from "react-router-dom";
import Empty from "../../ui/Empty";

const Table = styled.div`
   border: 1px solid var(--color-grey-200);

   font-size: 1.4rem;
   background-color: var(--color-grey-0);
   border-radius: 7px;
   overflow: hidden;
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

function CabinTable() {
   const {
      data: cabins,
      isLoading,
      error,
   } = useQuery({
      queryKey: ["cabins"],
      queryFn: getCabins,
   });
   const [searchParams] = useSearchParams();
   const filterValue = searchParams.get("discount") || "all";
   const sortValue = searchParams.get("sortBy") || "name-asc";
   // console.log(filterValue,sortValue);
   if (cabins) {
      console.log(cabins);
   }

   let filteredCabins;
   if (cabins) {
      // console.log(cabins);
      //TODO: Early return message if cabins is empty
      if (!cabins.length) return <Empty resourceName="cabins" />;
      //TODO: Else start sort and filter
      if (filterValue === "all") filteredCabins = cabins;
      if (filterValue === "with-discount")
         filteredCabins = cabins.filter((cabin) => cabin.discount > 0);
      if (filterValue === "no-discount")
         filteredCabins = cabins.filter((cabin) => cabin.discount === 0);
      if (sortValue === "name-asc")
         filteredCabins.sort((a, b) => a.name.localeCompare(b.name));
      if (sortValue === "name-desc")
         filteredCabins.sort((a, b) => b.name.localeCompare(a.name));
      if (sortValue === "regularPrice-asc")
         filteredCabins.sort((a, b) => a.regularPrice - b.regularPrice);
      if (sortValue === "regularPrice-desc")
         filteredCabins.sort((a, b) => b.regularPrice - a.regularPrice);
      if (sortValue === "maxCapacity-asc")
         filteredCabins.sort((a, b) => a.maxCapacity - b.maxCapacity);
      if (sortValue === "maxCapacity-desc")
         filteredCabins.sort((a, b) => b.maxCapacity - a.maxCapacity);
      // console.log("sorted", filteredCabins);
   }
   return (
      <>
         {isLoading && <Spinner />}
         {!isLoading && !error && (
            <Table role="table">
               <TableHeader role="row">
                  <div>Image</div>
                  <div>Cabin</div>
                  <div>Capacity</div>
                  <div>Price</div>
                  <div>Discount</div>
                  <div></div>
               </TableHeader>
               {filteredCabins.map((cabin) => (
                  <CabinRow key={cabin.id} cabin={cabin} />
               ))}
            </Table>
         )}
      </>
   );
}

export default CabinTable;
