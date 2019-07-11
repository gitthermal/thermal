export default {
	data() {
		return {
			repositoryData: {}
		};
	},
	beforeRouteEnter(to, from, next) {
		if (!isNaN(to.params.projectId)) {
			next();
		} else {
			next(false);
		}
	},
	mounted() {
		this.repositoryData = this.$store.getters["repository/listAllRepository"][
			this.$route.params.projectId
		];
	}
};
