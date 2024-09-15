import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";
import { DocumentationQuery } from "../types/types";
import { useRequestContext } from "./RequestContext";
import { getIntrospectionQuery } from "graphql";
import { useAlertContext } from "./alertContext";

export interface ISchema {
  isLoading: boolean;
  schema?: DocumentationQuery | null;
  setSchema: (v: DocumentationQuery) => void;
  setIsChanged: (V: boolean) => void;
  sdl: string;
  setSdl: (v: string) => void;
}

export const SchemaContext = createContext<ISchema>({
  isLoading: false,
  schema: null,
  setSchema: (v) => {
    throw new Error("This function must be used only in SchemaContext" + v);
  },
  setIsChanged: (v) => {
    throw new Error("This function must be used only in SchemaContext" + v);
  },
  sdl: "",
  setSdl: function (v: string): void {
    throw new Error("This function must be used only in SchemaContext" + v);
  },
});

export const useSchemaContext = () => useContext(SchemaContext);

const SchemaProvider = ({ children }: { children: ReactNode }) => {
  const { url } = useRequestContext().graphQL;
  const [sdl, setSdl] = useState<string>("");
  const [isChanged, setIsChanged] = useState(false);
  const [schema, setSchema] = useState<DocumentationQuery>();
  const [isLoading, setIsLoading] = useState(false);
  const { setMessage } = useAlertContext();

  useEffect(() => {
    if (url && !isChanged) {
      setSdl(`${url}?sdl`);
    } else {
      if (!isChanged) {
        setSdl("");
      }
    }
  }, [isChanged, url]);

  useEffect(() => {
    if (sdl) {
      setIsLoading(true);
      fetch(sdl, {
        method: "POST",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify({ query: getIntrospectionQuery() }),
      })
        .then((res) => {
          return res.json();
        })
        .then((res) => setSchema(res))
        .catch(() => {
          setMessage(
            "Documentation was not found. Either change API URL or try to input the documentation address by hand."
          );
          setSchema(undefined);
        })
        .finally(() => {
          setIsLoading(false);
        });
    }
  }, [setMessage, sdl]);
  return (
    <SchemaContext.Provider
      value={{ isLoading, setSchema, schema, setIsChanged, sdl, setSdl }}
    >
      {children}
    </SchemaContext.Provider>
  );
};

export default SchemaProvider;
