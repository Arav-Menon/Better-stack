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
        email: { label: "Email", type: "email", placeholder: "Email" },
        password: {
          label: "Password",
          type: "password",
          placeholder: "Enter Password",
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

  cookies: {
    sessionToken: {
      name: "next-auth.session-token", // <- ye hi naam Express me read karna hoga
      options: {
        httpOnly: true,
        sameSite: "none", // cross-origin ke liye zaroori
        secure: process.env.NODE_ENV === "production", // prod me true
        path: "/",
      },
    },
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
