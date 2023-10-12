import { ComponentMeta, ComponentStory } from "@storybook/react";
import { Checkbox } from "../components/Input/Checkbox";

export default {
  title: "Checkbox",
  component: Checkbox,
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
  argTypes: {
    checked: { control: "boolean" },
  },
} as ComponentMeta<typeof Checkbox>;

const Template: ComponentStory<typeof Checkbox> = (args) => (
  <Checkbox {...args} />
);

export const Primary = Template.bind({});
