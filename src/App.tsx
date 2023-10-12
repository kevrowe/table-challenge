import { ReactElement, useState } from "react";
import { ThemeProvider } from "styled-components";
import { Table } from "./components/Table";
import { theme } from "./styles/theme";
import { HeaderItem } from "./components/Table/types";

type Data = {
  id: number;
  name: string;
  threeG: boolean;
};

export default function App(): ReactElement {
  const [headers] = useState<HeaderItem<Data>[]>([
    { name: "#", prop: "id" },
    { name: "Name", prop: "name" },
    { name: "3G Availability", prop: "threeG" },
  ]);
  const [data] = useState([
    {
      id: 1,
      name: "First",
      threeG: true,
    },
    {
      id: 2,
      name: "Second",
      threeG: false,
    },
    {
      id: 3,
      name: "Third",
      threeG: false,
    },
  ]);

  return (
    <ThemeProvider theme={theme}>
      <div className="App">
        <h1>Table</h1>
        <Table
          headers={headers}
          data={data}
          selectionType={"single"}
          sortable={true}
        />
      </div>
      <div className="App">
        <h1>Table with custom renderer</h1>
        <Table
          headers={headers}
          data={data}
          selectionType={"multiple"}
          sortable={true}
          cellRenderer={({ data, prop, onSelect, selected }) => {
            return (
              <td
                onClick={() => onSelect(data.id)}
                className={`selected-${selected}`}
              >
                {(() => {
                  if (prop === "selected") {
                    return selected ? "✅" : "☑️";
                  } else {
                    return data[prop];
                  }
                })()}
              </td>
            );
          }}
        />
      </div>
    </ThemeProvider>
  );
}
