import { xAddBulk } from "@repo/redis-streamline/client";
import { db } from "@repo/db/db";

async function main() {
  let websites = await db.website.findMany({
    select: {
      url: true,
      id: true,
    },
  });

  console.log(websites.length);

  //@ts-ignore
  await xAddBulk(
    websites.map((w: any) => ({
      url: w.url,
      id: w.id,
    }))
  );
}

setInterval(
  () => {
    main();
  },
  3 * 1000 * 60
);

main();
