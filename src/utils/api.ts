import { cookies } from "next/headers";
import { accessTokenCookieKey } from "./constants";

const getHeaders = () => {
  const accessToken = cookies().get(accessTokenCookieKey);

  return {
    "Content-Type": "application/json",
    Authorization: `Bearer ${accessToken?.value}`,
  };
};

export const getMe = async () => {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/me`, {
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
