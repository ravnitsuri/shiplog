import { Form, Link, redirect } from "remix";
import { createShip } from "~/server/ships";
import { chunkify } from "~/utilities/chunkarray";
import fields from "../../constants/boatFields.json";

export const action = async ({ request }) => {
  const formData = await request.formData();
  let form = Object.fromEntries(formData);
  await createShip(form);
  return redirect("/");
};

export default function AddBoat() {
  return (
    <div className="container">
      <section />
      <div style={{ fontFamily: "system-ui, sans-serif", lineHeight: "1.4", margin: "10px" }}>
        <nav>
          <ul>
            <li>
              <Link to={"/"}>{`👈 Back to yarr boats`}</Link>
            </li>
          </ul>
        </nav>
        <hgroup>
          <h1>Add a new boat ⛵</h1>
          <h2>Details:</h2>
        </hgroup>

        <Form method="post">
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
                  {fields[0].title}: <input disabled type="text" name={fields[0].field} />
                </label>
              </div>
            )
          )}

          <section />
          <button type="submit">Create Ship</button>
        </Form>
      </div>
    </div>
  );
}
