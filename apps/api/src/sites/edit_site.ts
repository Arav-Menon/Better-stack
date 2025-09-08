import express, { Router } from "express";
import { authMiddleware } from "../../middleware";
import { db } from "@repo/db/db";
import { addSite } from "@repo/lib/addSite";

export const update_site_router = express.Router();

update_site_router.put(
  "/edit/:websiteId",
  authMiddleware,
  async (req: any, res: any) => {
    const user_id = req.id;
    const websiteId = req.params.websiteId;

    try {
      const body = req.body;
      const result = addSite.safeParse(body);

      if (!result.success)
        return res.status(409).json({ message: "validation problem" });

      const existSite = await db.website.findUnique({ where: websiteId });

      if (!existSite)
        return res.status(404).json({ message: "Website could not found" });

      const updateSite = await db.website.update({
        //@ts-ignore
        where: { websiteId },
        data: {
          site_name: body.site_name,
          url: body.url,
          user: {
            connect: {
              id: user_id,
            },
          },
        },
      });

      return res.status(200).json({ updateSite });
    } catch (e) {
      console.log(e);
      res.status(500).json({ e });
    }
  }
);
