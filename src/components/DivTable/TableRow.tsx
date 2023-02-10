import { HTMLProps, ReactElement } from "react";
import { PropsWithChildren } from "react";
import styled from "styled-components";
import { StyledProps } from "../../styles/theme";

export const GenericTableRow = styled.div`
  display: contents;
`;

export const TableRowStyle = styled(GenericTableRow)`
  font-size: ${({ theme }: StyledProps) => theme.typography.fontSize.tableBody};
`;

type Props = {
  active: boolean;
} & PropsWithChildren<any>;

export const TableRow = ({ children, ...restProps }: Props): ReactElement => {
  return (
    <TableRowStyle role="row" {...restProps}>
      {children}
    </TableRowStyle>
  );
};
