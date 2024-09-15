import {
  isRouteErrorResponse,
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useRouteError,
} from "@remix-run/react";
import "./App.scss";
import "./index.scss";
import { Suspense } from "react";
import Header from "./components/header/Header";
import Footer from "./components/footer/Footer";
import { IsLogInContextProvider } from "./context/loginContext";
import RequestProvider from "./context/RequestContext";
import "./i18n";
import AlertProvider from "./context/alertContext";
import SchemaProvider from "./context/SchemaContext";

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
            <AlertProvider>
              <RequestProvider>
                <SchemaProvider>
                  <IsLogInContextProvider>
                    <div className="page">
                      <Header />
                      <Suspense>{children}</Suspense>
                      <Footer />
                    </div>
                  </IsLogInContextProvider>
                </SchemaProvider>
              </RequestProvider>
            </AlertProvider>
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

export function ErrorBoundary() {
  const error = useRouteError();
  return (
    <html lang="en">
      <head>
        <title>Oops!</title>
        <Meta />
        <Links />
      </head>
      <body
        style={{
          padding: "20px",
          display: "flex",
          flexDirection: "column",
          gap: "20px",
        }}
      >
        <h1>Application error</h1>
        <p>
          {" "}
          {isRouteErrorResponse(error)
            ? `${error.status} ${error.statusText}`
            : error instanceof Error
            ? error.message
            : "Unknown Error"}
        </p>
        <a
          href="/"
          style={{
            textDecoration: "none",
            border: "1px solid red",
            borderRadius: "5px",
            color: "red",
            padding: "5px",
          }}
        >
          {" "}
          Refresh application
        </a>
        <Scripts />
      </body>
    </html>
  );
}
