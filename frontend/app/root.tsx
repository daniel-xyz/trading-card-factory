import styles from "./styles/shared.css";
import type { LinksFunction } from "@remix-run/node"; // or cloudflare/deno
import {
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
} from "@remix-run/react";
import { NextUIProvider, Button, ButtonGroup } from "@nextui-org/react";

export const links: LinksFunction = () => [{ rel: "stylesheet", href: styles }];

export default function App() {
  return (
    <html lang="en" className="bg-stone-900">
      <head>
        <Meta />
        <Links />
      </head>
      <body>
        <NextUIProvider>
          <h1>Hello world!</h1>
          <Button
            radius="full"
            className="bg-gradient-to-tr from-violet-500 to-purple-500 text-white shadow-lg"
          >
            Button
          </Button>
          <Outlet />
          <ScrollRestoration />
          <Scripts />
          <LiveReload />
        </NextUIProvider>
        <LiveReload />
      </body>
    </html>
  );
}
