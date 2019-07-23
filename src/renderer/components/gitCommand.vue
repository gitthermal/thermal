<template>
	<t-flexbox flex-direction="column" class="command">
		<t-flexbox @click.native="toggle = !toggle">
			<components :is="commandType" class="command__image"></components>
			<t-flexbox flex-direction="column">
				<h5 class="command__title">
					{{ `git ${command}` }}
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
		<t-flexbox v-show="toggle" flex-direction="column" class="command__detail">
			<t-flexbox class="command__detail-list">
				<h6 style="margin-right: 5px;">
					<strong>Command:</strong>
				</h6>
				{{ `git ${command} ${params}` }}
			</t-flexbox>
		</t-flexbox>
	</t-flexbox>
</template>

<script>
import TFlexbox from "./TLayouts/TFlexbox";
import CloseIcon from "./icon/close";
import HistoryIcon from "./icon/clock";
import CommitIcon from "./icon/commit";
import CloneIcon from "./icon/download";
import StatusIcon from "./icon/list";
import InitIcon from "./icon/play";
import DiffIcon from "./icon/columns";
import DefaultIcon from "./icon/menu";

export default {
	name: "GitCommand",
	components: {
		TFlexbox,
		CloseIcon,
		HistoryIcon,
		CommitIcon,
		CloneIcon,
		StatusIcon,
		InitIcon,
		DiffIcon,
		DefaultIcon
	},
	props: {
		index: {
			type: Number,
			required: true
		},
		type: {
			type: String,
			required: true
		},
		command: {
			type: String,
			required: true
		},
		params: {
			type: String,
			required: true
		},
		path: {
			type: String,
			required: true
		}
	},
	data() {
		return {
			toggle: false,
			git: [
				["log", HistoryIcon],
				["clone", CloneIcon],
				["commit", CommitIcon],
				["status", StatusIcon],
				["init", InitIcon],
				["diff", DiffIcon]
			]
		};
	},
	computed: {
		commandType() {
			for (let i = 0; i < this.git.length; i++) {
				if (this.type === this.git[i][0]) {
					return this.git[i][1];
				}
			}
			return DefaultIcon;
		}
	},
	methods: {
		removeCommand(index) {
			this.$store.commit({
				type: "commands/removeCommand",
				index: index
			});
		}
	}
};
</script>

<style lang="sass">
.command
	background-color: white
	padding: 1rem 1.25rem
	border-radius: .3125rem
	box-shadow: 0px 2px 6px rgba(0, 0, 0, 0.2)
	margin-bottom: 1rem

	&__image
		border: 2px solid rgba(0, 0, 0, 0.1)
		border-radius: .3125rem
		padding: 8px
		margin-right: 1rem
		width: 50px
		height: 50px
		stroke: black

	&__title
		color: black
		font-size: 1.125rem

	&__path
		font-size: .875rem
		color: #9D9D9D

	&:last-child
		margin-bottom: 8rem

	&__detail
		margin-top: 1rem
		padding-top: 1rem
		border-top: 1px solid #eee

		&-list
			&:not(:last-child)
				padding-bottom: .8rem
</style>
