import express from "express";
import { siteRouter } from "./src/sites/add_site";
import cookieParser from "cookie-parser";

export const app = express();
app.use(cookieParser());

const PORT = process.env.LISTING_PORT;

app.use(express.json());

app.use("/site", siteRouter);

app.listen(PORT, () => {
  console.log(`Server is started on PORT ${PORT}`);
});
