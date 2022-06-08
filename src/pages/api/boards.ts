import { NextApiRequest, NextApiResponse } from "next";

import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default async function (req: NextApiRequest, res: NextApiResponse) {
  // const files = fs.readdirSync("./src/export");
  // let data = files.map((f) => {
  //   const content = JSON.parse(
  //     fs.readFileSync(`./src/export/${f}`, { encoding: "utf-8" })
  //   );
  //   return { id: content.id, name: content.name };
  // });
  // data = data.filter((a, i) => data.findIndex((d) => d.id === a.id) === i);

  const data = await prisma.exercise.findMany({
    select: { id: true, name: true },
    orderBy: { name: "asc" },
  });
  res.json(data);
}
