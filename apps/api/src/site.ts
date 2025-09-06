import express from "express";
import { addSite } from "@repo/lib/addSite";
import { db } from "@repo/db/db";
import { middleware } from "../middleware";
import { WatchDirectoryFlags } from "typescript";

export const siteRouter = express.Router();

siteRouter.post("/add-site", middleware, async (req: any, res: any) => {
  const user_id = req.id;

  try {
    const result = addSite.safeParse(req.body);

    if (!result.success) return null;

    const { site_name, url } = result.data;
    //@ts-ignore
    const existSite = await db.website.findUnique({ where: url });

    if (existSite) {
      return res.status(403).json({
        message: `website with this name${site_name} already exist, `,
      });
    }

    const createSite = await db.website.create({
      data: {
        site_name,
        url,
        user: {
          connect: {
            id: user_id,
          },
        },
      },
    });

    return res.status(200).json({
      createSite,
    });
  } catch (e) {
    console.log(e);
    res.status(500).json({
      message: e,
    });
  }
});

siteRouter.get("my-site", middleware, async (req: any, res: any) => {
  const user_id = req.id;

  try {
    //@ts-ignore
    const findSites = await db.website.findUnique({ where: user_id });

    return res.status(200).json({
      findSites,
    });
  } catch (e) {
    console.log(e);
    res.status(500).json({ e });
  }
});
