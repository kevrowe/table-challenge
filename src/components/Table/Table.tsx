import { useEffect, useState } from "react";
import styled from "styled-components";
import { StyledProps } from "../../styles/theme";
import {
  SortDirection,
  TableHeaderSortButton,
  TableHeaderSortIconStyle,
} from "./TableHeaderSortButton";
import { RadioButton } from "../Input/RadioButton";
import { Checkbox } from "../Input/Checkbox";

type SelectionType = "multiple" | "single" | "none";

export type HeaderItem<T> = {
  name: string;
  prop: keyof T;
};

type Props<T> = {
  data: T[];
  sortable: boolean;
  selectionType: SelectionType;
  headers: HeaderItem<T>[];
};

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

export const TableCellBaseStyle = styled.td`
  padding: ${({ theme }: StyledProps) => theme.padding} 0;
`;

const TableCellStyle = styled(TableCellBaseStyle)`
  *:last-child > & {
    border: 0 none;
  }

  :first-child {
    margin-left: ${({ theme }: StyledProps) => theme.padding};
  }
  :last-child {
    margin-right: ${({ theme }: StyledProps) => theme.padding};
  }
`;

type DataType<T> = {
  id: number;
  selected?: boolean;
} & T;

export function Table<T extends object>({
  sortable,
  data: inputData,
  selectionType,
  headers: headerConfig,
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
  const [selected, setSelected] = useState([] as number[]);

  useEffect(() => {
    if (
      selectionType !== "none" &&
      !headers.find((h: HeaderItem<T>) => h.prop === "selected")
    ) {
      setHeaders([{ name: "", prop: "selected" as any }, ...headers]);
    } else {
      setSelected([]);
      setHeaders(headers.filter((h) => h.prop !== "selected"));
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

  return (
    <TableStyle>
      <THeadStyle sortable={sortable}>
        <tr>
          {headers.map((prop) => (
            <th
              key={prop.prop.toString()}
              onClick={
                !sortable || prop.prop === "selected"
                  ? () => {}
                  : () => onHeaderClick(prop.prop)
              }
            >
              {prop.prop === "selected" ? null : (
                <>
                  {prop.name}
                  {sortable && (
                    <TableHeaderSortButton
                      direction={prop.prop === sortBy ? sortDirection : ""}
                    />
                  )}
                </>
              )}
            </th>
          ))}
        </tr>
      </THeadStyle>
      <tbody>
        {data.map((item) => (
          <RowStyle
            key={item.id}
            className={selected.includes(item.id) ? "active" : ""}
          >
            {headers.map((prop) => (
              <TableCellStyle key={`${item.id}--${prop.prop.toString()}`}>
                {(() => {
                  const isSelected = selected.includes(item.id);
                  if (prop.prop === "selected") {
                    switch (selectionType) {
                      case "single":
                        return (
                          <RadioButton
                            name="selected"
                            checked={isSelected}
                            onChange={() => {
                              setSelected([item.id]);
                            }}
                          />
                        );
                      case "multiple":
                        return (
                          <Checkbox
                            name="selected"
                            checked={isSelected}
                            onChange={() => {
                              if (isSelected) {
                                setSelected(
                                  selected.filter((e) => e !== item.id)
                                );
                              } else {
                                setSelected([...selected, item.id]);
                              }
                            }}
                          />
                        );
                      default:
                        return null;
                    }
                  } else {
                    return `${item[prop.prop]}`;
                  }
                })()}
              </TableCellStyle>
            ))}
          </RowStyle>
        ))}
      </tbody>
    </TableStyle>
  );
}
