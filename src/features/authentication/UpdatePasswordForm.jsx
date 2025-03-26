import { useForm } from "react-hook-form";
import Button from "../../ui/Button";
import Form from "../../ui/Form";
import Input from "../../ui/Input";
import { FormRow, Label, Error } from "../cabins/CreateCabinForm";
import useUpdateUser from "./useUpdateUser";

function UpdatePasswordForm() {
   const { register, handleSubmit, formState, getValues, reset } = useForm();
   const { errors } = formState;

   const { mutate, isLoading: isUpdating } = useUpdateUser();

   function onSubmit({ password }) {
      mutate({ password }, { onSuccess: reset });
   }

   return (
      <Form onSubmit={handleSubmit(onSubmit)}>
         <FormRow>
            <Label htmlFor="password">New password (min 8 characters)</Label>
            <Input
               {...register("password", {
                  required: "Enter password",
                  minLength: { value: 8, message: "Minimum length is 8" },
               })}
               type="password"
               id="password"
               disabled={isUpdating}
            />
            {errors.password && <Error>{errors.password.message}</Error>}
         </FormRow>

         <FormRow>
            <Label htmlFor="passwordConfirm">Repeat new password</Label>
            <Input
               {...register("passwordConfirm", {
                  required: "Repeat your password",
                  minLength: { value: 8, message: "Minimum length is 8" },
                  validate: (value) =>
                     value === getValues("password")
                        ? true
                        : "Password does not match",
               })}
               type="password"
               id="passwordConfirm"
               disabled={isUpdating}
            />
            {errors.passwordConfirm && (
               <Error>{errors.passwordConfirm.message}</Error>
            )}
         </FormRow>

         <FormRow>
            <Button
               onClick={(e) => {
                  e.preventDefault();
                  reset();
               }}
               $variation="secondary"
            >
               Cancel
            </Button>
            <Button disabled={isUpdating}>Update password</Button>
         </FormRow>
      </Form>
   );
}

export default UpdatePasswordForm;
