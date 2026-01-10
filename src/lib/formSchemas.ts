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

export const contactFormSchema = z.object({
  email: z
    .string()
    .trim()
    .min(1, "Email is required")
    .email("Invalid email address"),
  fullName: z.string("Full Name is required").min(2).max(50),
  subjectLine: z.string("Subject Line is required").min(2).max(100),
   message: z
    .string()
    .trim() 
    .min(1, { message: "Message is grater than 1 character." }) 
    .max(500, { message: "Message is less than 500 characters." }),
});