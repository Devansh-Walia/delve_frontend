"use server";

import { FormState } from "@/utils/constants";
import { Status } from "@/utils/enums";
import { envConfig } from "@/utils/envConfig";
import { getErrorMessage } from "@/utils/helpers";

export default async function signupUser(
  prevState: FormState,
  formData: FormData
): Promise<FormState> {
  const email = formData.get("email")?.toString();
  const password = formData.get("password")?.toString();
  const username = formData.get("username")?.toString();
  const name = formData.get("name")?.toString();

  if (!email || !password || !username || !name) {
    return {
      state: Status.ERROR,
      message: "All fields are required.",
    };
  }

  try {
    const response = await fetch(`${envConfig.apiUrl}/auth/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
        password,
        username,
        name,
      }),
    });

    if (!response.ok) {
      throw new Error("Failed to sign up");
    }

    return {
      state: Status.SUCCESS,
      message:
        "User created successfully, please open your email to verify and then login",
    };
  } catch (error) {
    return {
      state: Status.ERROR,
      ...getErrorMessage(error),
    };
  }

  return prevState;
}
