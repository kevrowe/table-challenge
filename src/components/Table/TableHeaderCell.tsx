import { SortDirection, TableHeaderSortButton } from "./TableHeaderSortButton";
import { HeaderItem } from "./types";

type Props<T> = {
  prop: HeaderItem<T>;
  sortable: boolean;
  sortBy: keyof T;
  sortDirection: SortDirection;
  onClick?: (prop: keyof T) => void;
};

export const TableHeaderCell = <T,>({
  prop,
  sortable,
  sortDirection,
  sortBy,
  onClick,
}: Props<T>) => {
  return (
    <th
      key={prop.prop.toString()}
      onClick={
        !sortable || prop.prop === "selected" || !onClick
          ? () => {}
          : onClick.bind(null, prop.prop)
      }
    >
      {prop.prop === "selected" ? null : (
        <>
          {prop.name}
          {sortable && (
            <TableHeaderSortButton
              direction={prop.prop === sortBy ? sortDirection : ""}
            />
          )}
        </>
      )}
    </th>
  );
};
