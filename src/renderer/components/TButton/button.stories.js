// import { storiesOf } from '@storybook/vue';
import TButton from "./TButton.vue";

export default {
	title: "Button"
};

export const primaryButton = () => ({
	components: {
		TButton
	},
	template: "<TButton>Primary Button</TButton>"
});
