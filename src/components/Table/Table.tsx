import { useEffect, useState } from "react";
import styled from "styled-components";
import { StyledProps } from "../../styles/theme";
import { TableCell } from "./TableCell";
import { TableHeaderCell } from "./TableHeaderCell";
import {
  SortDirection,
  TableHeaderSortIconStyle,
} from "./TableHeaderSortButton";
import { DataType, HeaderItem, SelectionType } from "./types";

const THeadStyle = styled.thead<{ sortable: boolean }>`
  background-color: ${({ theme }: StyledProps) =>
    theme.palette.secondary.highlight};

  th {
    padding: ${({ theme }: StyledProps) => theme.padding};
    cursor: ${({ sortable }) => (sortable ? "pointer" : "default")};
  }

  th ${TableHeaderSortIconStyle}:before {
    border-width: 0em;
  }

  th:hover ${TableHeaderSortIconStyle}:before {
    border-width: 1em;
  }
`;

const RowStyle = styled.tr`
  background: inherit;
  position: relative;

  &:last-child:after {
    display: none;
  }

  &:after {
    content: "";
    display: block;
    width: calc(
      100% - ${({ theme }: StyledProps) => theme.padding} -
        ${({ theme }: StyledProps) => theme.padding}
    ); // Easier than duplicating padding as number and *2
    border-bottom: 1px solid
      ${({ theme }: StyledProps) => theme.palette.secondary.default};
    position: absolute;
    left: 50%;
    bottom: 0;
    transform: translateX(-50%);
  }

  &.active {
    background-color: ${({ theme }: StyledProps) =>
      theme.palette.primary.highlight};
  }
`;

const TableStyle = styled.table`
  font-family: sans-serif;
  width: 100%;
  border-spacing: 0;
  border-radius: ${({ theme }: StyledProps) => theme.borderRadius};
  overflow: hidden;
  box-shadow: 0 3px 8px 0 rgba(0, 0, 0, 0.12);

  td {
    padding: ${({ theme }: StyledProps) => theme.padding};
  }
`;

type Props<T> = {
  data: T[];
  sortable: boolean;
  selectionType: SelectionType;
  headers: HeaderItem<T>[];
  cellRenderer?: (props: CellRendererProps<T>) => JSX.Element;
};

export type CellRendererProps<T> = {
  data: DataType<T>;
  prop: keyof T | "selected";
  onSelect: (id: any) => void;
  selected: boolean;
  selectionType: SelectionType;
  index?: number;
};

const defaultCellRenderer = <T,>({
  data,
  onSelect,
  selected,
  prop,
  selectionType,
}: CellRendererProps<T>) => {
  return (
    <TableCell
      data={data}
      onSelected={onSelect}
      selected={selected}
      prop={prop}
      selectionType={selectionType}
    />
  );
};

export function Table<T extends object>({
  sortable,
  data: inputData,
  selectionType,
  headers: headerConfig,
  cellRenderer = defaultCellRenderer,
}: Props<T>) {
  const [data, setData] = useState(
    inputData.map(
      (e, i) =>
        ({
          id: i,
          ...(selectionType !== "none" ? { selected: false } : {}),
          ...e,
        } as DataType<T>)
    )
  );
  const [headers, setHeaders] = useState(
    headerConfig ?? Object.keys(data[0]).map((e) => ({ prop: e, name: e }))
  );
  const defaultSort = headers[0];
  const [sortBy, setSortBy] = useState(defaultSort.prop);
  const [sortDirection, setSortDirection] = useState("asc" as SortDirection);
  const [selected, setSelected] = useState([] as (string | number)[]);

  useEffect(() => {
    setSelected([]);

    if (selectionType !== "none") {
      setHeaders((h) => [
        { name: "", prop: "selected" as any },
        ...h.filter((hd) => hd.prop !== "selected"),
      ]);
    } else {
      setHeaders((h) => h.filter((hd) => hd.prop !== "selected"));
    }
  }, [selectionType]);

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

  const onSelect = (itemId: string | number) => {
    if (selectionType === "multiple") {
      if (selected.includes(itemId)) {
        setSelected(selected.filter((e) => e !== itemId));
      } else {
        setSelected([...selected, itemId]);
      }
    } else {
      setSelected([itemId]);
    }
  };

  return (
    <TableStyle>
      <THeadStyle sortable={sortable}>
        <tr>
          {headers.map((prop) => (
            <TableHeaderCell
              prop={prop}
              sortBy={sortBy}
              sortDirection={sortDirection}
              sortable={sortable}
              key={prop.prop.toString()}
              onClick={onHeaderClick}
            />
          ))}
        </tr>
      </THeadStyle>
      <tbody>
        {data.map((item) => (
          <RowStyle
            key={item.id}
            className={selected.includes(item.id) ? "active" : ""}
          >
            {headers.map((header, i) =>
              cellRenderer({
                data: item,
                prop: header.prop,
                onSelect,
                selected: selected.includes(item.id),
                selectionType,
                index: i,
              })
            )}
          </RowStyle>
        ))}
      </tbody>
    </TableStyle>
  );
}
