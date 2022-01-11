import { Form, Link, redirect, useLoaderData } from "remix";
import { updateShip, getShip } from "~/server/ships";
import { chunkify } from "~/utilities/chunkarray";
import fields from "../../constants/boatFields.json";

export const action = async ({ request, params }) => {
  const formData = await request.formData();
  let form = Object.fromEntries(formData);
  await updateShip({ ...form, id: params.id });
  return redirect("/");
};

export const loader = async ({ params: { id } }) => {
  const ship = await getShip({ id });
  return { ship };
};

export default function EditBoat() {
  const { ship } = useLoaderData();

  React.useEffect(() => {
    if (!fields || !ship) return;
    let entries = Object.entries(ship);
    for (let [key, val] of entries) {
      if (document.getElementsByName(key)?.[0]) {
        document.getElementsByName(key)[0].value = val;
      }
    }
  }, [ship]);

  return (
    <div className="container">
      <section />
      <div style={{ fontFamily: "system-ui, sans-serif", lineHeight: "1.4", margin: "10px" }}>
        <nav>
          <ul>
            <li>
              <Link to={`/boat/${ship.id}`}>{`👈 Back to yarr boat details`}</Link>
            </li>
          </ul>
        </nav>
        <hgroup>
          <h1>Ahoy! Edit yer boat, Savvy? ⛵</h1>
          <h2>Details:</h2>
        </hgroup>

        <Form method="put">
          {chunkify(fields.filter((x) => x.field !== "id")).map((fields, i) =>
            fields.length === 2 ? (
              <div className="grid" key={`field-${i}`}>
                <label htmlFor={fields[0].field}>
                  {fields[0].title}: <input type="text" name={fields[0].field} />
                </label>
                <label htmlFor={fields[1].field}>
                  {fields[1].title}: <input type="text" name={fields[1].field} />
                </label>
              </div>
            ) : (
              <div className="grid" key={`field-${i}`}>
                <label htmlFor={fields[0].field}>
                  {fields[0].title}: <input type="text" name={fields[0].field} />
                </label>
              </div>
            )
          )}

          <section />
          <button type="submit">Update Ship</button>
        </Form>
      </div>
    </div>
  );
}
