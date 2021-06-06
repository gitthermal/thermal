import TButton from "./TButton";

export default {
	title: "Button",
	components: TButton
};

const Template = (args, { argTypes }) => ({
	components: TButton,
	props: Object.keys(argTypes),
	template: '<TButton v-bind="$props">Primary</TButton>'
});

export const primaryButton = Template.bind({});
