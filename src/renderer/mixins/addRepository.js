import git from "simple-git/promise";

// mixins
import queryAllRepository from "./queryAllRepository";

// database
import database from "../../database";

export default {
	data() {
		return {
			newRepository: {
				name: "",
				isGitRepo: false,
				remote: "",
				path: ""
			}
		};
	},
	mixins: [queryAllRepository],
	methods: {
		// add repository to database
		addRepositoryToDatabase(path) {
			this.getRepositoryName(path);
			this.getRemoteUrl(path);

			database.serialize(() => {
				this.insertNewRepository(path);

				// fetch lastest entry from repository database
				database.all(
					`SELECT * FROM repository ORDER BY repositoryId DESC LIMIT 1`,
					(err, data) => {
						if (err) console.log(err);
						else {
							let repository = {
								...data[0],
								name: this.newRepository.name,
								isGitRepo: this.newRepository.isGitRepo,
								remote: this.newRepository.remote
							};

							this.insertNewGitRepository(repository);
							this.insertNewRepositorySettings(repository);
							this.queryAllRepository();

							// reset local data property
							this.newRepository = {
								name: "",
								path: "",
								isGitRepo: false,
								remote: ""
							};
						}
					}
				);
			});
		},

		// directory name
		getRepositoryName(path) {
			this.newRepository.name = path.split("/")[path.split("/").length - 1];
		},

		// get remote url
		async getRemoteUrl(path) {
			let listRemote;
			try {
				listRemote = await git(path).listRemote(["--get-url"]);
				if (listRemote.slice(-4, -1) === "git") {
					this.newRepository.isGitRepo = true;
				}
				this.newRepository.remote = listRemote;

				console.log(listRemote);
			} catch (error) {
				console.log(error);
			}
		},

		// insert new repository to database
		insertNewRepository(path) {
			database.run(
				`INSERT INTO repository(
					directoryPath
				) VALUES(
					$directoryPath
				);`,
				{
					$directoryPath: path
				},
				(err, data) => {
					if (err) console.log(err);
				}
			);
		},

		// insert repository settings to database
		insertNewRepositorySettings(data) {
			database.run(
				`INSERT INTO repositorySettings(
					repositoryName,
					directoryName,
					commitFeature,
					remoteFeature,
					repositoryId
				) VALUES(
					$repositoryName,
					$directoryName,
					$commitFeature,
					$remoteFeature,
					$repositoryId
				);`,
				{
					$repositoryName: data.name,
					$directoryName: data.name,
					$commitFeature: 1,
					$remoteFeature: 1,
					$repositoryId: data.repositoryId
				},
				(err, data) => {
					if (err) console.log("err", err);
				}
			);
		},

		// insert repository git to database
		insertNewGitRepository(data) {
			database.run(
				`INSERT INTO gitRepository(
					isGit,
					remoteUrl,
					repositoryId
				) VALUES(
					$isGitRepo,
					$remoteUrl,
					$repositoryId
				);`,
				{
					$isGitRepo: data.isGitRepo,
					$remoteUrl: data.remote,
					$repositoryId: data.repositoryId
				},
				(err, data) => {
					if (err) console.log(err);
				}
			);
		}
	}
};
