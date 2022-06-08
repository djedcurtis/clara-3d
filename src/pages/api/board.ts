import { NextApiRequest, NextApiResponse } from "next";

import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default async function (req: NextApiRequest, res: NextApiResponse) {
  const id = req.query.id as string;

  // if (filesArray.length === 0) {
  //   const files = fs.readdirSync("./src/export");
  //   filesArray = files.map((f) => {
  //     return JSON.parse(
  //       fs.readFileSync(`./src/export/${f}`, { encoding: "utf-8" })
  //     );
  //   });
  // }
  // res.json(filesArray.find((f) => f.id === id));

  const data = await prisma.exercise.findFirst({
    where: { id },
  });
  res.json(data);
}
