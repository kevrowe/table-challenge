import React, { ReactElement } from "react";
import styled from "styled-components";
import { StyledProps } from "../../styles/theme";

type Props = {
  large?: boolean;
  label?: string;
} & React.ComponentPropsWithoutRef<"input">;

const CheckboxStyle = styled.div<{ large: boolean }>`
  display: inline-block;
  vertical-align: middle;
  border-radius: 8px;
  background-color: ${({ theme }: StyledProps) => theme.palette.secondary.highlight};
  width: ${({ large }: any) => (large ? "32px" : "24px")};
  height: ${({ large }: any) => (large ? "32px" : "24px")};
  border: 1px solid ${({ theme }: StyledProps) => theme.palette.secondary.dark};

  input[type="checkbox"]:checked + & {
    background-color: ${({ theme }: StyledProps) => theme.palette.primary.default};
    border: 1px solid ${({ theme }: StyledProps) => theme.palette.primary.default};

    &:after {
        display: block;
        content: "";
        margin: 0 auto;
        width: ${({ large }: any) => (large ? "10px" : "10px")};
        height: ${({ large }: any) => (large ? "6px" : "6px")};
        border: 2px solid ${({theme}: StyledProps) => theme.palette.primary.highlight};
        border-top-width: 0px; 
        border-right-width: 0px;
        transform: rotate(-45deg) translateY(-30%) translateX(20%);
        top: 40%;
        position: relative;
    }
  }
`;

const Input = styled.input`
  opacity: 0;
  position: absolute;
`;

export const Checkbox = ({
  label = "",
  large = false,
  ...restProps
}: Props): ReactElement => {
  return (
    <label>
      <Input type="checkbox" {...restProps} />
      <CheckboxStyle large={large} />
      {label}
    </label>
  );
};
