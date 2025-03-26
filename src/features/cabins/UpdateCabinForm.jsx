import Input from "../../ui/Input";
import Form from "../../ui/Form";
import Button from "../../ui/Button";
import FileInput from "../../ui/FileInput";
import Textarea from "../../ui/Textarea";
import { useForm } from "react-hook-form";
import { FormRow, Label, Error } from "./CreateCabinForm";
import useUpdateCabin from "./useUpdateCabin";

function UpdateCabinForm({ cabinData, setShowEditForm }) {
   const {
      register,
      handleSubmit,
      getValues,
      formState: { errors },
   } = useForm({ defaultValues: { ...cabinData } });

   const { mutate, isCreating } = useUpdateCabin();

   const onSubmitForm = (data) => {
      console.log(data);
      mutate(data, { onSuccess: () => setShowEditForm(false) });
   };

   const onFormError = (errors) => {
      console.log(errors);
   };
   return (
      <Form onSubmit={handleSubmit(onSubmitForm, onFormError)}>
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
            <Button>Save changes</Button>
         </FormRow>
      </Form>
   );
}

export default UpdateCabinForm;
