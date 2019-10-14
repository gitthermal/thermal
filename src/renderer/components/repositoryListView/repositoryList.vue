<template>
	<t-flexbox class="repositories__list" flex-direction="column">
		<input-text
			v-model.trim="searchQuery"
			class="repositories__list-search"
			name="search_repository"
			placeholder="Search repository"
		/>
		<t-scrollbar
			v-if="getAllRepository.length > 0"
			class="repositories__list-scrollbar"
			:height="height"
		>
			<div>
				<repository-item
					v-for="repo in getAllRepository"
					:key="repo.repositoryId"
					:repository-id="repo.repositoryId"
					:repository-name="repo.repositoryName"
					:directory-path="repo.directoryPath"
					:is-git="repo.isGit"
				/>
			</div>
		</t-scrollbar>
		<div v-else>
			You don't have any repositories.
		</div>
	</t-flexbox>
</template>

<script>
import TFlexbox from "../TLayouts/TFlexbox";
import inputText from "../input/inputText";
import TScrollbar from "../TLayouts/TScrollbar";
import repositoryItem from "./repositoryItem";

export default {
	name: "RepositoryList",
	components: {
		TFlexbox,
		inputText,
		TScrollbar,
		repositoryItem
	},
	props: {
		height: {
			type: String,
			default: ""
		}
	},
	data() {
		return {
			searchQuery: ""
		};
	},
	computed: {
		getAllRepository() {
			let repositories = this.$store.getters["repository/getAllRepository"];
			return repositories.filter(post => {
				return post.repositoryName
					.toLowerCase()
					.includes(this.searchQuery.toLowerCase());
			});
		}
	}
};
</script>

<style lang="sass">
.repositories__list
	width: 100%

	&-search
		margin-bottom: 1rem

	&-scrollbar
		width: 100%
</style>
