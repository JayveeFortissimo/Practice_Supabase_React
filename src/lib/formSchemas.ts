"use client";
import { z } from "zod";

export const loginFormSchema = z.object({
  email: z
    .string()
    .trim()
    .min(1, "Email is required")
    .email("Invalid email address"),

  password: z.string("Password are Required").min(2).max(50),
  rememberMe: z.boolean().default(false).optional(),
});

export const registerFormSchema = z.object({
  email: z
    .string()
    .trim()
    .min(1, "Email is required")
    .email("Invalid email address"),

  username: z.string("Username are required!").min(2).max(50),
  password: z.string("Password are Required").min(2).max(50),
  confirmPassword: z.string("Confirm are required").min(2).max(50),
});
