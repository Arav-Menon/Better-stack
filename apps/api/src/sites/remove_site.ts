import express, { Router } from "express";
import { middleware } from "../../middleware";
import { db } from "@repo/db/db";

const siteRouter = express.Router();

siteRouter.delete(
  "/remove/:websiteId",
  middleware,
  async (req: any, res: any) => {
    const user_id = req.id;
    const websiteId = req.websiteId;

    try {
      const findUser = await db.user.findUnique({ where: { id: user_id } });
      if (!findUser) return res.status(404).json({ message: "User not found" });
      const findSites = await db.website.findUnique({
        where: { id: websiteId },
      });

      if (!findSites) return res.status.json({ mssg: "site does not found" });

      if (user_id !== findSites.user_id) {
        return res
          .status(403)
          .json({ message: "You're not authorized to remove this site" });
      }
      const removesite = await db.website.delete({
        where: { id: websiteId },
      });

      return res.status(200).json({
        removesite,
      });
    } catch (e) {
      console.log(e);
      res.status(500).json({ e });
    }
  }
);
