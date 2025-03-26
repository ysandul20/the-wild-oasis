import { HiChevronLeft, HiChevronRight } from "react-icons/hi";
import { useSearchParams } from "react-router-dom";
import styled from "styled-components";
import { RESULTS_PER_PAGE } from "../utils/constans";

const StyledPagination = styled.div`
   width: 100%;
   display: flex;
   align-items: center;
   justify-content: space-between;
`;

const P = styled.p`
   font-size: 1.4rem;
   margin-left: 0.8rem;

   & span {
      font-weight: 600;
   }
`;

const Buttons = styled.div`
   display: flex;
   gap: 0.6rem;
`;

const PaginationButton = styled.button`
   background-color: ${(props) =>
      props.active ? " var(--color-brand-600)" : "var(--color-grey-50)"};
   color: ${(props) => (props.active ? " var(--color-brand-50)" : "inherit")};
   border: none;
   border-radius: var(--border-radius-sm);
   font-weight: 500;
   font-size: 1.4rem;

   display: flex;
   align-items: center;
   justify-content: center;
   gap: 0.4rem;
   padding: 0.6rem 1.2rem;
   transition: all 0.3s;

   &:has(span:last-child) {
      padding-left: 0.4rem;
   }

   &:has(span:first-child) {
      padding-right: 0.4rem;
   }

   & svg {
      height: 1.8rem;
      width: 1.8rem;
   }

   &:hover:not(:disabled) {
      background-color: var(--color-brand-600);
      color: var(--color-brand-50);
   }
`;

function Pagination({ results }) {
   const [searchParams, setSearchParams] = useSearchParams();
   const currentPage = Number(searchParams.get("page")) || 1;
   console.log(currentPage);
   const pagesCount = Math.ceil(results / RESULTS_PER_PAGE);

   function goToNextPage(currentPage) {
      if (currentPage === pagesCount) return;
      const newSearchParams = new URLSearchParams(searchParams);
      newSearchParams.set("page", currentPage + 1);
      setSearchParams(newSearchParams);
   }
   function goToPreviousPage(currentPage) {
      if (currentPage === 1) return;
      const newSearchParams = new URLSearchParams(searchParams);
      newSearchParams.set("page", currentPage - 1);
      setSearchParams(newSearchParams);
   }
   const isSmallerThanLastPage = currentPage * RESULTS_PER_PAGE <= results;
   console.log(isSmallerThanLastPage);
   if (pagesCount <= 1) return null;

   return (
      <StyledPagination>
         <P>
            Showing <span>{(currentPage - 1) * RESULTS_PER_PAGE + 1}</span> to{" "}
            <span>
               {isSmallerThanLastPage
                  ? currentPage * RESULTS_PER_PAGE
                  : results}
            </span>{" "}
            of <span>{results}</span> results
         </P>
         <Buttons>
            <PaginationButton
               onClick={() => goToPreviousPage(currentPage)}
               disabled={currentPage === 1}
            >
               <HiChevronLeft />
               <span>Previous</span>
            </PaginationButton>
            <PaginationButton
               onClick={() => goToNextPage(currentPage)}
               disabled={currentPage === pagesCount}
            >
               <span>Next</span>
               <HiChevronRight />
            </PaginationButton>
         </Buttons>
      </StyledPagination>
   );
}

export default Pagination;
