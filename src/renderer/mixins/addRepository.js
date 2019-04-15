import git from "simple-git/promise";

export default {
	methods: {
		getRepositoryName(path) {
			return path.split("/")[path.split("/").length - 1];
		},
		async localRepository(path) {
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
					this.$store.commit({
						type: "repository/addLocalRepository",
						name: this.getRepositoryName(path),
						path: path,
						remote: listRemote,
						commits: true,
						remotes: true
					});
		}
	}
};
