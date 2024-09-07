import { IRow } from "~/types/types";

export const defaultMethods = [
  "GET",
  "POST",
  "DELETE",
  "PUT",
  "PATCH",
  "HEAD",
  "OPTIONS",
];

export const defaultKeyValuePair: IRow = {
  key: "",
  value: "",
}

export const defaultRestClientResponse = {
  body: "",
  url: "",
  method: "GET",
}
