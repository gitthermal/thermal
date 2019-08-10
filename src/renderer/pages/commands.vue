<template>
	<t-flexbox>
		<t-scrollbar width="100%" style="height: calc(100vh - 37px);">
			<t-container style="padding-bottom: 4rem;">
				<h1>Git Commands</h1>
				<git-command
					v-for="(item, index) in fetchAllCommands"
					:key="index"
					:index="index"
					:command="item.command"
					:params="item.params"
					:path="item.path"
					:type="item.type"
					:date="item.date"
				/>
			</t-container>
		</t-scrollbar>
	</t-flexbox>
</template>

<script>
import TFlexbox from "../components/TLayouts/TFlexbox";
import TContainer from "../components/TLayouts/TContainer";
import TScrollbar from "../components/TLayouts/TScrollbar";
import GitCommand from "../components/gitCommand";

export default {
	name: "GitCommands",
	components: {
		TFlexbox,
		TContainer,
		TScrollbar,
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
