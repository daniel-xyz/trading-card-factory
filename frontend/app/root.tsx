import styles from "./styles/shared.css";
import type { LinksFunction } from "@remix-run/node";
import {
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
} from "@remix-run/react";
import { NextUIProvider } from "@nextui-org/react";
import CardCreationForm from "./CardCreationForm";

export const links: LinksFunction = () => [{ rel: "stylesheet", href: styles }];

export default function App() {
  return (
    <html lang="en" className="dark bg-stone-700">
      <head>
        <Meta />
        <Links />
      </head>
      <body>
        <NextUIProvider>
          <div className="flex flex-col items-center justify-center h-screen">
            <CardCreationForm onCardCreate={() => {}} />
          </div>
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
