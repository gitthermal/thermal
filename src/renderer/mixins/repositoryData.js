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
	methods: {
		updateRepositoryData() {
			this.repositoryData = this.$store.getters["repository/listAllRepository"][
				this.$route.params.projectId
			];
		}
	},
	mounted() {
		this.updateRepositoryData();
	},
	beforeUpdate() {
		this.updateRepositoryData();
	}
};
