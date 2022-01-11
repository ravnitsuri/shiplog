import path from "path";
import fs from "fs/promises";
import { v4 as uuidv4 } from "uuid";

const shipsPath = path.join(__dirname, "../", "inputs", "ships.json");

export async function addCrewToShip({ form, shipId }) {
  let id = uuidv4();

  let ships = await fs.readFile(shipsPath, { encoding: "utf-8" });
  ships = JSON.parse(ships);
  // ships.push({ ...form, listOfCrew, id });

  ships = ships.map((ship) =>
    ship.id === shipId ? { ...ship, listOfCrew: ship.listOfCrew?.length ? [...ship.listOfCrew, { ...form, id }] : [{ ...form, id }] } : ship
  );

  await fs.writeFile(shipsPath, JSON.stringify(ships, null, 2));
}

export async function getCrew({ id, crewId }) {
  let ships = await fs.readFile(shipsPath, { encoding: "utf-8" });
  ships = JSON.parse(ships);
  // ships.push({ ...form, listOfCrew, id });

  let ship = ships.find((x) => x.id === id);
  let crew = ship.listOfCrew.find((x) => x.id === crewId);

  return { crew, ship };
}

export async function updateCrew({ crew, shipId, crewId }) {
  let ships = await fs.readFile(shipsPath, { encoding: "utf-8" });
  ships = JSON.parse(ships);

  ships = ships.map((ship) => {
    if (ship.id === shipId) {
      return { ...ship, listOfCrew: ship.listOfCrew.map((c) => (c.id === crewId ? { ...c, ...crew } : c)) };
    } else return ship;
  });

  await fs.writeFile(shipsPath, JSON.stringify(ships, null, 2));
}

export async function deleteCrew({ shipId, crewId }) {
  let ships = await fs.readFile(shipsPath, { encoding: "utf-8" });
  ships = JSON.parse(ships);

  ships = ships.map((ship) => {
    if (ship.id === shipId) {
      return { ...ship, listOfCrew: ship.listOfCrew.filter((c) => c.id !== crewId) };
    } else return ship;
  });

  await fs.writeFile(shipsPath, JSON.stringify(ships, null, 2));
}
