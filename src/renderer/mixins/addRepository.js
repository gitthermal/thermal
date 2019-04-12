import git from "simple-git/promise";

export default {
	methods: {
		getRepositoryName(path) {
			return path.split("/")[this.repositoryPath.split("/").length - 1];
		},
		async addLocalRepository(path) {
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
						name: this.getRepositoryName(path),
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
