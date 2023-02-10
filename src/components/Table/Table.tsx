import { useState } from "react";
import styled from "styled-components";
import { StyledProps } from "../../styles/theme";
import {
  SortDirection,
  TableHeaderSortButton,
  TableHeaderSortIconStyle,
} from "../DivTable/TableHeaderSortButton";
import { RadioButton } from "../Input/RadioButton";

type SelectionType = "single" | "none";

type Props<T> = {
  data: T[];
  sortable: boolean;
  selectionType: SelectionType;
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

  td {
    padding: ${({ theme }: StyledProps) => theme.padding};
  }
`;

type DataType<T> = {
  id: number;
} & T;

export function Table<T extends object>({
  sortable,
  data: inputData,
  selectionType,
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
  const [headers] = useState(
    Object.keys(data[0]).filter((e) => e !== "id") as (keyof T)[]
  );
  const defaultSort = headers[0];
  const [sortBy, setSortBy] = useState(defaultSort);
  const [sortDirection, setSortDirection] = useState("asc" as SortDirection);
  const [selected, setSelected] = useState(-1);

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
          {headers.map((propName) => (
            <th
              key={propName.toString()}
              onClick={
                !sortable || propName === "selected"
                  ? () => {}
                  : () => onHeaderClick(propName)
              }
            >
              {propName === "selected" ? null : (
                <>
                  {propName.toString()}
                  {sortable && (
                    <TableHeaderSortButton
                      direction={propName === sortBy ? sortDirection : ""}
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
            className={selected === item.id ? `active` : ""}
          >
            {headers.map((propName) => (
              <td key={`${item.id}--${propName.toString()}`}>
                {selectionType === "single" && propName === "selected" ? (
                  <RadioButton
                    name="selected"
                    onChange={() => {
                      setSelected(item.id);
                    }}
                  />
                ) : (
                  `${item[propName]}`
                )}
              </td>
            ))}
          </RowStyle>
        ))}
      </tbody>
    </TableStyle>
  );
}
