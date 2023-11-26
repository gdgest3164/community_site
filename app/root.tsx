import "@mantine/core/styles.css";
import "@mantine/notifications/styles.css";
import "~/styles/global.css";
import { cssBundleHref } from "@remix-run/css-bundle";
import { json, type LinksFunction, type LoaderFunction } from "@remix-run/node";
import { Links, LiveReload, Meta, Outlet, Scripts, ScrollRestoration, useLoaderData, useLocation } from "@remix-run/react";
import { MantineProvider, ColorSchemeScript } from "@mantine/core";
import { Notifications } from "@mantine/notifications";
import Header from "./components/Header";
import { getUserToken } from "./auth.server";
import type { User } from "@supabase/supabase-js";
import supabase from "./models/supabase";

export const links: LinksFunction = () => [...(cssBundleHref ? [{ rel: "stylesheet", href: cssBundleHref }] : [])];

interface IRootLoaderData {
  is_login: boolean;
  user?: User | null;
}
export const loader: LoaderFunction = async ({ request }) => {
  const { accessToken } = await getUserToken(request);
  if (!accessToken) return json<IRootLoaderData>({ is_login: false });

  const {
    data: { user },
  } = await supabase.auth.getUser(accessToken);
  return json<IRootLoaderData>({ is_login: true, user });
};

export default function App() {
  const { is_login, user } = useLoaderData<IRootLoaderData>();
  const location = useLocation();

  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width,initial-scale=1" />
        <Meta />
        <Links />
        <ColorSchemeScript />
      </head>
      <body>
        <MantineProvider>
          <Notifications />
          {!location.pathname.includes("/auth") && <Header is_login={is_login} />}
          <Outlet context={{ user, is_login }} />
          <ScrollRestoration />
          <Scripts />
          <LiveReload />
        </MantineProvider>
      </body>
    </html>
  );
}
