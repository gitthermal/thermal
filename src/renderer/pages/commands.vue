<template>
	<t-flexbox>
		<t-container>
			<h1>Git Commands</h1>
			<git-command
				v-for="(item, index) in fetchAllCommands"
				:key="index"
				:index="index"
				:title="item.title"
				:path="item.path"
			/>
		</t-container>
	</t-flexbox>
</template>

<script>
import TFlexbox from "../components/TLayouts/TFlexbox";
import TContainer from "../components/TLayouts/TContainer";
import GitCommand from "../components/gitCommand";

export default {
	name: "GitCommands",
	components: {
		TFlexbox,
		TContainer,
		GitCommand
	},
	computed: {
		fetchAllCommands() {
			return this.$store.state.commands.commands;
		}
	}
};
</script>

<style lang="sass" scoped>
h1
	margin-top: 3rem
	margin-bottom: 1rem
	text-align: center
</style>
