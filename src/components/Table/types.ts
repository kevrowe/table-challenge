export type DataType<T> = {
  id: number;
  selected?: boolean;
} & T;

export type SelectionType = "multiple" | "single" | "none";

export type HeaderItem<T> = {
  name: string;
  prop: keyof T;
};