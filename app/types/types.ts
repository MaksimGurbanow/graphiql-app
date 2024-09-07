export interface IRow {
  value: string;
  key: string;
}

export interface IParam extends IRow {}
export interface IHeader extends IRow {}

export type ActiveEditor = "Body" | "Params" | "Headers";
