import { ComponentMeta, ComponentStory } from "@storybook/react";
import { RadioButton } from "../components/Input/RadioButton";

export default {
  title: "Radio Button",
  component: RadioButton,
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
  argTypes: {
    checked: { control: "boolean" },
  },
} as ComponentMeta<typeof RadioButton>;

const Template: ComponentStory<typeof RadioButton> = (args) => (
  <RadioButton {...args} />
);

export const Primary = Template.bind({});
