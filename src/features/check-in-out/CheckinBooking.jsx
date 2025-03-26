import styled from "styled-components";
import BookingDataBox from "../../features/bookings/BookingDataBox";

import Row from "../../ui/Row";
import { formatCurrency } from "../../utils/helpers";
import Heading from "../../ui/Heading";
import ButtonGroup from "../../ui/ButtonGroup";
import Button from "../../ui/Button";
import ButtonText from "../../ui/ButtonText";

import { useMoveBack } from "../../hooks/useMoveBack";
import useBookingDetail from "../bookings/useBookingDetail";
import useBookingCheckin from "../bookings/useBookingCheckin";
import Spinner from "../../ui/Spinner";
import Checkbox from "../../ui/Checkbox";
import { useEffect, useState } from "react";
import useSettings from "../settings/useSettings";

const Box = styled.div`
   /* Box */
   background-color: var(--color-grey-0);
   border: 1px solid var(--color-grey-100);
   border-radius: var(--border-radius-md);
   padding: 2.4rem 4rem;
`;

function CheckinBooking() {
   const moveBack = useMoveBack();
   const [confirmPaid, setConfirmPaid] = useState(false);
   const [addBreakfast, setAddBreakfast] = useState(false);
   const { data: bookingDetail, isLoading } = useBookingDetail();
   const { mutate, isLoading: isCheckingIn } = useBookingCheckin();
   const { data: settings, isLoading: isLoadingSettings } = useSettings();

   console.log("isCheckingIn", isCheckingIn);
   const {
      id: bookingId,
      guests,
      totalPrice,
      numGuests,
      numNights,
   } = bookingDetail || {};

   useEffect(() => {
      if (bookingDetail) {
         setConfirmPaid(bookingDetail.isPaid);
         setAddBreakfast(bookingDetail.hasBreakfast);
      }
   }, [bookingDetail]);

   if (isLoading) return <Spinner />;
   if (isCheckingIn) return <Spinner />;
   if (isLoadingSettings) return <Spinner />;

   const optionalBreakfastPrice = settings
      ? settings.breakfastPrice * numGuests * numNights
      : 0;

   function handleCheckin() {
      if (addBreakfast && confirmPaid) {
         console.log(addBreakfast && confirmPaid);
         const breakfastOptions = {
            hasBreakfast: true,
            totalPrice: totalPrice + optionalBreakfastPrice,
            extrasPrice: optionalBreakfastPrice,
         };
         mutate({ bookingId: bookingId, breakfastObj: breakfastOptions });
      } else mutate({ bookingId, breakfastObj: {} });
   }

   return (
      <>
         {settings && bookingDetail && (
            <>
               <Row type="horizontal">
                  <Heading as="h1">Check in booking #{bookingId}</Heading>
                  <ButtonText onClick={moveBack}>&larr; Back</ButtonText>
               </Row>

               <BookingDataBox booking={bookingDetail} />

               {!bookingDetail.hasBreakfast && (
                  <Box>
                     <Checkbox
                        checked={addBreakfast}
                        disabled={
                           bookingDetail.isPaid && bookingDetail.hasBreakfast
                        }
                        onChange={() => setAddBreakfast((cur) => !cur)}
                     >
                        Want to add breakfast for $
                        {formatCurrency(optionalBreakfastPrice)}?
                     </Checkbox>
                  </Box>
               )}

               <Box>
                  <Checkbox
                     id={"confirmPaid"}
                     checked={confirmPaid}
                     disabled={
                        bookingDetail.isPaid && bookingDetail.hasBreakfast
                     }
                     onChange={() => setConfirmPaid((cur) => !cur)}
                  >
                     I confirm that {guests.fullName} has paid total amount of
                     {addBreakfast
                        ? ` ${
                             formatCurrency(
                                totalPrice + optionalBreakfastPrice
                             ) +
                             " " +
                             "(" +
                             formatCurrency(totalPrice) +
                             "+" +
                             formatCurrency(optionalBreakfastPrice) +
                             ")"
                          }`
                        : ` ${formatCurrency(totalPrice)}`}
                  </Checkbox>
               </Box>

               <ButtonGroup>
                  <Button
                     onClick={handleCheckin}
                     disabled={!confirmPaid || isCheckingIn ? true : false}
                  >
                     Check in booking #{bookingId}
                  </Button>
                  <Button $variation="secondary" onClick={moveBack}>
                     Back
                  </Button>
               </ButtonGroup>
            </>
         )}
      </>
   );
}

export default CheckinBooking;
