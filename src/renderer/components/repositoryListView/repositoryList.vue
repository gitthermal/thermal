<template>
	<div style="width: 100%">
		<t-scrollbar v-if="getAllRepository.length > 0" height="300px">
			<div style="padding: 1rem">
				<repository-item
					v-for="(repo, index) in getAllRepository"
					:key="index"
					:repo="repo"
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
	computed: {
		getAllRepository() {
			return this.$store.getters["repository/listAllRepository"];
		}
	}
};
</script>

<style lang="sass"></style>
