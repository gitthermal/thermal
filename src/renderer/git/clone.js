const NodeGit = require("nodegit");

const clone = async (remoteUrl, localPath) => {
	NodeGit.Clone(remoteUrl, localPath)
		.then(repository => {
			console.log(repository);
		})
		.catch(error => {
			console.log(error);
		});
};

export default clone;
