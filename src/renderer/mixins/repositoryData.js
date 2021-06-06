export default {
	computed: {
		repositoryData() {
			return this.$store.getters["repository/repositoryData"];
		}
	}
};
