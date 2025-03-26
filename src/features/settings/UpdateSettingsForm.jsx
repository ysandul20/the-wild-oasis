import { useForm } from "react-hook-form";
import Form from "../../ui/Form";
import Input from "../../ui/Input";
import { FormRow, Label, Error } from "../cabins/CreateCabinForm";
import { useQuery } from "@tanstack/react-query";
import { getSettings } from "../../services/apiSettings";
import Spinner from "../../ui/Spinner";
import useUpdateSetting from "./useUpdateSetting";

function UpdateSettingsForm() {
   const { data, isLoading, error } = useQuery({
      queryKey: ["settings"],
      queryFn: getSettings,
   });

   const {
      register,
      formState: { errors },
      trigger, // 👈 Дозволяє вручну запускати валідацію
   } = useForm({ mode: "onBlur" });

   const { mutate, isUpdating } = useUpdateSetting();

   function onSubmitField(e, keyName, currentValue) {
      trigger(keyName);
      console.log(+e.target.value, currentValue);
      if (!e.target.value || +e.target.value === currentValue) return;
      console.log("All is OK", { [keyName]: e.target.value });
      mutate({ [keyName]: e.target.value }); // дозволяє створювати динамічні ключі для обєкта
   }

   return (
      <>
         {isLoading && <Spinner />}
         {!isLoading && !error && data && (
            <Form>
               <FormRow>
                  <Label htmlFor="min-nights">Minimum nights/booking</Label>
                  <Input
                     type="number"
                     id="min-nights"
                     disabled={isUpdating}
                     defaultValue={data.minBookingLength}
                     {...register("minBookingLength", {
                        required: "Enter min booking nights ",
                     })}
                     onBlur={(e) =>
                        onSubmitField(
                           e,
                           "minBookingLength",
                           data.minBookingLength
                        )
                     }
                  />
                  {errors.minBookingLength && (
                     <Error>{errors.minBookingLength.message}</Error>
                  )}
               </FormRow>
               <FormRow>
                  <Label htmlFor="max-nights">Maximum nights/booking</Label>
                  <Input
                     type="number"
                     id="max-nights"
                     disabled={isUpdating}
                     defaultValue={data.maxBookingLength}
                     {...register("maxBookingLength", {
                        required: "Enter max booking nights ",
                     })}
                     onBlur={(e) =>
                        onSubmitField(
                           e,
                           "maxBookingLength",
                           data.maxBookingLength
                        )
                     }
                  />
               </FormRow>
               <FormRow>
                  <Label htmlFor="max-guests">Maximum guests/booking</Label>
                  <Input
                     type="number"
                     id="max-guests"
                     disabled={isUpdating}
                     defaultValue={data.maxNumGuestsPerBooking}
                     {...register("maxNumGuestsPerBooking", {
                        required: "Enter max quests number",
                     })}
                     onBlur={(e) =>
                        onSubmitField(
                           e,
                           "maxNumGuestsPerBooking",
                           data.maxNumGuestsPerBooking
                        )
                     }
                  />
               </FormRow>
               <FormRow>
                  <Label htmlFor="breakfast-price">Breakfast price</Label>
                  <Input
                     type="number"
                     id="breakfast-price"
                     disabled={isUpdating}
                     defaultValue={data.breakfastPrice}
                     {...register("breakfastPrice", {
                        required: "Enter breakfast price ",
                     })}
                     onBlur={(e) =>
                        onSubmitField(e, "breakfastPrice", data.breakfastPrice)
                     }
                  />
               </FormRow>
            </Form>
         )}
      </>
   );
}

export default UpdateSettingsForm;
