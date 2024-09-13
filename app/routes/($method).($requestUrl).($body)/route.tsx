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
import { IRow } from "~/types/types";
import { useTranslation } from "react-i18next";

export async function loader({ params, request }: LoaderFunctionArgs): Promise<
  TypedResponse<{
    response?: string;
    url: string;
    method: string;
    error?: string;
    body: string;
    status?: number;
    variables: IRow[];
    statusText?: string;
    headers: IRow[];
  }>
> {
  const { method, requestUrl, body } = params;
  const decodedBody = atob(body || "") || "";
  const formatedURL = atob(requestUrl?.replace(/_/g, "/") || "");
  const headers = Object.fromEntries(
    new URL(request.url).searchParams.entries()
  );
  let parsedBody: { body: string; variables: IRow[] };
  try {
    parsedBody = JSON.parse(decodedBody);
  } catch (error) {
    parsedBody = { body: "", variables: [] };
  }

  const variableMap = new Map(
    parsedBody.variables.map(({ key, value }) => [key, value])
  );

  const formatedBody = parsedBody.body.replace(/{{(.*?)}}/g, (match, p1) => {
    return variableMap.get(p1) || match;
  });
  console.log(parsedBody);
  const metadata = {
    url: formatedURL || "",
    method: method || "GET",
    body: parsedBody.body,
    variables: parsedBody.variables,
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
            : formatedBody,
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
    rest: { url, params, headers, body, method, variables },
    setRest,
  } = useRequestContext();
  const [activeEditor, setActiveEditor] = useState<string>("Headers");
  const editors: string[] = ["Params", "Headers", "Body", "Variables"];
  const data = useLoaderData<typeof loader>();
  const navigate = useNavigate();
  const [bodyMode, setBodyMode] = useState("JSON");
  useEffect(() => {
    const restoredBody = data.body.replace(/"{{.*?}}"/g, (match) => {
      return match.slice(1, match.length - 1);
    });
    setRest((prev) => ({ ...prev, ...data, body: restoredBody }));
  }, [data, setRest]);
  const { t } = useTranslation();

  const handleSearchClick = () => {
    const params = new URLSearchParams();
    headers
      .filter(({ key, value }) => key && value)
      .forEach(({ key, value }) => {
        params.append(key, value);
      });
    const formatedBody =
      body.replace(/{{(.*?)}}/g, (match) => {
        return `"${match}"`;
      }) || "";
    navigate(
      `/${method}/${btoa(url).replace(/\//g, "_")}${
        formatedBody || variables.length
          ? `/${btoa(
              JSON.stringify({
                body: formatedBody,
                variables: variables,
              })
            )}`
          : ""
      }?${params.toString()}`
    );
  };

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
            onClick={() => handleSearchClick()}
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
            bodyMode={bodyMode}
            setBodyMode={setBodyMode}
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
        {activeEditor === "Variables" && (
          <TableEditor
            rows={variables}
            setRows={(isLast, id, row) => {
              setRest((prev) => {
                const newVariables = updatedRows(isLast, prev.headers, row, id);
                return { ...prev, variables: newVariables };
              });
            }}
            headerText="Variables"
          />
        )}
      </div>
      {data.response && (
        <Response data={"data.response"} status={data.status} />
      )}
      {data.error && <ErrorMessage message={data.error} />}
    </div>
  );
};

export default Rest;
