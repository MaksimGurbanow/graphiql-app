import { defaultKeyValuePair } from "lib/constants";
import { IRow } from "~/types/types";

export const updatedRows = (
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
