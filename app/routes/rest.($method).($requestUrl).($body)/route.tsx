import { useEffect, useState } from "react";
import classes from "./rest.module.scss";
import Response from "~/components/response/Response";
import { defaultKeyValuePair, defaultMethods } from "lib/constants";
import { ActiveEditor, IRow } from "~/types/types";
import { Button } from "@mui/material";
import BodyEditor from "~/components/bodyEditor/BodyEditor";
import TableEditor from "~/components/headersEditor/TableEditor";
import { useRequestContext } from "~/context/RequestContext";
import { LoaderFunctionArgs, TypedResponse } from "@remix-run/node";
import { json, useLoaderData, useNavigate } from "@remix-run/react";
import format from "html-format";
import ErrorMessage from "~/components/errorMessage/ErrorMessage";

export interface RestRequestForm {
  method: Request["method"];
}

export async function loader({ params, request }: LoaderFunctionArgs): Promise<
  TypedResponse<{
    response?: string;
    url: string;
    method: string;
    error?: string;
    body: string;
    headers: { key: string; value: string }[];
  }>
> {
  const { method, requestUrl, body } = params;
  const decodedBody = atob(body || "") || "";
  const formatedURL = atob(requestUrl?.replace(/_/g, "/") || "");
  const headers = Object.fromEntries(
    new URL(request.url).searchParams.entries()
  );
  const metadata = {
    url: formatedURL || "",
    method: method || "GET",
    body: decodedBody,
    headers: Object.entries(headers).map(([key, value]) => ({
      key,
      value,
    })),
  };
  try {
    if (formatedURL && method) {
      const response = await fetch(formatedURL, {
        method,
        headers,
        body:
          method && ["GET", "HEAD"].includes(method as string)
            ? null
            : decodedBody,
      });
      const responseText = await response.text();
      try {
        JSON.parse(responseText);
        return json({ response: responseText, ...metadata });
      } catch (error) {
        return json({
          response: format(
            `\
          ${responseText}
          `,
            " ".repeat(4)
          ),
          ...metadata,
        });
      }
    }
    return json(metadata);
  } catch (error) {
    return json({ ...metadata, error: "Some error hapened" });
  }
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
  const data = useLoaderData<typeof loader>();

  const updatedRows = (
    isLast: boolean,
    prev: IRow[],
    row?: IRow,
    id?: number
  ) => {
    const newArray = [...prev];
    if (isLast) {
      newArray.push(defaultKeyValuePair);
    }
    newArray[id as number] = row || defaultKeyValuePair;

    return newArray;
  };
  const navigate = useNavigate();

  useEffect(() => {
    console.log(data);
    setRest({ ...data, params: [] });
  }, []);

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
      {data.response && <Response data={data.response} />}
      {data.error && <ErrorMessage message={data.error} />}
    </div>
  );
};

export default Rest;
