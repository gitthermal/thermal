<template>
	<t-flexbox>
		<t-container>
			<div class="select__header">
				<t-flexbox justify-content="space-between" align-items="center">
					<h1>Repository</h1>
					<t-button @click.native="addLocalRepository">
						Add repository
					</t-button>
				</t-flexbox>
			</div>
			<div
				class="select__repository"
				@drop.prevent="dropHandler($event)"
				@dragover.prevent="dropHandler()"
			>
				<repository-list height="530px" />
			</div>
		</t-container>
	</t-flexbox>
</template>

<script>
// components
import TFlexbox from "../components/TLayouts/TFlexbox";
import TContainer from "../components/TLayouts/TContainer";
import TButton from "../components/TButton/TButton";
import repositoryList from "../components/repositoryListView/repositoryList";

// mixins
import addRepository from "../mixins/addRepository";

export default {
	name: "SelectRepository",
	components: {
		TFlexbox,
		TContainer,
		TButton,
		repositoryList
	},
	mixins: [addRepository],
	methods: {
		addLocalRepository() {
			this.$store.commit("modal/toggleAddLocalRepositoryModal", true);
		},
		dropHandler(event) {
			const dropDataTransfer = event.dataTransfer.files;
			this.newRepository.path = dropDataTransfer[0].path.split("\\").join("/");
			this.addRepositoryToDatabase(this.newRepository.path);
		}
	}
};
</script>

<style lang="sass">
.select__header
	margin-top: 2rem
	margin-bottom: 1rem

.select__repository
	border: 1px solid #EFEFEF
	border-radius: 1rem
	padding: 1rem
</style>
