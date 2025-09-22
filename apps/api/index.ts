import express from "express";
import { siteRouter } from "./src/sites/site";
import cookieParser from "cookie-parser";
import { authRouter } from "./src/auth/user_auth/auth";
import { remove_user_router } from "./src/auth/user_auth/remove_user";
import { update_user_router } from "./src/auth/user_auth/update_user";
import { userRouter } from "./src/auth/user_auth/user";
import "dotenv/config";
import { update_site_router } from "./src/sites/edit_site";
import { remove_site_router } from "./src/sites/remove_site";
import { add_site_router } from "./src/sites/add_site";
import cors from "cors";

export const app = express();
app.use(cookieParser());

app.use(cors({
  origin: process.env.CLIENT_URL,
  credentials: true,
}))

const PORT = process.env.LISTING_PORT;

app.use(express.json());

// User router
app.use("/user", authRouter);
app.use("/user", userRouter);
app.use("/user", update_user_router);
app.use("/user", remove_user_router);

// site router
app.use("/site", add_site_router);
app.use("/site", siteRouter);
app.use("/site", update_site_router);
app.use("/site", remove_site_router);

app.listen(PORT, () => {
  console.log(`Server is started on PORT ${PORT}`);
});
