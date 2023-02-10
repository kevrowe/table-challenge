import { ComponentMeta, ComponentStory } from "@storybook/react";
import { Table } from "../components/DivTable";

export default {
  title: "Div Table",
  component: Table,
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
  args: {
    data: [
      {
        id: 1,
        operator: "*Celcom Axiata (LTE)",
        headsetDisplay: "CELCOM / My Celcom / 502 19",
        threeG: "Yes",
      },
      {
        id: 2,
        operator: "*DiGi Telecom (LTE)",
        headsetDisplay: "DiGi 1800 / DiGi /  MYMY18",
        threeG: "Yes",
      },
      {
        id: 3,
        operator: "*Maxis (LTE)",
        headsetDisplay: "U Mobile / MYS 18 / MY 18",
        threeG: "No",
      },
      {
        id: 4,
        operator: "U Mobile (LTE)",
        headsetDisplay: "U Mobile / MYS 18 / MY 18",
        threeG: "Yes",
      },
    ] as any,
    headers: [
      { displayName: "#", propertyName: "id" },
      { displayName: "Operator", propertyName: "operator" },
      { displayName: "Headset Display", propertyName: "headsetDisplay" },
      { displayName: "3G Availability", propertyName: "threeG" },
    ],
    cols: 4,
  },
} as ComponentMeta<typeof Table>;

const Template: ComponentStory<typeof Table> = (args) => <Table {...args} />;

export const Primary = Template.bind({});
