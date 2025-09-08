import { Router } from "express";
import { authMiddleware } from "../../../middleware";
import { db } from "@repo/db/db";

export const remove_user_router = Router();

remove_user_router.delete("/remove-account", authMiddleware, async (req, res) => {
  try {
    const userId = (req as any).user.id;

    await db.user.delete({
      where: { id: userId },
    });

    res.json({ message: "User deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
});
