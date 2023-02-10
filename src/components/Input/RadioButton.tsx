import React, { ReactElement } from "react";
import styled from "styled-components";
import { StyledProps } from "../../styles/theme";

type Props = {
  large?: boolean;
  label?: string;
} & React.ComponentPropsWithoutRef<"input">;

const RadioStyle = styled.div<{ large: boolean }>`
  display: inline-block;
  vertical-align: middle;
  border-radius: 50%;
  background-color: ${({ theme }: StyledProps) =>
    theme.palette.secondary.highlight};
  width: ${({ large }: any) => (large ? "30px" : "22px")};
  height: ${({ large }: any) => (large ? "30px" : "22px")};
  border: 1px solid ${({ theme }: StyledProps) => theme.palette.secondary.dark};

  input[type="radio"]:checked + & {
    width: ${({ large }: any) => (large ? "16px" : "12px")};
    height: ${({ large }: any) => (large ? "16px" : "12px")};
    border: ${({ large }: any) => (large ? "8px" : "6px")} solid
      ${({ theme }: StyledProps) => theme.palette.primary.default};
  }
`;

const Input = styled.input`
  opacity: 0;
  position: absolute;
`;

export const RadioButton = ({
  label = "",
  large = false,
  ...restProps
}: Props): ReactElement => {
  return (
    <label>
      <Input type="radio" {...restProps} />
      <RadioStyle large={large} />
      {label}
    </label>
  );
};
