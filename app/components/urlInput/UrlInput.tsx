import {useRequestContext} from "../../context/RequestContext";
import classes from "./urlInput.module.scss";
import {useSchemaContext} from "../../context/SchemaContext";

export interface UrlInputProps {
    mode: "rest" | "graphQL" | "graphQlSdl";
    extraClass?: string;
}

const UrlInput = ({mode, extraClass}: UrlInputProps) => {
    const {rest, setRest, graphQL, setGraphql} = useRequestContext();
    const {sdl, setSdl, setIsChanged} = useSchemaContext();

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
                setSdl(value);
                setIsChanged(true);
                break;
        }
    };


    return (
        <div className={`${classes.urlBlock}  ${extraClass}`}>
            <input
                className={classes.urlInput}
                value={
                    (mode === "rest" && rest.url) ||
                    (mode === "graphQL" && graphQL.url) ||
                    sdl
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
