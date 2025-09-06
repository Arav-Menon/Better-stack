import { z } from "zod";

export const authSchema = z.object({
  fullName: z.string().min(3),
  email: z.string().email(),
  password: z.string().min(6),
  confirmPassword: z.string().min(6),
  companyName: z.string(),
  otp: z.string().min(4).max(4),
  phoneNumber: z.string().min(10).max(10),
});

export const addSite = z.object({
  site_name: z.string(),
  url: z.string().startsWith("https://"),
});
