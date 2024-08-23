import { useState } from "react";
import classes from "./rest.module.scss";
import Response from "~/components/response/Response";
import { defaultMethods } from "lib/constants";
import HeadersEditor from "~/components/headersEditor/HeadersEditor";
import { ActiveEditor, IHeader } from "~/types/types";
import { Button } from "@mui/material";
import BodyEditor from "~/components/bodyEditor/BodyEditor";
import ParamsEditor from "~/components/paramsEditor/ParamsEditor";

export interface RestRequestForm {
  method: Request["method"];
}

const Rest = () => {
  const [options, setOptions] = useState(defaultMethods);
  const [methodValue, setMethodValue] = useState("");
  const [path, setPath] = useState("");
  const [isOpened, setIsOpened] = useState(false);
  const [body, setBody] = useState("");
  const [activeEditor, setActiveEditor] = useState<ActiveEditor>("Headers");
  const editors: ActiveEditor[] = ["Params", "Headers", "Body"];
  const [headers, setHeaders] = useState<IHeader[]>([
    {
      key: "",
      value: "",
      description: "",
    },
  ]);
  return (
    <div className={classes.restPage}>
      <div className={classes.requestBlock}>
        <div className={classes.urlMethodWrapper}>
          <div className={classes.urlMethod}>
            <div className={`${classes.methodBlock} ${isOpened && "focused"}`}>
              <input
                name="method"
                className={classes.methodInput}
                onFocus={() => setIsOpened(true)}
                onBlur={() => setIsOpened(false)}
                id="method"
                value={methodValue}
                onInput={(e) =>
                  setOptions(() => [
                    ...defaultMethods,
                    (e.target as HTMLInputElement).value.toUpperCase(),
                  ])
                }
                onChange={({ target }) =>
                  setMethodValue(target.value.toUpperCase())
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
                      setMethodValue(option);
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
                value={path}
                onInput={(e) => {
                  setPath((e.target as HTMLInputElement).value);
                }}
                onPaste={(e) => {
                  e.preventDefault();
                  const pasteData = e.clipboardData.getData("text");
                  setPath((prev) => prev + pasteData);
                }}
              />
            </div>
          </div>
          <Button variant="contained" sx={{ padding: "8px", flex: 1 }}>
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
          <BodyEditor body={body} setBody={setBody} />
        )}
        {activeEditor === "Headers" && (
          <HeadersEditor headers={headers} setHeaders={setHeaders} />
        )}
        {activeEditor === "Params" && <ParamsEditor />}
      </div>
      <Response />
    </div>
  );
};

export default Rest;
