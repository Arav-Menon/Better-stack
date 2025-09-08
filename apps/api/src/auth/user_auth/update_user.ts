import { authSchema } from "@repo/lib/addSite";
import { Router } from "express";
import { authMiddleware } from "../../../middleware";
import bcrypt from "bcrypt";
import { db } from "@repo/db/db";

export const update_user_router = Router();

update_user_router.put("/update-account", authMiddleware, async (req, res) => {
  try {
    const userId = (req as any).user.id;

    const parseResult = authSchema.safeParse(req.body);
    if (!parseResult.success) {
      return res.status(400).json({ error: parseResult.error });
    }

    const data = parseResult.data;

    if (data.password && data.confirmPassword) {
      if (data.password !== data.confirmPassword) {
        return res.status(400).json({ error: "Passwords do not match" });
      }
      const hashedPassword = await bcrypt.hash(data.password, 10);
      data.password = hashedPassword;
      data.confirmPassword = hashedPassword;
    } else {
      delete (data as any).password;
      delete (data as any).confirmPassword;
    }

    const updatedUser = await db.user.update({
      where: { id: userId },
      data,
      select: {
        id: true,
        fullName: true,
        email: true,
        companyName: true,
        phoneNumber: true,
        image: true,
        createdAt: true,
      },
    });

    res.json({ message: "User updated successfully", user: updatedUser });
  } catch (err: any) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
});
