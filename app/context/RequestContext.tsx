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
  };
  graphQL: {
    url: string;
    headers: object;
    variables: object;
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
    url: "",
    headers: {},
    variables: {},
  },
  setRest: noop,
  setGraphql: noop,
});

export const useRequestContext = () => useContext(RequestContext);

export const RequestProvider = ({ children }: { children: ReactNode }) => {
  const [graphQLState, setGraphQLState] = useState<IRequest["graphQL"]>({
    url: "",
    headers: {},
    variables: {},
  });

  const [restState, setRestState] = useState<IRequest["rest"]>({
    url: "",
    method: "",
    params: [
      {
        value: "",
        key: "",
        description: "",
      },
    ],
    headers: [
      {
        value: "",
        key: "",
        description: "",
      },
    ],
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
      params: params?.map((param, index) => ({
        ...param,
        description: prev.params[index]?.description || "",
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

