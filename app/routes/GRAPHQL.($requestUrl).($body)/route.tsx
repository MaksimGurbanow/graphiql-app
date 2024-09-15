import UrlInput from "../../components/urlInput/UrlInput";
import classes from "./graphiql.module.scss";
import { Button, CircularProgress, Typography } from "@mui/material";
import { useContext, useEffect, useMemo, useState } from "react";
import SwitchEditorList from "../../components/switchEditorList/SwitchEditorList";
import BodyEditor from "../../components/bodyEditor/BodyEditor";
import { useRequestContext } from "../../context/RequestContext";
import TableEditor from "../../components/headersEditor/TableEditor";
import { json, Navigate, useLoaderData, useNavigate } from "@remix-run/react";
import DocumentationExplorer from "../../components/documentationExplorer/DocumentationExplorer";
import { LoaderFunctionArgs } from "@remix-run/node";
import Response from "../../components/response/Response";
import { updatedRows } from "../../utils/updatedRows";
import { useSchemaContext } from "../../context/SchemaContext";
import { useTranslation } from "react-i18next";
import {
  base64ToString,
  stringToBase64,
} from "../../utils/encodeDecodeStrings";
import { IsLogedInContext } from "../../context/loginContext";

export async function loader({ params, request }: LoaderFunctionArgs) {
  const { requestUrl, body } = params;
  const decodedBody = base64ToString(body || "");
  const formatedURL = base64ToString(requestUrl || "");
  const headers = Object.fromEntries(
    new URL(request.url).searchParams.entries(),
  );
  const metadata = {
    body: decodedBody,
    url: formatedURL,
    headers: Object.entries(headers).map(([key, value]) => ({
      key,
      value,
    })),
  };
  try {
    const queryResponse = await fetch(formatedURL, {
      method: "POST",
      headers: { ...headers, "Content-Type": "application/json" },
      body: decodedBody,
    });
    const { status, statusText } = queryResponse;
    const queryText = await queryResponse.text();

    return json({ ...metadata, response: queryText, status, statusText });
  } catch (error) {
    return json({
      ...metadata,
      response: "",
      status: 404,
      statusText: "Not Found",
    });
  }
}

const GraphiQL = () => {
  const { t } = useTranslation();
  const {
    graphQL: { headers, query, response, url, variables },
    setGraphql,
    setIsActive,
  } = useRequestContext();

  const editors = useMemo(
    () => [
      { key: "headers", label: t("graphiql.headers") },
      { key: "query", label: t("graphiql.query") },
      { key: "variables", label: t("graphiql.variables") },
    ],
    [t],
  );

  const [activeEditor, setActiveEditor] = useState("headers");
  const data = useLoaderData<typeof loader>();
  const [bodyMode, setBodyMode] = useState("JSON");
  const { isLoading, schema } = useSchemaContext();

  useEffect(() => {
    setIsActive(true);
    return () => setIsActive(false);
  }, [setIsActive]);

  useEffect(() => {
    const { query, variables } = JSON.parse(
      data.body || '{ "query": "", "variables": {} }',
    );
    setGraphql((prev) => ({
      ...prev,
      url: data.url,
      query,
      headers: data.headers,
      response: data.response,
      variables: variables,
    }));
  }, [data.body, data.headers, data.response, data.url, setGraphql]);

  const variablesArray = useMemo(
    () => Object.entries(variables).map(([key, value]) => ({ key, value })),
    [variables],
  );

  const navigate = useNavigate();
  const [isLogedIn] = useContext(IsLogedInContext);

  const handleSearchClick = () => {
    const sentURL = `/GRAPHQL/${stringToBase64(url)}${
      query ? `/${stringToBase64(JSON.stringify({ query, variables }))}` : ""
    }?${headers
      .filter(({ key, value }) => key && value)
      .map(
        ({ key, value }) =>
          `${encodeURIComponent(key)}=${encodeURIComponent(value)}`,
      )
      .join("&")}`;
    navigate(sentURL);
    localStorage.setItem(
      "history",
      (localStorage.getItem("history") || "")
        .split(",")
        .concat(sentURL)
        .join(","),
    );
  };

  return (
    <main className={classes.graphiqlPage} data-testid="graphql-page">
      {!isLogedIn && <Navigate to="/" replace={true} />}
      <div className={classes.urlSendWrapper}>
        <div className={classes.urlWrapper}>
          <Typography variant="h5">{t("graphiql.urlLabel")}</Typography>
          <UrlInput mode="graphQL" testId="url-input" />
        </div>
        <Button
          variant="contained"
          sx={{ padding: "8px", flex: 1 }}
          onClick={() => handleSearchClick()}
        >
          {t("graphiql.sendButton")}
        </Button>
      </div>
      <div className={classes.urlWrapper}>
        <Typography variant="h5">{t("graphiql.sdlLabel")}</Typography>
        <UrlInput mode="graphQlSdl" testId="url-sdl-input" />
      </div>
      <SwitchEditorList
        editors={editors.map((editor) => editor.label)}
        setActiveEditor={(label) => {
          const selected = editors.find((editor) => editor.label === label);
          if (selected) setActiveEditor(selected.key);
        }}
        activeEditor={
          editors.find((editor) => editor.key === activeEditor)?.label || ""
        }
      />
      {activeEditor === "query" && (
        <BodyEditor
          body={query}
          setBody={(query: string) =>
            setGraphql((prev) => ({ ...prev, query }))
          }
          bodyMode={bodyMode}
          setBodyMode={setBodyMode}
          testId="body-editor"
        />
      )}
      {activeEditor === "headers" && (
        <TableEditor
          rows={headers}
          setRows={(isLast, id, row) =>
            setGraphql((prev) => {
              const newHeaders = updatedRows(isLast, prev.headers, row, id);
              return { ...prev, headers: newHeaders };
            })
          }
          headerText={t("graphiql.headers")}
          testId="header-editor"
        />
      )}
      {activeEditor === "variables" && (
        <TableEditor
          rows={variablesArray}
          setRows={(isLast, id, row) => {
            setGraphql((prev) => {
              const newVariables = Object.fromEntries(
                updatedRows(isLast, variablesArray, row, id).map((row) => [
                  row.key,
                  row.value,
                ]),
              );
              return { ...prev, variables: newVariables };
            });
          }}
          headerText={t("graphiql.variables")}
          testId="header-variables"
        />
      )}
      {isLoading && <CircularProgress />}
      {!isLoading && schema && <DocumentationExplorer />}
      {response && (
        <Response
          data={response}
          status={data.status}
          statusText={data.statusText}
        />
      )}
    </main>
  );
};

export default GraphiQL;
