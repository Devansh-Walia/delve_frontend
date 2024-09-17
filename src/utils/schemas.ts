import { z } from "zod";

export const emailSchema = z.string().email("Invalid email format.");
export const usernameSchema = z
  .string()
  .min(3, "Username must be at least 3 characters long.")
  .max(20, "Username must be at most 20 characters long.")
  .regex(
    /^[a-z0-9_-]+$/,
    "Username can only contain lowercase letters, numbers, hyphens, and underscores."
  );
export const passwordSchema = z
  .string()
  .min(8, "Password must be at least 8 characters long.")
  .max(30, "Password must be at most 30 characters long.");
export const nameSchema = z
  .string()
  .min(3, "Name must be at least 3 characters long.")
  .max(30, "Name must be at most 30 characters long.")
  .regex(/^[a-zA-Z\s]+$/, "Name can only contain letters and spaces.");
