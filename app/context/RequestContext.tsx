import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";
import { IRow } from "../../app/types/types";
import { stringToBase64 } from "~/utils/encodeDecodeStrings";

export interface IRequest {
  rest: {
    url: string;
    method: string;
    headers: IRow[];
    response: string;
    body: string;
    variables: IRow[];
    params: IRow[];
    error?: string;
  };
  graphQL: {
    query: string;
    url: string;
    headers: IRow[];
    variables: { [key: string]: string };
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
    variables: [],
  },
  graphQL: {
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
    headers: [],
    variables: {},
  });

  useEffect(() => {
    window.history.replaceState(
      null,
      "",
      `/GRAPHQL/${stringToBase64(graphQLState.url).replace(/\//g, "_")}${
        graphQLState.query || Object.entries(graphQLState.variables).length > 1
          ? `/${stringToBase64(
              JSON.stringify({
                query: graphQLState.query,
                variables: graphQLState.variables,
              })
            )}`
          : ""
      }?${graphQLState.headers
        .filter(({ key, value }) => key && value)
        .map(
          ({ key, value }) =>
            `${encodeURIComponent(key)}=${encodeURIComponent(value)}`
        )
        .join("&")}`
    );
  }, [graphQLState]);

  const [restState, setRestState] = useState<IRequest["rest"]>({
    url: "",
    method: "GET",
    params: [],
    headers: [],
    response: "",
    body: "",
    variables: [],
  });

  useEffect(() => {
    const params = new URLSearchParams();
    restState.headers
      .filter(({ key, value }) => key && value)
      .forEach(({ key, value }) => {
        params.append(key, value);
      });
    const formatedBody =
      restState.body.replace(/{{(.*?)}}/g, (match) => {
        return `"${match}"`;
      }) || "";
    // if (restState.url) {
    window.history.replaceState(
      null,
      "",
      `/${restState.method}/${stringToBase64(restState.url).replace(
        /\//g,
        "_"
      )}${
        formatedBody || restState.variables.length
          ? `/${stringToBase64(
              JSON.stringify({
                body: formatedBody,
                variables: restState.variables,
              })
            )}`
          : ""
      }?${params.toString()}`
    );
    // }
  }, [restState]);

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
