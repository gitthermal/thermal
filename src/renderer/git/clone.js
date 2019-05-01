import git from "simple-git/promise";

const clone = async (remoteUrl, localPath) => {
	let cloneStatus;
	let cloneRepository = git()
		.outputHandler((command, stdout, stderr) => {
			stderr.on('end', () => {
				cloneStatus = true;
			});
		});
	try {
		await cloneRepository.clone(remoteUrl, localPath, ['--progress']);
		return cloneStatus;
	} catch (error) {
		console.log(error);
	}
};

export default clone;
