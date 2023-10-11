import { ReactElement, useState } from "react";
import { ThemeProvider } from "styled-components";
import { RadioButton } from "./components/Input/RadioButton";
import { Table } from "./components/Table";
import { HeaderItem } from "./components/Table/Table";
import { theme } from "./styles/theme";

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
    </ThemeProvider>
  );
}
