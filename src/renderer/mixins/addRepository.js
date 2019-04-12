import git from "simple-git/promise";

export default {
	methods: {
		async addLocalRepository(path) {
			let repositoryName = this.pathToRepository.split("/")[this.pathToRepository.split("/").length - 1];
			let validateGitRepo = git(path);
			let validateGit = await validateGitRepo.checkIsRepo();
			let listRemote;
			try {
				listRemote = await git(path).listRemote(["--get-url"]);
				if (listRemote.slice(-4, -1) === "git") {
					this.$store.commit({
						type: "repository/localRepositoryRemote",
						remote: listRemote
					});
				}
			} catch (error) {
				console.log(error);
			}
			try {
				if (validateGit) {
					this.$store.commit({
						type: "repository/addLocalRepository",
						name: repositoryName,
						path: path,
						remote: listRemote,
						commits: true,
						remotes: true
					});
				}
			} catch (error) {
				console.log(error);
			}
		}
	}
};
