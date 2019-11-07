import nodegit from "nodegit";

// mixins
import queryAllRepository from "./queryAllRepository";
import { getRemoteUrl } from "../git/remote";

// database
import database from "../../database";

export default {
	data() {
		return {
			newRepository: {
				name: "",
				isGitRepo: false,
				path: "",
				remote: ""
			}
		};
	},
	mixins: [queryAllRepository],
	methods: {
		// add repository to database
		addRepositoryToDatabase(path) {
			this.getRepositoryName(path);
			this.isGitRepo(path);
			this.remoteOriginUrl(path);

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
								remoteUrl: this.newRepository.remote
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

		// validate git repository
		async isGitRepo(path) {
			let repository = await nodegit.Repository.open(path);
			try {
				this.newRepository.isGitRepo = !!repository;
			} catch (error) {
				console.log(error);
			}
		},

		async remoteOriginUrl(path) {
			try {
				let url = await getRemoteUrl(path, "origin");
				this.newRepository.remote = url;
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
					source,
					commitFeature,
					remoteFeature,
					repositoryId
				) VALUES(
					$repositoryName,
					$directoryName,
					$source,
					$commitFeature,
					$remoteFeature,
					$repositoryId
				);`,
				{
					$repositoryName: data.name,
					$directoryName: data.name,
					$source: "local",
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
					$remoteUrl: data.remoteUrl,
					$repositoryId: data.repositoryId
				},
				(err, data) => {
					if (err) console.log(err);
				}
			);
		}
	}
};
