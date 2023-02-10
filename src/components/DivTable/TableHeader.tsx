
import { PropsWithChildren } from "react";
import styled from "styled-components";
import { StyledProps } from "../../styles/theme";
import { GenericTableRow } from "./TableRow";

export const TableHeaderStyle = styled(GenericTableRow)`
  font-size: ${({ theme }: StyledProps) =>
    theme.typography.fontSize.tableHeader};
`;

type Props = PropsWithChildren;

export const TableHeader = ({ children }: Props) => {
  return <TableHeaderStyle role="row">{children}</TableHeaderStyle>;
};
