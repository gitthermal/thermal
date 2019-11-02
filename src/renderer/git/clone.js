import Git from "nodegit";

const clone = async (remoteUrl, localPath) => {
	try {
		await Git.Clone(remoteUrl, localPath);
		return true;
	} catch (error) {
		console.log(error);
	}
};

export default clone;
