import { NextOrObserver, onAuthStateChanged, User } from "firebase/auth";
import { auth } from "../../lib/firebase.config";
import {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useEffect,
  useState,
} from "react";

export type IsLoginContextType = [
  boolean,
  Dispatch<SetStateAction<boolean>>,
  boolean,
];

type IsLoginContextProviderType = {
  children: ReactNode;
};

export const IsLogedInContext = createContext(
  [] as unknown as IsLoginContextType,
);

export const IsLogInContextProvider = ({
  children,
}: IsLoginContextProviderType) => {
  const [isLogedIn, setIsLogedIn] = useState(false);
  const [userLoading, setUserLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(
      auth,
      initializeUser as NextOrObserver<User>,
    );
    return unsubscribe;
  }, []);
  async function initializeUser(user: User) {
    if (user) {
      setIsLogedIn(true);
    } else {
      setIsLogedIn(false);
    }
    setUserLoading(false);
  }
  return (
    <IsLogedInContext.Provider value={[isLogedIn, setIsLogedIn, userLoading]}>
      {!userLoading && children}
    </IsLogedInContext.Provider>
  );
};
