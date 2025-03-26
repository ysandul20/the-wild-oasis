import { useForm } from "react-hook-form";
import Button from "../../ui/Button";
import Form from "../../ui/Form";
// import FormRow from "../../ui/FormRow";
import Input from "../../ui/Input";
import { FormRow, Label, Error } from "../cabins/CreateCabinForm";
import useSignUp from "./useSignUp";

// Email regex: /\S+@\S+\.\S+/

function SignupForm() {
   const {
      register,
      handleSubmit,
      getValues,
      reset,
      formState: { errors },
   } = useForm();

   const { mutate, isLoading } = useSignUp();

   const onSubmit = (data) => {
      console.log(data);
      const { name, email, password } = data;
      mutate({ fullName: name, email, password }, { onSettled: () => reset() });
   };
   return (
      <Form onSubmit={handleSubmit(onSubmit)}>
         <FormRow>
            <Label htmlFor="name">Full name</Label>
            <Input
               {...register("name", {
                  required: "Enter your name",
                  minLength: { value: 3, message: "Minimum length is 3" },
               })}
               type="text"
               id="fullName"
               disabled={isLoading}
            />
            {errors.name && <Error>{errors.name.message}</Error>}
         </FormRow>

         <FormRow>
            <Label htmlFor="email">Email address</Label>
            <Input
               {...register("email", {
                  required: "Enter your email",
                  pattern: {
                     value: /\S+@\S+\.\S+/,
                     message: "Please provide valid email",
                  },
               })}
               type="email"
               id="email"
               disabled={isLoading}
            />
            {errors.email && <Error>{errors.email.message}</Error>}
         </FormRow>

         <FormRow>
            <Label htmlFor="password">Password (min 8 characters)</Label>
            <Input
               {...register("password", {
                  required: "Enter password",
                  minLength: { value: 8, message: "Minimum length is 8" },
               })}
               type="password"
               id="password"
               disabled={isLoading}
            />
            {errors.password && <Error>{errors.password.message}</Error>}
         </FormRow>

         <FormRow>
            <Label htmlFor="passwordConfirm">Repeat password</Label>
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
               disabled={isLoading}
            />
            {errors.passwordConfirm && (
               <Error>{errors.passwordConfirm.message}</Error>
            )}
         </FormRow>

         <FormRow>
            {/* type is an HTML attribute! */}

            <Button $variation="secondary" type="reset" disabled={isLoading}>
               Cancel
            </Button>
            <Button disabled={isLoading}>Create new user</Button>
         </FormRow>
      </Form>
   );
}

export default SignupForm;
