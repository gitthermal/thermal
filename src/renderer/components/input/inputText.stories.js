// import { storiesOf } from '@storybook/vue';
import InputText from "./inputText.vue";

export default {
	title: "Input Fields"
};

export const inputField = () => ({
	components: {
		InputText
	},
	render: h => <InputText name="text input field" placeholder="Input field" />
});

// storiesOf("./inputText", module).add('Input Fields', () =.)
