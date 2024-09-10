import { useEffect, useState } from "react";
import classes from "./rest.module.scss";
import Response from "~/components/response/Response";
import { Button } from "@mui/material";
import BodyEditor from "~/components/bodyEditor/BodyEditor";
import TableEditor from "~/components/headersEditor/TableEditor";
import { useRequestContext } from "~/context/RequestContext";
import { LoaderFunctionArgs, TypedResponse } from "@remix-run/node";
import { json, useLoaderData, useNavigate } from "@remix-run/react";
import format from "html-format";
import ErrorMessage from "~/components/errorMessage/ErrorMessage";
import MethodSelector from "~/components/methodSelector/MethodSelector";
import SwitchEditorList from "~/components/switchEditorList/SwitchEditorList";
import UrlInput from "~/components/urlInput/UrlInput";
import { updatedRows } from "~/utils/updatedRows";

export async function loader({ params, request }: LoaderFunctionArgs): Promise<
  TypedResponse<{
    response?: string;
    url: string;
    method: string;
    error?: string;
    body: string;
    status?: number;
    statusText?: string;
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
      const { status, statusText } = response;
      const responseText = await response.text();
      try {
        JSON.parse(responseText);
        return json({
          response: responseText,
          ...metadata,
          status,
          statusText,
        });
      } catch (error) {
        return json({
          response: format(
            `\
          ${responseText}
          `,
            " ".repeat(4)
          ),
          ...metadata,
          status,
          statusText,
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
  const [activeEditor, setActiveEditor] = useState<string>("Headers");
  const editors: string[] = ["Params", "Headers", "Body"];
  const data = useLoaderData<typeof loader>();
  const navigate = useNavigate();

  useEffect(() => {
    setRest({ ...data, params: [] });
  }, [data, setRest]);

  return (
    <div className={classes.restPage}>
      <div className={classes.requestBlock}>
        <div className={classes.urlMethodWrapper}>
          <div className={classes.urlMethod}>
            <MethodSelector />
            <hr className={classes.requestDivider} />
            <UrlInput mode="rest" />
          </div>
          <Button
            variant="contained"
            sx={{ padding: "8px", flex: 1 }}
            onClick={() =>
              navigate(
                `/${method}/${btoa(url).replace(/\//g, "_")}${
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
        <SwitchEditorList
          editors={editors}
          setActiveEditor={(v) => setActiveEditor(v)}
          activeEditor={activeEditor}
        />
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
      {data.response && <Response data={data.response} status={data.status} />}
      {data.error && <ErrorMessage message={data.error} />}
    </div>
  );
};

export default Rest;
