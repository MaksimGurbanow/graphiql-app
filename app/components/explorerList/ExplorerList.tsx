import { IntrospectionObjectType, IntrospectionScalarType } from "graphql";
import classes from "./explorerList.module.scss";
import { Dispatch, SetStateAction } from "react";
import { Oftype } from "~/types/types";

const ExplorerList = ({
  pathSegments,
  setPathSegments,
  types,
}: {
  pathSegments: { name: string; type: string }[];
  types: (IntrospectionObjectType | IntrospectionScalarType)[];
  setPathSegments: Dispatch<SetStateAction<{ name: string; type: string }[]>>;
}) => {
  const lastSegment = pathSegments[pathSegments.length - 1];

  const lastType = types.find((type) => type.name === lastSegment.type);

  const isObject = lastType?.kind === "OBJECT";
  const isScalar = lastType?.kind === "SCALAR";

  const nestedSearch = (type: unknown): string => {
    let result: string = "";
    let ofType = (type as Oftype)?.ofType;
    let i = 1000;

    while (ofType && i > 0) {
      if (ofType.name) {
        result = ofType.name;
      }
      ofType = ofType.ofType;
      i--;
    }

    return result;
  };

  return (
    <div className={classes.documentationFieldsWrapper}>
      {(pathSegments.length === 1 && (
        <>
          <button
            className={classes.documentationFieldsItem}
            onClick={() =>
              setPathSegments((prev) => [
                ...prev,
                { type: "Query", name: "query" },
              ])
            }
          >
            query: Query
          </button>
          <button
            className={classes.documentationFieldsItem}
            onClick={() =>
              setPathSegments((prev) => [
                ...prev,
                { type: "Mutation", name: "mutation" },
              ])
            }
          >
            mutation: Mutation
          </button>
        </>
      )) ||
        (["Query", "Mutation"].includes(lastSegment.type) &&
          isObject &&
          lastType?.fields.map((field) => {
            const fieldType = field.type as Oftype;
            const isList = fieldType.kind === "LIST";
            const type =
              (isList ? (fieldType.ofType as Oftype).name : fieldType.name) ||
              "";
            return (
              <button
                className={classes.documentationFieldsItem}
                key={field.name}
                onClick={() =>
                  setPathSegments((prev) => [
                    ...prev,
                    {
                      name: field.name,
                      type,
                    },
                  ])
                }
              >
                {`${field.name}: ${isList ? `${type}[]` : type}`}
              </button>
            );
          })) ||
        (pathSegments.length > 2 &&
          isObject &&
          lastType?.fields.map((field) => {
            const isList = field.type.kind === "LIST";
            const type = nestedSearch(field.type);
            return (
              <button
                className={classes.documentationFieldsItem}
                key={field.name}
                onClick={() =>
                  setPathSegments((prev) => [
                    ...prev,
                    { name: field.name, type },
                  ])
                }
              >
                {`${field.name}: ${isList ? `${type}[]` : type}`}
              </button>
            );
          })) ||
        (isScalar && lastType.description)}
    </div>
  );
};

export default ExplorerList;
