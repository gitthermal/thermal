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
		getRepositoryName(path) {
			return path.split("/")[path.split("/").length - 1];
		},
		async isGitRepository(path) {
			const validateGitRepository = git(path);
			const isGit = await validateGitRepository.checkIsRepo();
			try {
				return isGit;
			} catch (error) {
				console.log(error);
			}
		},
		async localRepository(path) {
			let listRemote;
			let isGitRepo;
			this.isGitRepository(path).then(result => {
				isGitRepo = result;
			});
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
			this.$store.commit({
				type: "repository/addLocalRepository",
				name: this.getRepositoryName(path),
				path: path,
				remote: listRemote,
				isGit: isGitRepo,
				commits: true,
				remotes: true
			});
		}
	}
};
