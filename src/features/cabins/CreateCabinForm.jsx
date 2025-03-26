import styled from "styled-components";

import Input from "../../ui/Input";
import Form from "../../ui/Form";
import Button from "../../ui/Button";
import FileInput from "../../ui/FileInput";
import Textarea from "../../ui/Textarea";
import { useForm } from "react-hook-form";
import useCreateCabin from "./useCreateCabin";

export const FormRow = styled.div`
   display: grid;
   align-items: center;
   grid-template-columns: 24rem 1fr 1.2fr;
   gap: 2.4rem;

   padding: 0.4rem 0;

   &:first-child {
      padding-top: 0;
   }

   &:last-child {
      padding-bottom: 0;
   }

   &:not(:last-child) {
      border-bottom: 1px solid var(--color-grey-100);
   }

   &:has(button) {
      display: flex;
      justify-content: flex-end;
      gap: 1.2rem;
   }
`;

export const Label = styled.label`
   font-weight: 500;
`;

export const Error = styled.span`
   font-size: 1.4rem;
   color: var(--color-red-700);
`;

function CreateCabinForm({ onCloseModal }) {
   const {
      register,
      handleSubmit,
      reset,
      getValues,
      formState: { errors },
   } = useForm();

   const { mutate, isCreating } = useCreateCabin();

   const onSubmitForm = (data) => {
      console.log("Submit create data", data);
      mutate(data, {
         onSuccess: () => {
            reset();
            onCloseModal?.(false); // Prevent the bug if we reuse <CreateCabinForm/> without 'onCloseModal' prop
         },
      });
      // reset();
      /*Викликати просто reset() відразу після mutate(data) не завжди правильно, тому що mutate(data) виконується асинхронно. Це означає, що виклик reset() може статися до того, як запит буде завершено або коли дані не будуть успішно оброблені. Отже, це може призвести до того, що форма буде очищена до того, як отримано результат від мутації.*/
   };

   const onFormError = (errors) => {
      console.log(errors);
   };
   return (
      <Form
         onSubmit={handleSubmit(onSubmitForm, onFormError)}
         type={onCloseModal ? "modal" : "regular"}
      >
         <FormRow>
            <Label htmlFor="name">Cabin name</Label>
            <Input
               {...register("name", {
                  required: "Enter your name",
                  minLength: { value: 3, message: "Minimum length is 3" },
               })}
               type="text"
               id="name"
               disabled={isCreating}
            />
            {errors.name && <Error>{errors.name.message}</Error>}
         </FormRow>
         <FormRow>
            <Label htmlFor="maxCapacity">Maximum capacity</Label>
            <Input
               //TODO: 'bug' with scroll when input field type number
               {...register("maxCapacity", {
                  required: "Enter max capacity",
                  min: {
                     value: 1,
                     message: "Minimum capacity is 1",
                  },
               })}
               type="number"
               id="maxCapacity"
               disabled={isCreating}
            />
            {errors.maxCapacity && <Error>{errors.maxCapacity.message}</Error>}
         </FormRow>

         <FormRow>
            <Label htmlFor="regularPrice">Regular price</Label>
            <Input
               {...register("regularPrice", {
                  required: "Enter price",
                  min: { value: 100, message: "Minimum price is 100" },
               })}
               type="number"
               id="regularPrice"
               disabled={isCreating}
            />
            {errors.regularPrice && (
               <Error>{errors.regularPrice.message}</Error>
            )}
         </FormRow>

         <FormRow>
            <Label htmlFor="discount">Discount</Label>
            <Input
               {...register("discount", {
                  required: "Enter discount",
                  validate: (curValue) =>
                     +curValue > +getValues("regularPrice")
                        ? "Discount can not be greater than price"
                        : true,
               })}
               type="number"
               id="discount"
               defaultValue={0}
               disabled={isCreating}
            />
            {errors.discount && <Error>{errors.discount.message}</Error>}
         </FormRow>

         <FormRow>
            <Label htmlFor="description">Description for website</Label>
            <Textarea
               {...register("description", {
                  required: "This field are required",
               })}
               type="number"
               id="description"
               defaultValue=""
               disabled={isCreating}
            />
            {errors.description && <Error>{errors.description.message}</Error>}
         </FormRow>

         <FormRow>
            <Label htmlFor="image">Cabin photo</Label>
            <FileInput id="image" accept="image/*" {...register("image")} />
         </FormRow>

         <FormRow>
            {/* type is an HTML attribute! */}
            <Button $variation="secondary" type="reset">
               Clear fields
            </Button>
            <Button>Add cabin</Button>
         </FormRow>
      </Form>
   );
}

export default CreateCabinForm;
