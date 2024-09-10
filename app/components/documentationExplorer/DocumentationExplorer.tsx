import { useAsyncError, useAsyncValue } from "@remix-run/react";
import { IntrospectionObjectType } from "graphql";
import { DocumentationQuery } from "~/types/types";
import classes from "./documentationExplorer.module.scss";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Breadcrumbs,
  Button,
  IconButton,
  Stack,
  Typography,
} from "@mui/material";
import { useEffect, useState } from "react";
import ExplorerList from "../explorerList/ExplorerList";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import { useAlertContext } from "~/context/alertContext";

const defineDocsCurrentHeadlint = (pathSegments: string[]) => {
  return (
    (pathSegments.length === 1 && "Root Types") ||
    (["Query", "Mutations"].includes(pathSegments[pathSegments.length - 1]) &&
      "Fields")
  );
};

const DocumentationExplorer = () => {
  const schema = (useAsyncValue() as DocumentationQuery)?.data?.__schema;
  const { types } = schema || { types: [] };
  const { setMessage } = useAlertContext();
  const [pathSegments, setPathSegments] = useState<
    { type: string; name: string }[]
  >([{ type: "Root", name: "Root" }]);
  useEffect(() => {
    if (!schema) {
      setMessage("Documentation wasn't fetched");
    }
  }, []);
  const [isOpen, setisOpen] = useState(false);
  if (!schema) return;
  return (
    <div className={classes.docsContainer}>
      <Accordion sx={{ boxShadow: "none", border: "none", width: "100%" }}>
        <AccordionSummary onClick={() => setisOpen((prev) => !prev)}>
          {" "}
          <Typography variant="h4">Documentation</Typography>
          <IconButton>
            {isOpen ? <ExpandLessIcon /> : <ExpandMoreIcon />}
          </IconButton>
        </AccordionSummary>
        <AccordionDetails>
          <Stack className="documentationPath">
            <Breadcrumbs separator=">">
              {pathSegments.map((segment, index) => (
                <Button
                  key={index + segment.name}
                  onClick={() =>
                    setPathSegments((prev) =>
                      prev.slice(
                        0,
                        prev.findIndex((segm) => segm === segment) + 1
                      )
                    )
                  }
                >
                  {segment.name}
                </Button>
              ))}
            </Breadcrumbs>
          </Stack>
          <Stack className={classes.documentationFieldsBlock}>
            <Typography variant="h6" sx={{ fontSize: "16px" }}>
              {defineDocsCurrentHeadlint(
                pathSegments.map((segment) => segment.name)
              )}
            </Typography>
          </Stack>
          <ExplorerList
            types={types as IntrospectionObjectType[]}
            pathSegments={pathSegments}
            setPathSegments={setPathSegments}
          />
        </AccordionDetails>
      </Accordion>
    </div>
  );
};

export default DocumentationExplorer;
