<template>
	<div style="width: 100%">
		<t-scrollbar v-if="getAllRepository.length > 0" :height="height">
			<div style="padding: 1rem">
				<repository-item
					v-for="repo in getAllRepository"
					:key="repo.repositoryId"
					:repository-id="repo.repositoryId"
					:repository-name="repo.repositoryName"
					:is-git="repo.isGit"
				/>
			</div>
		</t-scrollbar>
		<div v-else>
			You don't have any repositories.
		</div>
	</div>
</template>

<script>
import repositoryItem from "./repositoryItem";
import TScrollbar from "../TLayouts/TScrollbar";

export default {
	name: "RepositoryList",
	components: {
		repositoryItem,
		TScrollbar
	},
	props: {
		height: {
			type: String,
			default: ""
		}
	},
	computed: {
		getAllRepository() {
			return this.$store.getters["repository/getAllRepository"];
		}
	}
};
</script>

<style lang="sass"></style>
