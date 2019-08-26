import git from "simple-git/promise";

export default {
	data() {
		return {
			repository: {
				name: "",
				isGitRepo: false,
				remote: ""
			}
		};
	},
	methods: {
		},
		async isGitRepository(path) {
			const validateGitRepository = git(path);
			const isGit = await validateGitRepository.checkIsRepo();
			try {
				return isGit;
			} catch (error) {
				console.log(error);
			}

		// directory name
		getRepositoryName(path) {
			this.repository.name = path.split("/")[path.split("/").length - 1];
		},
				}
			});

		// insert new repository to database
		insertNewRepository(path) {
			database.run(
				`INSERT INTO repository(
					repositoryName,
					repositoryPath
				) VALUES(
					$repositoryName,
					$repositoryPath
				);`,
				{
					$repositoryName: this.repository.name,
					$repositoryPath: path
				},
				(err, data) => {
					if (err) console.log(err);
				}
			);
		},
		}
	}
};
