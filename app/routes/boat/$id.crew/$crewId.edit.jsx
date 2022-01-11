import { Form, Link, redirect, useLoaderData } from "remix";
import { getCrew, updateCrew } from "~/server/crew";
import { chunkify } from "~/utilities/chunkarray";
import fields from "../../../constants/crewFields.json";

export const action = async ({ request, params }) => {
  const formData = await request.formData();
  let form = Object.fromEntries(formData);
  await updateCrew({ crew: { ...form, id: params.crewId }, shipId: params.id, crewId: params.crewId });
  return redirect(`/boat/${params.id}`);
};

export const loader = async ({ params: { id, crewId } }) => {
  const { crew, ship } = await getCrew({ id, crewId });

  return { crew, ship };
};

export default function EditCrew() {
  const { ship, crew } = useLoaderData();
  React.useEffect(() => {
    if (!fields || !ship || !crew) return;
    let entries = Object.entries(crew);
    for (let [key, val] of entries) {
      if (document.getElementsByName(key)?.[0]) {
        document.getElementsByName(key)[0].value = val;
      }
    }
  }, [ship, crew]);

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
          <button type="submit">Update Crew Member</button>
        </Form>
      </div>
    </div>
  );
}
