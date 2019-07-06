<template>
	<t-flexbox flex-direction="column" :flex-grow="1">
		<navbar />
		<t-flexbox
			flex-direction="row"
			:flex-grow="1"
			:flex-shrink="1"
			:flex-basis="0"
			style="height: 100%"
		>
			<sidebar />
			<router-view />
		</t-flexbox>
	</t-flexbox>
</template>

<script>
import TFlexbox from "../../components/TLayouts/TFlexbox";
import navbar from "../../components/navbar";
import sidebar from "../../components/sidebar";

export default {
	name: "RepositoryIndex",
	components: {
		TFlexbox,
		navbar,
		sidebar
	},
	mounted() {
		if (
			this.$router.history.current.matched[0].path.slice(1) === "repository" &&
			this.$store.getters["workspace/currentRepository"].isGit === false
		) {
			this.$store.commit("model/toggleModelPlaceholder");
		}
	}
};
</script>
