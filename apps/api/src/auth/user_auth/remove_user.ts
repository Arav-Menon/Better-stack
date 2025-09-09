import { Router } from "express";
import { authMiddleware } from "../../../middleware";
import { db } from "@repo/db/db";
import { use } from "react";

export const remove_user_router = Router();

remove_user_router.delete(
  "/remove-account",
  authMiddleware,
  async (req, res) => {
    try {
      const userId = req.id!;

      const findUserInWebsite = await db.website.deleteMany({
        where: { id: userId },
      });

      const deleteUser = await db.user.delete({
        where: { id: userId },
      });

      return res.status(200).json({ findUserInWebsite, deleteUser });
    } catch (err) {
      console.log(err);
      res.status(500).json({ error: "Server error" });
    }
  }
);
