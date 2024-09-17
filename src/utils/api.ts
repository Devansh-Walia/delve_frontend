import { cookies } from "next/headers";
import { accessTokenCookieKey } from "./constants";
import { SignupSchema } from "./types";
import toast from "react-hot-toast";
import { z } from "zod";
import { envConfig } from "./envConfig";

const getHeaders = () => {
  const accessToken = cookies().get(accessTokenCookieKey);

  return {
    "Content-Type": "application/json",
    Authorization: `Bearer ${accessToken?.value}`,
  };
};

export const getMe = async () => {
  try {
    const response = await fetch(`${envConfig.apiUrl}/api/me`, {
      headers: getHeaders(),
    });

    if (!response.ok) {
      throw new Error("Failed to fetch me");
    }

    return response.json();
  } catch (error) {
    console.error(error);
    return null;
  }
};

export const signupUser = async (data: z.infer<typeof SignupSchema>) => {
  try {
    const response = await fetch(`${envConfig.apiUrl}/api/signup`, {
      method: "POST",
      headers: getHeaders(),
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      throw new Error("Failed to sign up");
    }

    return response.json();
  } catch (error) {
    if (error instanceof Error) {
      toast.error(error.message);
    } else {
      toast.error("Failed to sign up");
    }
    return null;
  }
};

export const loginUser = async (data: { email: string; password: string }) => {
  try {
    const response = await fetch(`${envConfig.apiUrl}/api/login`, {
      method: "POST",
      headers: getHeaders(),
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      throw new Error("Failed to login");
    }

    return response.json();
  } catch (error) {
    if (error instanceof Error) {
      toast.error(error.message);
    } else {
      toast.error("Failed to login");
    }
    return null;
  }
};
