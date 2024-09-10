import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";
import { IRow } from "~/types/types";

export interface IRequest {
  rest: {
    url: string;
    method: string;
    headers: IRow[];
    response: string;
    body: string;
    variables: object;
    params: IRow[];
    error?: string;
  };
  graphQL: {
    query: string;
    url: string;
    sdl: string;
    headers: IRow[];
    variables: object;
    response: string;
  };
}

const noop = () => {
  throw new Error("setRest or setGraphql should be used within a provider");
};

export const RequestContext = createContext<{
  rest: IRequest["rest"];
  graphQL: IRequest["graphQL"];
  setRest: React.Dispatch<React.SetStateAction<IRequest["rest"]>>;
  setGraphql: React.Dispatch<React.SetStateAction<IRequest["graphQL"]>>;
}>({
  rest: {
    url: "",
    method: "",
    params: [],
    headers: [],
    response: "",
    body: "",
    variables: {},
  },
  graphQL: {
    sdl: "",
    url: "",
    query: "",
    response: "",
    headers: [],
    variables: {},
  },
  setRest: noop,
  setGraphql: noop,
});

export const useRequestContext = () => useContext(RequestContext);

const RequestProvider = ({ children }: { children: ReactNode }) => {
  const [graphQLState, setGraphQLState] = useState<IRequest["graphQL"]>({
    url: "",
    response: "",
    query: "",
    sdl: "",
    headers: [],
    variables: {},
  });

  const [restState, setRestState] = useState<IRequest["rest"]>({
    url: "",
    method: "GET",
    params: [],
    headers: [],
    response: "",
    body: "",
    variables: {},
  });

  useEffect(() => {
    const [, par] = restState.url.split("?");
    const params = par?.split("&")?.map((param) => ({
      key: param.split("=")[0] || "",
      value: param.split("=")[1] || "",
    }));
    setRestState((prev) => ({
      ...prev,
      params: params?.map((param) => ({
        ...param,
      })) || [
        {
          key: "",
          value: "",
          description: "",
        },
      ],
    }));
  }, [restState.url]);

  return (
    <RequestContext.Provider
      value={{
        rest: restState,
        graphQL: graphQLState,
        setRest: setRestState,
        setGraphql: setGraphQLState,
      }}
    >
      {children}
    </RequestContext.Provider>
  );
};

export default RequestProvider;
