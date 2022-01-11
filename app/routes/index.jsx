import { Form, Link, useLoaderData } from "remix";
import { deleteShip, getShips } from "~/server/ships";

export const loader = async () => {
  const ships = await getShips();
  return ships;
};

export const action = async ({ request }) => {
  if (request.method === "DELETE") {
    const formData = await request.formData();

    let form = Object.fromEntries(formData);
    let id = Object.keys(form)[0];
    console.log({ id });

    await deleteShip({ id });
  }

  return null;
};

export default function Index() {
  const ships = useLoaderData();

  return (
    <div className="container">
      <section></section>
      <hgroup>
        <h1>Welcome to Daman's boat ⛵</h1>
        <h2>Batten down the hatches! Here are a list of ships:</h2>
      </hgroup>
      <main className="container">
        <div className="grid" style={{ flexWrap: "wrap", display: "flex", justifyContent: "center" }}>
          {ships.map((ship, i) => (
            <Link to={`boat/${ship.id}`} key={`ship-${i}`}>
              <article
                key={`ship-${ship.id}`}
                style={{
                  display: "flex",
                  justifyContent: "center",
                  position: "relative",
                  alignItems: "center",
                  margin: "20px",
                  height: "200px",
                  width: "200px",
                }}
              >
                {ship.name}
                <Form
                  method="DELETE"
                  onClick={(e) => {
                    e.stopPropagation();
                  }}
                >
                  <input type="text" name={ship.id} style={{ display: "none" }} />
                  <button
                    role="button"
                    className="outline"
                    style={{ position: "absolute", top: 0, right: 0, width: "100px", transform: "scale(0.4) translate(50px, -20px)" }}
                    type="submit"
                  >
                    ❌
                  </button>
                </Form>
              </article>
            </Link>
          ))}
        </div>

        <section />

        <Link to={`/boat/add`}>
          <article
            style={{
              display: "flex",
              justifyContent: "center",
              position: "relative",
              alignItems: "center",
              height: "100%",
              margin: 0,
            }}
          >
            ➕ Add Boat
          </article>
        </Link>
      </main>
    </div>
  );
}
