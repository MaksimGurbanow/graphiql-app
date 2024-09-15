import { updatedRows } from "../app/utils/updatedRows";
import { IRow } from "../app/types/types";
import { defaultKeyValuePair } from "../lib/constants";

describe("updatedRows", () => {
  it("should add defaultKeyValuePair if row is not provided", () => {
    const prevRows: IRow[] = [{ key: "key1", value: "value1" }];
    const result = updatedRows(false, prevRows, undefined, 0);

    expect(result).toEqual([defaultKeyValuePair]);
  });

  it("should update the specified row when isLast is false", () => {
    const prevRows: IRow[] = [{ key: "key1", value: "value1" }];
    const newRow: IRow = { key: "key2", value: "value2" };
    const result = updatedRows(false, prevRows, newRow, 0);

    expect(result).toEqual([newRow]);
  });

  it("should add defaultKeyValuePair if row is not provided", () => {
    const prevRows: IRow[] = [{ key: "key1", value: "value1" }];
    const result = updatedRows(false, prevRows, undefined, 0);

    expect(result).toEqual([defaultKeyValuePair]);
  });

  it("should not modify the original array", () => {
    const prevRows: IRow[] = [{ key: "key1", value: "value1" }];
    const result = updatedRows(true, prevRows);

    expect(result).not.toBe(prevRows);
    expect(prevRows).toEqual([{ key: "key1", value: "value1" }]);
  });
});
