import express, { Router } from "express";
import { middleware } from "../../middleware";
import { db } from "@repo/db/db";
import { addSite } from "@repo/lib/addSite";

const siteRouter = express.Router();

siteRouter.put(
  "/my-site/edit/:websiteId",
  middleware,
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
    } catch (e) {
      console.log(e);
      res.status(500).json({ e });
    }
  }
);
