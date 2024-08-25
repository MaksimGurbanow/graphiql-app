/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
} from "@remix-run/react";
import "./App.scss";
import "./index.scss";
import Header from "./components/header/Header";
import Footer from "./components/footer/Footer";
import { useContext, useEffect } from "react";
import { IsLogInContextProvider } from "./context/loginContext";

export function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/icon?family=Material+Icons"
        />
        <Meta />
        <Links />
      </head>
      <body>
        <div id="root">{children}</div>
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}

export default function App() {
  // const isLogin = useContext(IsLogedInContext);
  return (
    <IsLogInContextProvider>
      <div className="page">
        <Header />
        <Outlet />
        <Footer />
      </div>
    </IsLogInContextProvider>
  );
}
