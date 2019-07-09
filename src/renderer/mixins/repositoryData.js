export default {
	data() {
		return {
			repositoryData: {}
		};
	},
	mounted() {
		this.repositoryData = this.$store.getters["repository/listAllRepository"][
			this.$route.params.projectId
		];
	}
};
