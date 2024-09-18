import { getCookie } from "cookies-next";

import { accessTokenCookieKey } from "@/utils/constants";
import { TablesResponse, UserResponse } from "@/utils/types";
import toast from "react-hot-toast";

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

export const toggleTableRls = async (tableName: string, enable: boolean) => {
  console.log(tableName, enable);
  try {
    const response = await fetch(`${API_URL}/api/db/toggle-rls`, {
      method: "POST",
      headers: getHeaders(),
      body: JSON.stringify({ tableName, enable }),
    });

    if (!response.ok) {
      throw new Error("Failed to toggle table RLS");
    }

    await response.json();

    toast.success("Table RLS toggled successfully");
    window.location.reload();
  } catch (error) {
    toast.error("Failed to toggle table RLS");
  }
};
