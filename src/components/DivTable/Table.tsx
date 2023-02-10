import { ReactElement, PropsWithChildren, useState, useEffect } from "react";
import styled from "styled-components";
import { TableHeaderCell } from "./TableHeaderCell";
import { StyledProps } from "../../styles/theme";
import { TableCell } from "./TableCell";
import { TableHeader } from "./TableHeader";
import { TableRow } from "./TableRow";
import { SortDirection } from "./TableHeaderSortButton";
import { RadioButton } from "../Input/RadioButton";

const TableStyle = styled.div`
  display: grid;
  grid-template-columns: ${({ cols }: { cols: number }) =>
    Array(cols)
      .fill(0)
      .map(() => `auto `)
      .join("")};
  width: 100%;
  border-radius: ${({ theme }: StyledProps) => theme.borderRadius};
  box-shadow: 0 3px 8px 0 rgba(0, 0, 0, 0.12);
  overflow: hidden;
  font-size: 10px;
  font-family: sans-serif;

  > * {
    box-sizing: border-box;
  }
`;

export type HeaderItem<T> = {
  displayName: string;
  propertyName: keyof DataItem<T>;
};

type IdType = string | number;

type DataType = {
  id: IdType;
};

type DataItem<T> = {
  selected: boolean;
} & T;

type SelectionType = "single" | "none";

type Props<T> = {
  cols: number;
  data: T[];
  headers: HeaderItem<T>[];
  selectionType?: SelectionType;
} & PropsWithChildren &
  React.HTMLAttributes<HTMLElement>;

export function Table<T extends DataType>({
  data: inputData,
  headers: headerProp,
  cols,
  selectionType,
  ...restProps
}: Props<T>): ReactElement {
  const [data, setData] = useState(inputData);
  const [sortBy, setSortBy] = useState("id" as keyof T);
  const [sortDirection, setSortDirection] = useState("asc");
  const [headers, setHeaders] = useState(headerProp);
  const [selected, setSelected] = useState(-1 as IdType);

  const onHeaderClick = (newSortBy: keyof T) => {
    let sortDir = sortDirection;
    if (sortBy === newSortBy) {
      switch (sortDirection) {
        case "asc":
          setSortDirection("desc");
          sortDir = "desc";
          break;
        default:
          setSortDirection("asc");
          sortDir = "asc";
          break;
      }
    } else {
      setSortBy(newSortBy as keyof T);
      setSortDirection("asc");
      sortDir = "asc";
    }

    if (sortDir === "desc") {
      setData(data.sort((a, b) => (a[newSortBy] < b[newSortBy] ? 1 : -1)));
    } else {
      setData(data.sort((a, b) => (a[newSortBy] > b[newSortBy] ? 1 : -1)));
    }
  };

  useEffect(() => {
    if (
      selectionType === "single" &&
      !headers.find((h: HeaderItem<T>) => h.propertyName === "selected")
    ) {
      setHeaders([{ displayName: "", propertyName: "selected" }, ...headers]);
    } else {
      setHeaders(headers.filter((h) => h.propertyName !== "selected"));
    }
  }, [selectionType]);

  return (
    <TableStyle
      role="table"
      cols={selectionType === "single" ? cols + 1 : cols}
      {...restProps}
    >
      <TableHeader>
        {headers.map((h) => (
          <TableHeaderCell
            key={h.propertyName.toString()}
            onClick={() =>
              h.propertyName === "selected"
                ? null
                : onHeaderClick(h.propertyName)
            }
            active={sortBy === h.propertyName}
            sortDirection={sortDirection as SortDirection}
            sortable={h.propertyName !== "selected"}
          >
            {h.displayName}
          </TableHeaderCell>
        ))}
      </TableHeader>
      {data.map((d) => (
        <TableRow
          key={d.id}
          onClick={() => setSelected(d.id)}
          active={selected === d.id}
        >
          {headers.map(({ propertyName }) => (
            <TableCell key={`${d.id}-${propertyName.toString()}`}>
              {propertyName === "selected" ? (
                <RadioButton name="selected-row" checked={selected === d.id} />
              ) : (
                `${d[propertyName]}`
              )}
            </TableCell>
          ))}
        </TableRow>
      ))}
    </TableStyle>
  );
}
