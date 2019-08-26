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

		// directory name
		getRepositoryName(path) {
			this.repository.name = path.split("/")[path.split("/").length - 1];
		},

		// get remote url
		async getRemoteUrl(path) {
			let listRemote;
			try {
				listRemote = await git(path).listRemote(["--get-url"]);
				if (listRemote.slice(-4, -1) === "git") {
					this.repository.isGitRepo = true;
				}
				this.repository.remote = listRemote;

				console.log(listRemote);
			} catch (error) {
				console.log(error);
			}
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
