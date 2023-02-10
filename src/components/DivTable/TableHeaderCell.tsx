import { PropsWithChildren } from "react";
import styled from "styled-components";
import { StyledProps } from "../../styles/theme";
import { TableCellBaseStyle } from "./TableCell";
import {
  SortDirection,
  TableHeaderSortButton,
  TableHeaderSortIconStyle,
} from "./TableHeaderSortButton";

export const TableHeaderCellStyle = styled(TableCellBaseStyle)`
  cursor: ${({ interactive }: { interactive: boolean }) =>
    interactive ? "pointer" : "default"};
  background-color: ${({ theme }: StyledProps) =>
    theme.palette.secondary.highlight};
  font-weight: 700;

  :first-child {
    padding-left: ${({ theme }: StyledProps) => theme.padding};
  }
  :last-child {
    padding-right: ${({ theme }: StyledProps) => theme.padding};
  }

  & ${TableHeaderSortIconStyle}:before {
    border-width: 0em;
  }

  &:hover ${TableHeaderSortIconStyle}:before {
    border-width: 1em;
  }
`;

type Props = {
  active: boolean;
  sortDirection?: SortDirection;
  onClick: () => void;
  sortable?: boolean;
} & PropsWithChildren;

export const TableHeaderCell = ({
  active,
  sortDirection,
  onClick,
  children,
  sortable = true,
}: Props) => {
  return (
    <TableHeaderCellStyle
      role="columnheader"
      onClick={onClick}
      interactive={Boolean(onClick)}
    >
      {children}
      {sortable && (
        <TableHeaderSortButton direction={active ? sortDirection : ""} />
      )}
    </TableHeaderCellStyle>
  );
};
