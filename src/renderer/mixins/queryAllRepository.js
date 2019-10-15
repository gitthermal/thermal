// database
import database from "../../database";

export default {
	methods: {
		// query repositories from database
		queryAllRepository() {
			database.all(
				`SELECT
					repository.repositoryId,
					repositorySettings.repositoryName,
					repository.directoryPath,
					gitRepository.isGit
				FROM repository
				INNER JOIN gitRepository USING(repositoryId)
				INNER JOIN repositorySettings USING(repositoryId)`,
				(err, data) => {
					if (err) console.log(err);
					else {
						this.$store.commit("repository/updateRepositoryList", data);
					}
				}
			);
		}
	}
};
