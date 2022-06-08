import { PrismaClient } from "@prisma/client";
import fs from "fs";

const prisma = new PrismaClient({
  log: ["query", "info", "warn", "error"],
});

async function compute() {
  try {
    const files = fs.readdirSync("./src/export");
    let data = files.map((f) => {
      return JSON.parse(
        fs.readFileSync(`./src/export/${f}`, { encoding: "utf-8" })
      );
    });
    data = data.filter((a, i) => data.findIndex((d) => d.id === a.id) === i);

    for (let d of data) {
      console.log("Adding: " + d.name);

      await prisma.exercise.create({
        data: {
          id: d.id,
          name: d.name,
          rows: d.rows,
          columns: d.columns,
          content: JSON.stringify(d, null, 2),
        },
      });
    }
  } finally {
    prisma.$disconnect();
  }
}

compute();
