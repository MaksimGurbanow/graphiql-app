import { useState } from "react";
import classes from "./rest.module.scss";
import Response from "../../components/response/Response";
import { defaultMethods } from "../../../lib/constants";
import { ActiveEditor, IRow } from "~/types/types";
import { Button } from "@mui/material";
import BodyEditor from "../../components/bodyEditor/BodyEditor";
import TableEditor from "../../components/headersEditor/TableEditor";
import { useRequestContext } from "../../context/RequestContext";
import { LoaderFunctionArgs } from "@remix-run/node";
import { useNavigate } from "@remix-run/react";

export interface RestRequestForm {
  method: Request["method"];
}

export async function loader({ params, request }: LoaderFunctionArgs) {
  const { method, requestUrl, body } = params;

  const formatedURL = atob(requestUrl?.replace(/_/g, "/") || "");
  const headers = new URL(request.url).searchParams;
  const parsedBody = JSON.parse(atob(body || "") || "{}");

  console.log(parsedBody, headers, formatedURL, method);
  return null;
}

const Rest = () => {
  const {
    rest: { url, params, headers, body, method },
    setRest,
  } = useRequestContext();
  const [options, setOptions] = useState(defaultMethods);
  const [isOpened, setIsOpened] = useState(false);
  const [activeEditor, setActiveEditor] = useState<ActiveEditor>("Headers");
  const editors: ActiveEditor[] = ["Params", "Headers", "Body"];

  const updatedRows = (
    isLast: boolean,
    prev: IRow[],
    row?: IRow,
    id?: number
  ) => {
    const newArray = [...prev];
    if (isLast) {
      newArray.push({ key: "", value: "", description: "" });
    }
    newArray[id as number] = row || {
      key: "",
      value: "",
      description: "",
    };

    return newArray;
  };
  const navigate = useNavigate();
  return (
    <div className={classes.restPage}>
      <div className={classes.requestBlock}>
        <div className={classes.urlMethodWrapper}>
          <div className={classes.urlMethod}>
            <div className={`${classes.methodBlock} ${isOpened && "focused"}`}>
              <input
                name="method"
                className={classes.methodInput}
                autoComplete="off"
                onFocus={() => setIsOpened(true)}
                onBlur={() => setIsOpened(false)}
                id="method"
                value={method}
                onInput={(e) =>
                  setOptions(() => [
                    ...defaultMethods,
                    (e.target as HTMLInputElement).value.toUpperCase(),
                  ])
                }
                onChange={({ target }) =>
                  setRest((prev) => ({
                    ...prev,
                    method: target.value.toUpperCase(),
                  }))
                }
              />
              <div
                className={`${classes.methodDropdownList} ${
                  isOpened ? null : classes.hidden
                }`}
              >
                {options.map((option) => (
                  <button
                    key={option}
                    className={classes.methodDropdownItem}
                    onMouseDown={(e) => {
                      e.stopPropagation();
                      setRest((prev) => ({ ...prev, method: option }));
                    }}
                  >
                    {option}
                  </button>
                ))}
                <hr className={classes.methodDropdownDivider} />
                <div className={classes.methodDropdownSuggestion}>
                  Type your own method
                </div>
              </div>
            </div>
            <hr className={classes.requestDivider} />
            <div className={classes.urlBlock}>
              <input
                className={classes.urlInput}
                value={url}
                onInput={(e) => {
                  setRest((prev) => ({
                    ...prev,
                    url: (e.target as HTMLInputElement).value,
                  }));
                }}
                onPaste={(e) => {
                  e.preventDefault();
                  const pasteData = e.clipboardData.getData("text");
                  setRest((prev) => ({ ...prev, url: pasteData }));
                }}
              />
            </div>
          </div>
          <Button
            variant="contained"
            sx={{ padding: "8px", flex: 1 }}
            onClick={() =>
              navigate(
                `/rest/${method}/${btoa(url).replace(/\//g, "_")}${
                  body ? `/${btoa(body)}` : ""
                }?${headers
                  .filter(({ key, value }) => key && value)
                  .map(
                    ({ key, value }) =>
                      `${encodeURIComponent(key)}=${encodeURIComponent(value)}`
                  )
                  .join("&")}`
              )
            }
          >
            Send
          </Button>
        </div>
        <ul className={classes.switchEditorList}>
          {editors.map((editorMode) => (
            <li
              className={`${classes.switchEditorItem} ${
                activeEditor === editorMode && classes.active
              }`}
              key={editorMode}
              onClickCapture={() => setActiveEditor(editorMode)}
            >
              {editorMode}
            </li>
          ))}
        </ul>
        {activeEditor === "Body" && (
          <BodyEditor
            body={body}
            setBody={(body) => setRest((prev) => ({ ...prev, body }))}
          />
        )}
        {activeEditor === "Headers" && (
          <TableEditor
            rows={headers}
            setRows={(isLast, id, row) =>
              setRest((prev) => {
                const newHeaders = updatedRows(isLast, prev.headers, row, id);
                console.log(isLast);
                return { ...prev, headers: newHeaders };
              })
            }
            headerText="Headers"
          />
        )}
        {activeEditor === "Params" && (
          <TableEditor
            rows={params}
            setRows={(isLast, id, row) =>
              setRest((prev) => {
                const newArray = updatedRows(isLast, prev.params, row, id);
                const filteredParams = newArray
                  .filter(({ key, value }) => key && value)
                  .map(({ key, value }) => `${key}=${value}`);
                return {
                  ...prev,
                  params: newArray,
                  url: filteredParams.length
                    ? `${prev.url.split("?")[0]}?${filteredParams.join("&")}`
                    : prev.url,
                };
              })
            }
            headerText="Parameters"
          />
        )}
      </div>
      <Response />
    </div>
  );
};

export default Rest;
