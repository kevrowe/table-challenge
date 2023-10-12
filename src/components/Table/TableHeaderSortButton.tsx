import { ReactElement } from "react";
import styled from "styled-components";
import { StyledProps } from "../../styles/theme";
import { ReactComponent as ArrowDownIcon } from "../../svg/arrow-down.svg";
import { ReactComponent as ArrowDoubleIcon } from "../../svg/arrow-double.svg";

export type SortDirection = "asc" | "desc" | "";

export const TableHeaderSortIconStyle = styled.div`
  margin: 0 0 0 20px;
  display: inline;
  position: relative;

  &:before {
    content: "";
    height: 0;
    width: 0;
    border-radius: 50%;
    border: 1em solid
      ${({ theme }: StyledProps) => theme.palette.primary.highlight};
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    transition: 0.2s border-width;
  }

  table & svg {
    top: 1px;
  }
`;

type Props = {
  direction?: SortDirection;
};

export const TableHeaderSortButton = ({ direction }: Props): ReactElement => {
  return (
    <TableHeaderSortIconStyle role="button">
      {(() => {
        switch (true) {
          case direction === "asc":
            return <ArrowDownIcon style={{ position: "relative" }} />;
          case direction === "desc":
            return (
              <ArrowDownIcon
                style={{ position: "relative", transform: "rotateX(180deg)" }}
              />
            );
          default:
            return <ArrowDoubleIcon style={{ position: "relative" }} />;
        }
      })()}
    </TableHeaderSortIconStyle>
  );
};
