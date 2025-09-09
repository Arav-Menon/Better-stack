import { Router } from "express";
import { authMiddleware } from "../../../middleware";
import { db } from "@repo/db/db";

export const remove_user_router = Router();

remove_user_router.delete(
  "/remove-account/:userId/:webisteId",
  authMiddleware,
  async (req, res) => {
    try {
      const userId = (req as any).user.id;
      const websiteId = req.params.webisteId;

      const user = await db.user.delete({
        where: { id: userId },
      });
      const userAddedWebsite = await db.website.delete({
        where: {
          user_id: userId,
          id: websiteId,
        },
      });

      res.json({ userAddedWebsite, user });
    } catch (err) {
      res.status(500).json({ error: "Server error" });
    }
  }
);
