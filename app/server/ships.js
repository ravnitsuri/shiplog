import path from "path";
import fs from "fs/promises";
import { v4 as uuidv4 } from "uuid";

const shipsPath = path.join(__dirname, "../", "inputs", "ships.json");

export async function getShips() {
  let ships = await fs.readFile(shipsPath, { encoding: "utf-8" });
  ships = JSON.parse(ships);
  return ships;
}

export async function createShip(form) {
  let id = uuidv4();
  let listOfCrew = [];

  let ships = await fs.readFile(shipsPath, { encoding: "utf-8" });
  ships = JSON.parse(ships);
  ships.push({ ...form, listOfCrew, id });

  await fs.writeFile(shipsPath, JSON.stringify(ships, null, 2));
}

export async function deleteShip({ id }) {
  let ships = await fs.readFile(shipsPath, { encoding: "utf-8" });
  ships = JSON.parse(ships);

  ships = ships.filter((ship) => ship.id !== id);

  await fs.writeFile(shipsPath, JSON.stringify(ships, null, 2));
}

export async function getShip({ id }) {
  let ships = await fs.readFile(shipsPath, { encoding: "utf-8" });
  ships = JSON.parse(ships);

  let ship = ships.find((ship) => ship.id === id);
  return ship;
}

export async function updateShip(form) {
  let ships = await fs.readFile(shipsPath, { encoding: "utf-8" });
  ships = JSON.parse(ships);

  ships = ships.map((ship) => (ship.id === form.id ? { ...ship, ...form } : ship));

  await fs.writeFile(shipsPath, JSON.stringify(ships, null, 2));
}
