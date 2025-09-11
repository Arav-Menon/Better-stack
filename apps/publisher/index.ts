import { db } from "@repo/db/db";
import { xAddBulk } from "@repo/redis-streams/redis_streams";

async function main() {
  let websites = await db.website.findMany({
    select: {
      url: true,
      id: true,
    },
  });

  console.log(websites.length);

  await xAddBulk(
    websites.map((w) => ({
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
