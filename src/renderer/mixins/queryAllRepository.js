// database
import database from "../../database";

export default {
	methods: {
		// query repositories from database
		queryAllRepository() {
			database.all(
				`SELECT
					repositoryId,
					repositoryName,
					repositoryPath,
					isGit
				FROM repository
				INNER JOIN gitRepository USING(repositoryId)`,
				(err, data) => {
					if (err) console.log(err);
					else {
						console.log(data);
						this.$store.commit("repository/updateRepositoryList", data);
					}
				}
			);
		}
	}
}
