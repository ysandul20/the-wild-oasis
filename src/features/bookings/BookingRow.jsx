import styled from "styled-components";
import { format, isToday } from "date-fns";

import Tag from "../../ui/Tag";

import { formatCurrency } from "../../utils/helpers";
import { formatDistanceFromNow } from "../../utils/helpers";
import { useNavigate } from "react-router-dom";
import Row from "../../ui/Row";
import useBookingCheckout from "./useBookingCheckout";
import { useState } from "react";
import Modal from "../../ui/Modal";
import ConfirmDelete from "../../ui/ConfirmDelete";
import useBookingDelete from "./useBookingDelete";

const Cabin = styled.div`
   font-size: 1.6rem;
   font-weight: 600;
   color: var(--color-grey-600);
   font-family: "Sono";
`;

const Stacked = styled.div`
   display: flex;
   flex-direction: column;
   gap: 0.2rem;

   & span:first-child {
      font-weight: 500;
   }

   & span:last-child {
      color: var(--color-grey-500);
      font-size: 1.2rem;
   }
`;

const Amount = styled.div`
   font-family: "Sono";
   font-weight: 500;
`;
const StyledBookingRow = styled.div`
   display: grid;
   grid-template-columns: 0.6fr 1.8fr 2.2fr 1fr 1fr 1fr;
   column-gap: 2.4rem;
   align-items: center;
   padding: 1.4rem 2.4rem;

   &:not(:last-child) {
      border-bottom: 1px solid var(--color-grey-100);
   }
`;

function BookingRow({
   booking: {
      id: bookingId,
      created_at,
      startDate,
      endDate,
      numNights,
      numGuests,
      totalPrice,
      status,
      guests: { fullName: guestName, email },
      cabins: { name: cabinName },
   },
}) {
   const statusToTagName = {
      unconfirmed: "blue",
      "checked-in": "green",
      "checked-out": "silver",
   };
   const [showDeleteForm, setShowDeleteForm] = useState(false);

   const navigate = useNavigate();

   const { mutate, isLoading: isCheckingOut } = useBookingCheckout();
   const { mutate: mutateDelete, isLoading: isDeleting } = useBookingDelete();

   return (
      <>
         <StyledBookingRow>
            <Cabin>{cabinName}</Cabin>

            <Stacked>
               <span>{guestName}</span>
               <span>{email}</span>
            </Stacked>

            <Stacked>
               <span>
                  {isToday(new Date(startDate))
                     ? "Today"
                     : formatDistanceFromNow(startDate)}{" "}
                  &rarr; {numNights} night stay
               </span>
               <span>
                  {format(new Date(startDate), "MMM dd yyyy")} &mdash;{" "}
                  {format(new Date(endDate), "MMM dd yyyy")}
               </span>
            </Stacked>

            <Tag type={statusToTagName[status]}>{status.replace("-", " ")}</Tag>

            <Amount>{formatCurrency(totalPrice)}</Amount>
            <Row type="vertical">
               <button onClick={() => navigate(`/bookings/${bookingId}`)}>
                  See details
               </button>
               <button
                  disabled={isDeleting}
                  onClick={() => setShowDeleteForm(true)}
               >
                  Delete
               </button>
               {status === "unconfirmed" && (
                  <button onClick={() => navigate(`/checkin/${bookingId}`)}>
                     Check in
                  </button>
               )}
               {status === "checked-in" && (
                  <button
                     disabled={isCheckingOut}
                     onClick={() => mutate(bookingId)}
                  >
                     Check out
                  </button>
               )}
            </Row>
         </StyledBookingRow>

         {showDeleteForm && (
            <Modal onCloseModal={setShowDeleteForm}>
               <ConfirmDelete
                  resourceName={`booking #${bookingId}`}
                  onCancel={setShowDeleteForm}
                  onConfirm={() => {
                     console.log("deleting booking");
                     mutateDelete(bookingId);
                     setShowDeleteForm(false);
                  }}
               />
            </Modal>
         )}
      </>
   );
}

export default BookingRow;
