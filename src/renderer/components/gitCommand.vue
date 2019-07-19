<template>
	<t-flexbox class="command">
		<t-flexbox flex-direction="column">
			<h5 class="command__title">
				{{ title }}
			</h5>
			<span class="command__path">{{ path }}</span>
		</t-flexbox>
		<t-flexbox
			align-items="center"
			style="margin-left: auto; cursor: pointer;"
			@click.native="removeCommand(index)"
		>
			<close-icon stroke="#8B9798" />
		</t-flexbox>
	</t-flexbox>
</template>

<script>
import TFlexbox from "./TLayouts/TFlexbox";
import CloseIcon from "./icon/close";

export default {
	name: "GitCommand",
	components: {
		TFlexbox,
		CloseIcon
	},
	props: {
		index: {
			type: Number,
			required: true
		},
		title: {
			type: String,
			required: true
		},
		path: {
			type: String,
			required: true
		}
	},
	methods: {
		removeCommand(index) {
			this.$store.commit({
				name: "removeCommand",
				index: index
			});
		}
	}
};
</script>

<style lang="sass">
.command
	background-color: white
	padding: 1rem
	border: 1px solid #dedede
	border-radius: .3rem

	&__title
		color: black

	&__path
		font-size: .8rem
		color: #eee
</style>
