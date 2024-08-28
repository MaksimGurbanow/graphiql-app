import {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useState,
} from "react";

type IsLoginContextType = [boolean, Dispatch<SetStateAction<boolean>>];

type IsLoginContextProviderType = {
  children: ReactNode;
};

export const IsLogedInContext = createContext(
  [] as unknown as IsLoginContextType
);

export const IsLogInContextProvider = ({
  children,
}: IsLoginContextProviderType) => {
  const [isLogedIn, setIsLogedIn] = useState(false);
  return (
    <IsLogedInContext.Provider value={[isLogedIn, setIsLogedIn]}>
      {children}
    </IsLogedInContext.Provider>
  );
};
