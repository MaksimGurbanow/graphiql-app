import { defaultKeyValuePair } from "../../lib/constants";
import { IRow } from "../types/types";

// Updated function to handle undefined id
export const updatedRows = (
  isLast: boolean,
  prev: IRow[],
  row?: IRow,
  id?: number,
) => {
  const newArray = [...prev];

  // Add defaultKeyValuePair at the end if isLast is true
  if (isLast) {
    newArray.push(defaultKeyValuePair);
  }

  // Update row only if id is defined
  if (id !== undefined) {
    newArray[id] = row || defaultKeyValuePair;
  }

  return newArray;
};
