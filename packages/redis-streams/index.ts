import { createClient } from "redis";
import "dotenv/config";

type websiteEvent = {
  url: string;
  id: string;
};

const STREAM_NAME = process.env.STREAM_NAME!;

const client = await createClient()
  .on("error", (err) => console.log("Redis client error", err))
  .connect();

async function xAdd({ url, id }: websiteEvent) {
  const res = await client.xAdd(STREAM_NAME, "*", {
    url,
    id,
  });

  console.log(res);
}

export async function xAddBulk(webiste: websiteEvent[]) {
  for (let i = 0; i < webiste.length; i++) {
    await xAdd({
      url: webiste[i]?.url!,
      id: webiste[i]?.id!,
    });
  }
}
