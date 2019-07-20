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
		if (!this.$store.getters["workspace/currentRepository"].isGit) {
			this.$store.commit("modal/toggleInitializeGitRepositoryModal", true);
		}
	}
};
</script>
