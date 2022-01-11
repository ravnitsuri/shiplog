import path from "path";
import fs from "fs/promises";

const PizZip = require("pizzip");
const Docxtemplater = require("docxtemplater");

const shipsPath = path.join(__dirname, "../", "inputs", "ships.json");

const inputFilePath = path.join(__dirname, "../", "inputs", "edited_form.docx");

const outputFilePath = path.join(
  __dirname,
  "../",
  "outputs",
  `output-${new Date().toLocaleString().replaceAll("/", "-").replace(", ", "_").replace(" ", "_")}.docx`
);

export async function generateDocument({ shipId }) {
  let ships = await fs.readFile(shipsPath, { encoding: "utf-8" });
  ships = JSON.parse(ships);

  let ship = ships.find((ship) => ship.id === shipId);

  let content = await fs.readFile(inputFilePath, "binary");

  const zip = new PizZip(content);

  const doc = new Docxtemplater(zip, {
    paragraphLoop: true,
    linebreaks: true,
  });

  doc.render(ship);

  const buf = doc.getZip().generate({ type: "nodebuffer" });

  await fs.writeFile(outputFilePath, buf, { flag: "w" });

  return ship;
}
