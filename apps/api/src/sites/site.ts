import express, { Router } from "express";
import { authMiddleware } from "../../middleware";
import { db } from "@repo/db/db";

export const siteRouter = express.Router();

siteRouter.get(
  "/my-site/:webisteId",
  authMiddleware,
  async (req: any, res: any) => {
    const user_id = req.id;
    const website_id = req.params.webisteId;

    try {
      const findSites = await db.website.findFirst({
        where: {
          user: {
            id: user_id,
          },
          id: website_id,
        },
        include: {
          WebsiteTick: {
            orderBy: [
              {
                createdAt: "desc",
              },
            ],
            take: 1,
          },
        },
      });

      return res.status(200).json({
        findSites,
      });
    } catch (e) {
      console.log(e);
      res.status(500).json({ e });
    }
  }
);
