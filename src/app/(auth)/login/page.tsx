"use client";

import { useForm } from "@mantine/form";
import Link from "next/link";
import { useEffect } from "react";
import { useFormState } from "react-dom";
import toast from "react-hot-toast";

import CustomInput from "@/components/shared/inputs/CustomInput";
import { FormState } from "@/utils/constants";
import { convertFormDataFromObject } from "@/utils/helpers";
import { AppRoutes, Status } from "@/utils/enums";
import { z } from "zod";
import { emailSchema, passwordSchema } from "@/utils/schemas";
import Submit from "@/components/shared/buttons/submit";
import loginUser from "./action";

const LoginSchema = z.object({
  email: emailSchema,
  password: passwordSchema,
});

function LoginForm() {
  const initialState: FormState = {
    state: Status.IDLE,
  };
  const initialValues = {
    email: "",
    password: "",
  };

  const [state, formAction] = useFormState(loginUser, initialState);

  const form = useForm({
    initialValues,
    validate: (values) => {
      const result = LoginSchema.safeParse(values);

      if (!result.success) {
        return result.error.format();
      }
      return {};
    },
  });

  useEffect(() => {
    if (state.state === Status.ERROR && state.message) {
      toast.error(state.message);
    }
  }, [state]);

  return (
    <div className="flex bg-primary flex-col items-center justify-center min-h-screen">
      <form
        action={() =>
          form.onSubmit((values) => {
            formAction(convertFormDataFromObject(values));
          })()
        }
        className="bg-white p-8 rounded-lg shadow-md w-full max-w-md"
      >
        <h2 className="text-2xl text-primary font-bold mb-6 text-center">
          Login
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
        <div className="text-right mb-2">
          <Link
            href={"#"}
            className="link link-accent link-hover text-sm pointer-events-none"
          >
            Forgot password?
          </Link>
        </div>

        <Submit title="Login" />

        <hr className="my-6" />
        <div className="flex justify-center">
          <p className="text-primary">Don&apos;t have an account? &nbsp;</p>
          <Link
            href={AppRoutes.SIGN_UP}
            className="text-primary underline hover:text-secondary"
          >
            Sign Up
          </Link>
        </div>
      </form>
    </div>
  );
}

export default LoginForm;
