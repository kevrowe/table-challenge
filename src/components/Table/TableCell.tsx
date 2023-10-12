import { PropsWithChildren } from "react";
import styled from "styled-components";
import { StyledProps } from "../../styles/theme";
import { Checkbox } from "../Input/Checkbox";
import { RadioButton } from "../Input/RadioButton";
import { DataType, SelectionType } from "./types";

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

type Props<T> = {
  data: DataType<T>;
  prop: keyof T | "selected";
  selected: boolean;
  selectionType: SelectionType;
  onSelected: (id: any) => void;
};

export const TableCell = <T,>({
  data,
  prop,
  onSelected,
  selected,
  selectionType,
}: Props<T> & PropsWithChildren) => {
  const propString = prop.toString();

  return (
    <TableCellStyle key={`${data.id}--${propString}`}>
      {(() => {
        if (propString === "selected") {
          switch (selectionType) {
            case "single":
              return (
                <RadioButton
                  name="selected"
                  checked={selected}
                  onChange={() => {
                    onSelected(data.id);
                  }}
                />
              );
            case "multiple":
              return (
                <Checkbox
                  name="selected"
                  checked={selected}
                  onChange={() => {
                    onSelected(data.id);
                  }}
                />
              );
            default:
              return null;
          }
        } else {
          return `${data[prop]}`;
        }
      })()}
    </TableCellStyle>
  );
};
