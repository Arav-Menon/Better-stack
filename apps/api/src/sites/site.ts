import express, { Router } from "express";
import { middleware } from "../../middleware";
import { db } from "@repo/db/db";

const siteRouter = express.Router();

siteRouter.get("/my-site", middleware, async (req: any, res: any) => {
  const user_id = req.id;

  try {
    const findSites = await db.website.findUnique({ where: user_id });

    return res.status(200).json({
      findSites,
    });
  } catch (e) {
    console.log(e);
    res.status(500).json({ e });
  }
});
