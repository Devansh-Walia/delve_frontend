"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";

import { envConfig } from "@/utils/envConfig";
import { accessTokenCookieKey, FormState } from "@/utils/constants";
import { AppRoutes, Status } from "@/utils/enums";
import { getErrorMessage } from "@/utils/helpers";

export default async function loginUser(
  prevState: FormState,
  formData: FormData
): Promise<FormState> {
  const email = formData.get("email")?.toString();
  const password = formData.get("password")?.toString();

  if (!email || !password) {
    return {
      state: Status.ERROR,
      message: "Email and password are required.",
    };
  }

  try {
    const response = await fetch(`${envConfig.apiUrl}/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
        password,
      }),
    });

    if (!response.ok) {
      throw new Error("Failed to login");
    }

    const data = await response.json();

    cookies().set({
      name: accessTokenCookieKey,
      value: data.session.access_token,
      expires: new Date(data.session.expires_at * 1000),
      path: "/",
    });
  } catch (error) {
    return {
      state: Status.ERROR,
      ...getErrorMessage(error),
    };
  }

  redirect(AppRoutes.DASHBOARD);

  return prevState;
}
