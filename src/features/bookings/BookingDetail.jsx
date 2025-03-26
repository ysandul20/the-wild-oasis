import styled from "styled-components";

import BookingDataBox from "./BookingDataBox";
import useBookingDetail from "./useBookingDetail";
import Row from "../../ui/Row";
import Heading from "../../ui/Heading";
import Tag from "../../ui/Tag";
import ButtonGroup from "../../ui/ButtonGroup";
import Button from "../../ui/Button";
import ButtonText from "../../ui/ButtonText";

import { useMoveBack } from "../../hooks/useMoveBack";
import Spinner from "../../ui/Spinner";
import { useNavigate } from "react-router-dom";
import useBookingCheckout from "./useBookingCheckout";
import Modal from "../../ui/Modal";
import ConfirmDelete from "../../ui/ConfirmDelete";
import useBookingDelete from "./useBookingDelete";
import { useState } from "react";

const HeadingGroup = styled.div`
   display: flex;
   gap: 2.4rem;
   align-items: center;
`;

function BookingDetail() {
   //  const booking = {};
   const { data: bookingDetail, isLoading } = useBookingDetail();
   console.log(bookingDetail);
   //  const status = "checked-in";

   const [showDeleteForm, setShowDeleteForm] = useState(false);
   const moveBack = useMoveBack();
   const navigate = useNavigate();

   const { mutate, isLoading: isCheckingOut } = useBookingCheckout();
   const { mutate: mutateDelete, isLoading: isDeleting } = useBookingDelete();

   if (bookingDetail) console.log(bookingDetail.status);
   const statusToTagName = {
      unconfirmed: "blue",
      "checked-in": "green",
      "checked-out": "silver",
   };
   if (isCheckingOut) return <Spinner />;
   if (isDeleting) return <Spinner />;
   return (
      <>
         {isLoading && <Spinner />}
         {!isLoading && bookingDetail && (
            <>
               <Row type="horizontal">
                  <HeadingGroup>
                     <Heading as="h1">Booking #{bookingDetail.id}</Heading>
                     <Tag type={statusToTagName[bookingDetail.status]}>
                        {bookingDetail.status.replace("-", " ")}
                     </Tag>
                  </HeadingGroup>
                  <ButtonText onClick={moveBack}>&larr; Back</ButtonText>
               </Row>

               <BookingDataBox booking={bookingDetail} />

               <ButtonGroup>
                  {bookingDetail.status === "unconfirmed" && (
                     <Button
                        onClick={() => navigate(`/checkin/${bookingDetail.id}`)}
                     >
                        Check in
                     </Button>
                  )}
                  {bookingDetail.status === "checked-in" && (
                     <Button
                        disabled={isCheckingOut}
                        onClick={() => mutate(bookingDetail.id)}
                     >
                        Check out
                     </Button>
                  )}
                  <Button
                     $variation="danger"
                     disabled={isDeleting}
                     onClick={() => setShowDeleteForm(true)}
                  >
                     Delete booking
                  </Button>
                  <Button $variation="secondary" onClick={moveBack}>
                     Back
                  </Button>
               </ButtonGroup>

               {showDeleteForm && (
                  <Modal onCloseModal={setShowDeleteForm}>
                     <ConfirmDelete
                        resourceName={`booking #${bookingDetail.id}`}
                        onCancel={setShowDeleteForm}
                        onConfirm={() => {
                           // mutateDelete(bookingDetail.id, {
                           //    onSettled: () => navigate("/bookings"),
                           // });
                           mutateDelete(bookingDetail.id);
                           setShowDeleteForm(false);
                        }}
                     />
                  </Modal>
               )}
            </>
         )}
      </>
   );
}

export default BookingDetail;
