<template>
	<t-flexbox align-items="center" class="repository__item">
		<t-flexbox>
			<t-flexbox
				v-if="source"
				align-items="center"
				class="repository__item-type"
			>
				<file-icon />
			</t-flexbox>
			<t-flexbox flex-direction="column">
				<h6 class="repository__item-title">
					{{ repositoryName | truncateFilter(30) }}
				</h6>
				<p v-if="path" class="repository__item-path">
					{{ directoryPath }}
				</p>
			</t-flexbox>
		</t-flexbox>
		<t-button
			v-if="!isGit"
			margin-left="auto"
			class="t-button__primary-warning"
		>
			Initialize
		</t-button>
		<t-button
			v-if="isGit"
			margin-left="auto"
			@click.native="openWorkspace(repositoryId)"
		>
			Open
		</t-button>
		<div class="repository__item-settings" @click="openSettings(repositoryId)">
			<settings-icon />
		</div>
	</t-flexbox>
</template>

<script>
import TFlexbox from "../TLayouts/TFlexbox";
import truncateFilter from "../../filters/truncate";
import TButton from "../TButton/TButton";
import fileIcon from "../icon/file";
import settingsIcon from "../icon/settings";
import closeModal from "../../mixins/closeModal";

export default {
	name: "RepositoryItem",
	components: {
		TFlexbox,
		TButton,
		fileIcon,
		settingsIcon
	},
	filters: { truncateFilter },
	mixins: [closeModal],
	props: {
		repositoryId: {
			type: Number,
			required: true
		},
		repositoryName: {
			type: String,
			default: ""
		},
		isGit: {
			type: Number,
			default: 0
		},
		directoryPath: {
			type: String,
			default: ""
		},
		source: {
			type: Boolean,
			default: true
		},
		path: {
			type: Boolean,
			default: true
		}
	},
	methods: {
		openWorkspace(id) {
			this.$router.push({
				name: "projectWorkspace",
				params: {
					projectId: id
				}
			});
			this.closeModal("SelectRepository");
		},
		openSettings(id) {
			this.$router.push({
				name: "projectSettings",
				params: {
					projectId: id
				}
			});
			this.closeModal("SelectRepository");
		}
	}
};
</script>

<style lang="sass">
.repository__item
	padding-top: .4rem
	padding-bottom: .4rem

	&:not(:last-child)
		margin-bottom: .5rem

	&-type
		margin-right: .6rem

		svg
			width: 40px
			height: 40px
			stroke: #8B9798

	&-title
		margin: 0

	&-path
		margin-top: 4px
		font-size: .8rem
		color: #6C6F75

	&-settings
		margin-left: .5rem
		border: 1px solid #00adb5
		padding: .5rem
		border-radius: 5rem
		display: flex
		cursor: pointer

		svg
			width: 20px
			height: 20px
			stroke: #00adb5
</style>
