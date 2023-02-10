
import { PropsWithChildren } from "react";
import styled from "styled-components";
import { StyledProps } from "../../styles/theme";

export const TableCellBaseStyle = styled.div`
  padding: ${({ theme }: StyledProps) => theme.padding} 0;
`;

const TableCellStyle = styled(TableCellBaseStyle)`
  border-bottom: 1px solid
    ${({ theme }: StyledProps) => theme.palette.secondary.default};

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

type Props = PropsWithChildren;

export const TableCell = ({ children }: Props) => {
  return <TableCellStyle role="cell">{children}</TableCellStyle>;
};
