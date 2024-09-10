import UrlInput from "~/components/urlInput/UrlInput";
import classes from "./graphiql.module.scss";
import { Button, CircularProgress, Typography } from "@mui/material";
import { Suspense, useEffect, useMemo, useState } from "react";
import SwitchEditorList from "~/components/switchEditorList/SwitchEditorList";
import BodyEditor from "~/components/bodyEditor/BodyEditor";
import { useRequestContext } from "~/context/RequestContext";
import TableEditor from "~/components/headersEditor/TableEditor";
import { getIntrospectionQuery } from "graphql";
import { Await, defer, useLoaderData, useNavigate } from "@remix-run/react";
import DocumentationExplorer from "~/components/documentationExplorer/DocumentationExplorer";
import { LoaderFunctionArgs } from "@remix-run/node";
import Response from "~/components/response/Response";
import { updatedRows } from "~/utils/updatedRows";

export async function loader({ params, request }: LoaderFunctionArgs) {
  const { requestUrl, body } = params;
  const decodedBody = atob(body || "");
  const formatedURL = atob(requestUrl?.replace(/_/g, "/") || "");
  const headers = Object.fromEntries(
    new URL(request.url).searchParams.entries()
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
    const queryText = await queryResponse.text();
    const schema = fetch(formatedURL, {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({ query: getIntrospectionQuery() }),
    })
      .then((res) => {
        return res.json();
      })
      .catch(() => "");

    return defer({ ...metadata, schema, response: queryText });
  } catch (error) {
    return defer({ ...metadata, schema: "", response: "" });
  }
}

const GraphiQL = () => {
  const {
    graphQL: { headers, query, response, url },
    setGraphql,
  } = useRequestContext();
  const editors = useMemo(() => ["headers", "query"], []);
  const [activeEditor, setActiveEditor] = useState("headers");
  const data = useLoaderData<typeof loader>();

  useEffect(() => {
    const { query, variables } = JSON.parse(data.body);
    setGraphql((prev) => ({
      ...prev,
      url: data.url,
      query,
      headers: data.headers,
      sdl: data.url + "?sdl",
      response: data.response,
      variables,
    }));
  }, [data.body, data.headers, data.response, data.url, setGraphql]);

  const navigate = useNavigate();

  return (
    <main className={classes.graphiqlPage}>
      <div className={classes.urlSendWrapper}>
        <div className={classes.urlWrapper}>
          <Typography variant="h5">URL:</Typography>
          <UrlInput mode="graphQL" />
        </div>
        <Button
          variant="contained"
          sx={{ padding: "8px", flex: 1 }}
          onClick={() =>
            navigate(
              `/GRAPHQL/${btoa(url).replace(/\//g, "_")}${
                query ? `/${btoa(JSON.stringify({ query }))}` : ""
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
      <div className={classes.urlWrapper}>
        <Typography variant="h5">SDL:</Typography>
        <UrlInput mode="graphQlSdl" />
      </div>
      <SwitchEditorList
        editors={editors}
        setActiveEditor={setActiveEditor}
        activeEditor={activeEditor}
      />
      {activeEditor === "query" && (
        <BodyEditor
          body={query}
          setBody={(query: string) =>
            setGraphql((prev) => ({ ...prev, query }))
          }
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
          headerText="Headers"
        />
      )}
      <Suspense fallback={<CircularProgress />}>
        <Await resolve={data.schema}>
          <DocumentationExplorer />
        </Await>
      </Suspense>
      {response && <Response data={response} />}
    </main>
  );
};

export default GraphiQL;
