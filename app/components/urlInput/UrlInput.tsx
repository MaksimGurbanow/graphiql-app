import { useRequestContext } from "~/context/RequestContext";
import classes from "./urlInput.module.scss";

export interface UrlInputProps {
  mode: "rest" | "graphQL" | "graphQlSdl";
}

const UrlInput = ({ mode }: UrlInputProps) => {
  const { rest, setRest, graphQL, setGraphql } = useRequestContext();

  const updateState = (value: string) => {
    switch (mode) {
      case "rest":
        setRest((prev) => ({
          ...prev,
          url: value,
        }));
        break;
      case "graphQL":
        setGraphql((prev) => ({
          ...prev,
          url: value,
        }));
        break;
      case "graphQlSdl":
        setGraphql((prev) => ({
          ...prev,
          sdl: value,
        }));
        break;
    }
  };
  return (
    <div className={classes.urlBlock}>
      <input
        className={classes.urlInput}
        value={
          (mode === "rest" && rest.url) ||
          (mode === "graphQL" && graphQL.url) ||
          graphQL.sdl
        }
        onInput={(e) => {
          updateState((e.target as HTMLInputElement).value);
        }}
        onPaste={(e) => {
          e.preventDefault();
          const pasteData = e.clipboardData.getData("text");
          updateState(pasteData);
        }}
      />
    </div>
  );
};

export default UrlInput;
