import styled from "styled-components";
import { StyledProps } from "../../styles/theme";

export const RowStyle = styled.tr`
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
