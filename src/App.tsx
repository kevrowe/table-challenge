import { ReactElement, useState } from "react";
import { ThemeProvider } from "styled-components";
import { RadioButton } from "./components/Input/RadioButton";
import { Table } from "./components/DivTable";
import { HeaderItem } from "./components/DivTable/Table";
import { theme } from "./styles/theme";

type Data = {
  id: number;
  name: string;
  threeG: boolean;
};

export default function App(): ReactElement {
  const [headers] = useState<HeaderItem<Data>[]>([
    { displayName: "#", propertyName: "id" },
    { displayName: "Name", propertyName: "name" },
    { displayName: "3G Availability", propertyName: "threeG" },
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
          cols={3}
          style={{ width: 650, margin: "0 auto" }}
          headers={headers}
          data={data}
          selectionType={"single"}
        />
      </div>
    </ThemeProvider>
  );
}
