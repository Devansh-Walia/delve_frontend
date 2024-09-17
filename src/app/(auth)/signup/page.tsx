"use client";

import { useForm } from "@mantine/form";
import Link from "next/link";
import { redirect } from "next/navigation";
import { useEffect } from "react";
import { useFormState } from "react-dom";
import toast from "react-hot-toast";
import { z } from "zod";

import Submit from "@/components/shared/buttons/submit";
import CustomInput from "@/components/shared/inputs/CustomInput";
import { FormState } from "@/utils/constants";
import { AppRoutes, Status } from "@/utils/enums";
import { convertFormDataFromObject } from "@/utils/helpers";
import {
  emailSchema,
  nameSchema,
  passwordSchema,
  usernameSchema,
} from "@/utils/schemas";
import signupUser from "./action";

const SignupSchema = z.object({
  email: emailSchema,
  password: passwordSchema,
  username: usernameSchema,
  name: nameSchema,
});

function SignUpForm() {
  const initialState: FormState = {
    state: Status.IDLE,
  };
  const initialValues = {
    email: "",
    password: "",
    username: "",
    name: "",
  };

  const [state, formAction] = useFormState(signupUser, initialState);

  const form = useForm({
    initialValues,
    validate: (values) => {
      const result = SignupSchema.safeParse(values);
      if (!result.success) {
        return result.error.format();
      }
      return {};
    },
  });

  useEffect(() => {
    if (state.state === Status.ERROR && state.message) {
      toast.error(state.message);
    } else if (state.state === Status.SUCCESS && state.message) {
      toast.success(state.message);
      redirect(AppRoutes.LOGIN);
    }
  }, [state]);

  return (
    <div className="flex bg-primary flex-col items-center justify-center min-h-screen">
      <form
        action={() => {
          form.onSubmit((values) =>
            formAction(convertFormDataFromObject(values))
          )();
        }}
        className="bg-white p-8 rounded-lg shadow-md w-full max-w-md"
      >
        <h2 className="text-2xl text-primary font-bold mb-6 text-center">
          Sign Up
        </h2>
        <CustomInput
          label="Email"
          type="email"
          error={form.errors.email}
          placeholder="Enter email"
          {...form.getInputProps("email")}
          required
        />
        <CustomInput
          label="Password"
          type="password"
          error={form.errors.password}
          placeholder="Enter password"
          {...form.getInputProps("password")}
          required
        />
        <CustomInput
          label="Username"
          type="text"
          error={form.errors.username}
          placeholder="Enter username"
          {...form.getInputProps("username")}
          required
        />
        <CustomInput
          label="Name"
          type="text"
          error={form.errors.name}
          placeholder="Enter name"
          {...form.getInputProps("name")}
          required
        />
        <div className="flex justify-center">
          <Submit title="Sign up" />
        </div>
        <hr className="my-6" />
        <div className="flex justify-center">
          <p className="text-primary">Already have an account?</p>
          <Link href={AppRoutes.LOGIN} className="text-primary">
            Login
          </Link>
        </div>
      </form>
    </div>
  );
}

export default SignUpForm;
