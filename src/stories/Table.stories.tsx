import { ComponentMeta, ComponentStory } from "@storybook/react";
import { Table } from "../components/Table";

export default {
  title: "Classic Table",
  component: Table,
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
  argTypes: {
    selectionType: {
      description: "Changing this setting needs a page refresh",
    },
  },
  args: {
    data: [
      {
        operator: "*Celcom Axiata (LTE)",
        headsetDisplay: "CELCOM / My Celcom / 502 19",
        threeG: "Yes",
      },
      {
        operator: "*DiGi Telecom (LTE)",
        headsetDisplay: "DiGi 1800 / DiGi /  MYMY18",
        threeG: "Yes",
      },
      {
        operator: "*Maxis (LTE)",
        headsetDisplay: "U Mobile / MYS 18 / MY 18",
        threeG: "No",
      },
      {
        operator: "U Mobile (LTE)",
        headsetDisplay: "U Mobile / MYS 18 / MY 18",
        threeG: "Yes",
      },
    ],
    sortable: false,
    selectionType: "none",
  },
} as ComponentMeta<typeof Table>;

const Template: ComponentStory<typeof Table> = (args) => <Table {...args} />;

export const Primary = Template.bind({});
