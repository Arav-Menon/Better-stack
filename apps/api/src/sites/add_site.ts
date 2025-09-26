import express from "express";
import { addSite } from "@repo/lib/addSite";
import { db } from "@repo/db/db";
import { authMiddleware } from "../../middleware";

export const add_site_router = express.Router();

add_site_router.post(
  "/add-site",
  authMiddleware,
  async (req: any, res: any) => {
    const user_id = req.id;

    try {
      const result = addSite.safeParse(req.body);

      if (!result.success) return res.status(400).json({ error: result.error });

      const { site_name, url, description } = result.data;
      const existSite = await db.website.findUnique({ where: { id: url } });

      if (existSite) {
        return res.status(403).json({
          message: `website with this name${site_name} already exist, `,
        });
      }

      try {
        const createSite = await db.website.create({
          data: {
            site_name: site_name,
            url: url,
            description: description,
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
      } catch (err) {
        return res.status.json({
          error: err,
        });
      }
    } catch (e) {
      console.log(e);
      res.status(500).json({
        message: e,
      });
    }
  }
);
