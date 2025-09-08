import { Router } from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { db } from "@repo/db/db";
import { authSchema } from "@repo/lib/addSite";

import "dotenv/config";

export const authRouter = Router();

const JWT_SECRET = process.env.NEXTAUTH_SECRET || "not_original_token";

console.log(JWT_SECRET);

authRouter.post("/auth", async (req, res) => {
  const result = authSchema.safeParse(req.body);

  if (!result.success) return res.status(411).json({ message: Error });

  try {
    const {
      fullName,
      email,
      password,
      confirmPassword,
      companyName,
      phoneNumber,
    } = result.data;

    if (!email || !password) {
      return res.status(400).json({ error: "Email and password are required" });
    }

    let user = await db.user.findUnique({ where: { email } });

    if (user) {
      const validPassword = await bcrypt.compare(password, user.password);
      if (!validPassword) {
        return res.status(401).json({ error: "Invalid credentials" });
      }

      const token = jwt.sign({ id: user.id, email: user.email }, JWT_SECRET, {
        expiresIn: "7d",
      });

      return res.status(200).json({
        message: user ? "Login successful" : "User registered",
        token,
        user: {
          id: user.id,
          email: user.email,
          fullName: user.fullName,
        },
      });
    } else {
      // ---- REGISTER ----
      if (!fullName || !companyName) {
        return res.status(400).json({
          error: "Full name and company name are required for registration",
        });
      }
      if (password !== confirmPassword) {
        return res.status(400).json({ error: "Passwords do not match" });
      }

      const hashedPassword = await bcrypt.hash(password, 10);

      user = await db.user.create({
        data: {
          fullName,
          email,
          password: hashedPassword,
          confirmPassword: hashedPassword, // 👈 avoid storing plain confirmPassword in real apps
          companyName,
          phoneNumber,
        },
      });
    }

    const token = jwt.sign({ id: user.id, email: user.email }, JWT_SECRET, {
      expiresIn: "7d",
    });

    return res.status(200).json({
      message: user ? "Login successful" : "User registered",
      token,
      user: {
        id: user.id,
        email: user.email,
        fullName: user.fullName,
      },
    });
  } catch (err: any) {
    console.error(err);
    return res.status(500).json({ error: "Internal Server error" });
  }
});
