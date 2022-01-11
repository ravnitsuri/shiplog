import { Form, Link, redirect, useParams } from "remix";
import { addCrewToShip } from "~/server/crew";
import { chunkify } from "~/utilities/chunkarray";
import fields from "../../../constants/crewFields.json";

export const action = async ({ request, params }) => {
  const formData = await request.formData();
  let form = Object.fromEntries(formData);
  console.log({ form, params });

  const shipId = params.id;
  await addCrewToShip({ form, shipId });
  return redirect(`/boat/${shipId}`);
};

export default function AddCrew() {
  const { id } = useParams();
  return (
    <div className="container">
      <div style={{ fontFamily: "system-ui, sans-serif", lineHeight: "1.4", margin: "10px" }}>
        <section />
        <nav>
          <ul>
            <li>
              <Link to={`/boat/${id}`}>{`👈 Back to yarr boat details`}</Link>
            </li>
          </ul>
        </nav>
        <hgroup>
          <h1>Add a new crew ⛵</h1>
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
          <button type="submit">Create Crew</button>
        </Form>
      </div>
    </div>
  );
}
