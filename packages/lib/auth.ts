import CredentialsProvider from "next-auth/providers/credentials";
import { authSchema } from "./validations";
import { db } from "@repo/db/db";
import bcrypt from "bcrypt";
import GoogleProvider from "next-auth/providers/google";
import type { NextAuthOptions } from "next-auth";

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        fullName: { label: "full name", type: "text", placeholder: "jsmith" },
        email: { label: "Email", type: "email", placeholder: "Email" },
        password: {
          label: "Password",
          type: "password",
          placeholder: "Enter Password",
        },
        confirmPassword: {
          label: "Confirm password",
          type: "password",
          placeholder: "confirm password",
        },
        companyName: {
          label: "Company name",
          type: "text",
          placeholder: "Enter Company name",
        },
        otp: { label: "Otp", type: "text", placeholder: "Enter otp" },
        phoneNumber: {
          label: "Enter phone number ",
          type: "text",
          placeholder: "Enter phone number",
        },
      },
      async authorize(credentials, req) {
        const result = authSchema.safeParse(credentials);
        console.log(result);

        if (!result.success) return null;

        const {
          fullName,
          email,
          password,
          confirmPassword,
          companyName,
          phoneNumber,
        } = result.data;

        const existUser = await db.user.findUnique({ where: { email } });

        if (existUser) {
          const checkPassword = await bcrypt.compare(
            password,
            existUser.password
          );

          if (!checkPassword) throw new Error("Invalid password");

          return {
            id: existUser.id,
            fullName: existUser.fullName,
            email: existUser.email,
            company_name: existUser.companyName,
            phone_number: existUser.phoneNumber,
          };
        }

        const hashPassword = await bcrypt.hash(password, 10);

        const createUser = await db.user.create({
          data: {
            fullName,
            email,
            password: hashPassword,
            confirmPassword: hashPassword,
            companyName,
            phoneNumber,
          },
        });
        return createUser;
      },
    }),

    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID || "",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || "",
    }),
  ],

  secret: process.env.NEXTAUTH_SECRET,

  session: {
    strategy: "jwt",
  },

  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.email = user.email;
      }
      return token;
    },

    async session({ session, token }) {
      if (token) {
        session.user = {
          ...session.user,
          id: token.id as string,
          email: token.email as string,
        } as any;
      }
      return session;
    },
  },
};
