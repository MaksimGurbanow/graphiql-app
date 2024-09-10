import { IntrospectionQuery } from "graphql";

export interface IRow {
  value: string;
  key: string;
}

export interface IParam extends IRow {}
export interface IHeader extends IRow {}

export type ActiveEditor = "Body" | "Params" | "Headers";

export interface DocumentationQuery {
  data: IntrospectionQuery;
}

export interface Oftype {
  name: string | null;
  kind: string | null;
  ofType: Oftype | null;
}
