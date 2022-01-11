import { Links, LiveReload, Meta, Outlet, Scripts, ScrollRestoration } from "remix";

import styles from "~/styles/pico.min.css";
import customStyles from "~/styles/custom.css";

export function links() {
  return [
    { rel: "stylesheet", href: styles },
    { rel: "stylesheet", href: customStyles },
  ];
}

export function meta() {
  return { title: "⛵ Damanship ⛵" };
}

export default function App() {
  const [darkMode, setdarkMode] = React.useState(true);

  return (
    <html lang="en" data-theme={darkMode ? "dark" : "light"}>
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width,initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body>
        <Outlet />
        <ScrollRestoration />
        <Scripts />
        {process.env.NODE_ENV === "development" && <LiveReload />}
        <button
          onClick={() => setdarkMode((mode) => !mode)}
          style={{
            position: "fixed",
            height: "50px",
            width: "50px",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            bottom: 0,
            right: "25px",
            borderRadius: "50%",
          }}
          className="contrast"
        >
          {darkMode ? "🌞" : "🌙"}
        </button>
        <div className="santa">🎅</div>
      </body>
    </html>
  );
}
