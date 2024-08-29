import { createContext, ReactNode, useContext, useState } from "react";

export interface IRequest {
  variables: { [key: string]: string[]; paths: string[] };
  headers: {
    rest: string[];
    graphQL: string[];
  };
}

export const RequestContext = createContext<{
  requestState: IRequest;
  setRequestState: (v: IRequest) => void;
}>({
  requestState: {
    variables: { paths: [] },
    headers: { rest: [], graphQL: [] },
  },
  setRequestState: (_v: IRequest) => {
    console.log(_v);
  },
});

export const useRequest = () => useContext(RequestContext);

const RequestProvider = ({ children }: { children: ReactNode }) => {
  const [requestState, setRequestState] = useState<IRequest>({
    variables: { paths: [] },
    headers: { rest: [], graphQL: [] },
  });
  return (
    <RequestContext.Provider value={{ requestState, setRequestState }}>
      {children}
    </RequestContext.Provider>
  );
};

export default RequestProvider;
