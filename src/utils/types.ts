import { z } from "zod";

export const SignupSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
  username: z.string().min(3),
  name: z.string().min(6),
});

export const LoginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
});

export type UserResponse = {
  id: string;
  email: string;
  mfa_enabled: boolean;
}[];

export type TablesResponse = {
  table_name: string;
  rls_enabled: boolean;
}[];
