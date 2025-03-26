import Button from "../../ui/Button";
import FileInput from "../../ui/FileInput";
import Form from "../../ui/Form";
import { FormRow, Label, Error } from "../cabins/CreateCabinForm";
import useAuthUser from "./useAuthUser";
import Input from "../../ui/Input";
import { useForm } from "react-hook-form";
import useUpdateUser from "./useUpdateUser";
import { useEffect } from "react";

function UpdateUserDataForm() {
   // We don't need the loading state, and can immediately use the user data, because we know that it has already been loaded at this point
   const {
      data: {
         email,
         user_metadata: { fullName: currentFullName },
      },
   } = useAuthUser();

   const { mutate, isLoading } = useUpdateUser();
   console.log(email, currentFullName);

   const {
      register,
      handleSubmit,
      reset,
      formState: { errors },
   } = useForm({
      defaultValues: {
         email: email,
         name: currentFullName,
      },
   });

   useEffect(() => {
      // Оновлюємо форму, коли приходять нові дані
      reset({
         email: email,
         name: currentFullName,
      });
   }, [email, currentFullName, reset]);

   function onSubmit(data, e) {
      e.preventDefault();
      console.log("user form data", data.name);
      mutate({
         password: data.password,
         fullName: data.name,
         avatar: data.avatar[0],
      });
   }

   return (
      <Form onSubmit={handleSubmit(onSubmit)}>
         <FormRow>
            <Label htmlFor="email">Email address</Label>
            <Input {...register("email")} type="email" id="email" disabled />
         </FormRow>
         <FormRow>
            <Label htmlFor="name">Full name</Label>
            <Input
               {...register("name", {
                  required: "Enter your name",
                  minLength: { value: 3, message: "Minimum length is 3" },
               })}
               type="text"
               id="name"
               disabled={isLoading}
            />
            {errors.name && <Error>{errors.name.message}</Error>}
         </FormRow>

         <FormRow>
            <Label htmlFor="avatar">Avatar image</Label>
            <FileInput
               disabled={isLoading}
               id="avatar"
               accept="image/*"
               {...register("avatar")}
            />
         </FormRow>
         <FormRow>
            <Button
               $variation="secondary"
               onClick={(e) => {
                  e.preventDefault();
                  reset();
               }}
            >
               Cancel
            </Button>
            <Button disabled={isLoading}>Update account</Button>
         </FormRow>
      </Form>
   );
}

export default UpdateUserDataForm;
