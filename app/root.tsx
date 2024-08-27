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
import {
  IsLogedInContext,
  IsLogInContextProvider,
} from "./context/loginContext";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "lib/firebase.config";

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
  // const user = JSON.parse(localStorage.getItem('user'));
  // console.log(user);
  // const [isLogedIn, setIsLogedIn] = useContext(IsLogedInContext);
  // useEffect(() =>   onAuthStateChanged(auth, (user) => {
  //   if(user) {
  //     setIsLogedIn(true);
  //   } else {
  //     setIsLogedIn(false);
  //   }
  // }), [])

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
