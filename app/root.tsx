import {
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
} from "@remix-run/react";
import "./App.scss";
import "./index.scss";
import { Suspense } from "react";
import Header from "./components/header/Header";
import Footer from "./components/footer/Footer";
import { IsLogInContextProvider } from "./context/loginContext";
import './i18n';


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
        <div id="root">
          <Suspense>
            <IsLogInContextProvider>
              <div className="page">
                <Header />
                <Suspense>{children}</Suspense>
                <Footer />
              </div>
            </IsLogInContextProvider>
          </Suspense>
        </div>
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}

export default function App() {
  return <Outlet />;
}
