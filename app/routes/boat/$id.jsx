import { Link, useLoaderData, useSubmit } from "remix";
import { deleteCrew } from "~/server/crew";
import { generateDocument } from "~/server/generateDoc";
import { getShip } from "~/server/ships";
import fields from "../../constants/boatFields.json";
import crewfields from "../../constants/crewFields.json";

export const loader = async ({ params: { id } }) => {
  const ship = await getShip({ id });

  return { ship };
};

export const action = async ({ request }) => {
  switch (request.method.toLowerCase()) {
    case "delete":
      let reqObj = Object.fromEntries(await request.formData());
      await deleteCrew(reqObj);

      break;

    case "post":
      let { shipId } = Object.fromEntries(await request.formData());
      await generateDocument({ shipId });
      break;

    default:
      break;
  }

  return null;
};

export default function boatDetails() {
  const { ship } = useLoaderData();
  const submit = useSubmit();

  const crewbuttonStyles = {
    height: "50px",
    width: "50px",
    display: "flex",
    justifyContent: "center",
    margin: 0,
    alignItems: "center",
    transform: "scale(0.5)",
  };

  return (
    <div className="container">
      <section />
      <nav>
        <ul>
          <li>
            <Link to={"/"}>{`👈 Back to yarr boats`}</Link>
          </li>
        </ul>
      </nav>
      <h1 style={{ display: "flex", justifyContent: "space-between" }}>
        View ye Ship Details!
        <Link to={`/boat/${ship.id}/edit`} className="outline" role="button">
          ✏️
        </Link>
      </h1>

      <table>
        <tbody>
          {fields
            .filter((x) => x.field !== "id")
            .map((field, i) => (
              <tr key={`ship-field-${i}`}>
                <th>
                  <b>{field.title}:</b>
                </th>
                <td>{ship[field.field]}</td>
              </tr>
            ))}
        </tbody>
      </table>

      <h2>Crew Members:</h2>

      <figure>
        <table role="grid">
          <thead>
            <tr>
              {[...crewfields, { title: "Edit/Delete" }]
                .filter((x) => x.field !== "id")
                .map((cf, i) => (
                  <th scope="col" key={`fieldHeader-${i}`}>
                    {cf.title}
                  </th>
                ))}
            </tr>
          </thead>
          <tbody>
            {ship.listOfCrew?.map((cMember, j) => (
              <tr key={`row-${j}`}>
                {crewfields
                  .filter((x) => x.field !== "id")
                  .map((cf, i) =>
                    cf.title === "No." ? (
                      <th scope="col" key={`field-${i}`}>
                        {cMember[cf.field]}
                      </th>
                    ) : (
                      <td key={`field-${i}`}>{cMember[cf.field]}</td>
                    )
                  )}
                <td style={{ display: "flex" }}>
                  <Link to={`/boat/${ship.id}/crew/${cMember.id}/edit`} role="button" className="outline" style={crewbuttonStyles}>
                    ✏️
                  </Link>
                  <button
                    className="outline"
                    style={crewbuttonStyles}
                    onClick={() => submit({ shipId: ship.id, crewId: cMember.id }, { method: "DELETE", replace: true })}
                  >
                    ❌
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </figure>

      <Link to={`/boat/${ship.id}/crew/add`}>
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
          ➕ Add Crew
        </article>
      </Link>

      <section />

      <section>
        <button
          style={{ height: "200px", fontSize: "50px" }}
          className="contrast"
          onClick={() => submit({ shipId: ship.id }, { method: "POST", replace: true })}
        >
          ⛵ EXPORT TO DOCX ⛵
        </button>
      </section>
    </div>
  );
}
