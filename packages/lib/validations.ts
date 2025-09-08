import { z } from "zod";

export const authSchema = z.object({
  fullName: z.string().min(3).optional(),
  email: z.string().email(),
  password: z.string().min(6),
  confirmPassword: z.string().min(6).optional(),
  companyName: z.string().optional(),
  otp: z.string().min(4).max(4).optional(),
  phoneNumber: z.string().min(10).max(10).optional(),
});

export const addSite = z.object({
  site_name: z.string(),
  url: z.string(),
});
