<template>
	<t-flexbox align-items="center" class="welcome__repository__list__item">
		<h6>{{ repositoryName | truncateFilter(30) }}</h6>
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
		<div
			class="welcome__repository__list__item__settings"
			@click="openSettings(repositoryId)"
		>
			<settingsIcon />
		</div>
	</t-flexbox>
</template>

<script>
import TFlexbox from "../TLayouts/TFlexbox";
import truncateFilter from "../../filters/truncate";
import TButton from "../TButton/TButton";
import settingsIcon from "../icon/settings";
import closeModal from "../../mixins/closeModal";

export default {
	name: "RepositoryItem",
	components: {
		TFlexbox,
		TButton,
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

<style lang="sass"></style>
