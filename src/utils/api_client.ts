import { getCookie } from "cookies-next";

import { accessTokenCookieKey } from "@/utils/constants";
import { TablesResponse, UserResponse } from "@/utils/types";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

const getHeaders = () => {
  const token = getCookie(accessTokenCookieKey);
  return {
    "Content-Type": "application/json",
    Authorization: `Bearer ${token}`,
  };
};

export const fetchUsers = async (limit: number, offset: number) => {
  const response = await fetch(
    `${API_URL}/api/users?limit=${limit}&offset=${offset}`,
    {
      method: "GET",
      headers: getHeaders(),
    }
  );

  if (!response.ok) {
    throw new Error("Failed to fetch users");
  }

  const result = await response.json();

  return result as UserResponse;
};

export const fetchTables = async () => {
  const response = await fetch(`${API_URL}/api/db/tables`, {
    method: "GET",
    headers: getHeaders(),
  });

  if (!response.ok) {
    throw new Error("Failed to fetch tables");
  }

  const result = await response.json();

  return result as TablesResponse;
};
