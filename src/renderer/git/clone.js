import git from "simple-git/promise";

const clone = async (remoteUrl, localPath) => {
	let cloneRepository = await git()
	.outputHandler((command, stdout, stderr) => {
		stderr.on('data', function (data) {
			console.log(data.toString());
		})
		.clone(remoteUrl, localPath, ['--progress', '--verbose']);
	});
	try {
		return cloneRepository;
	} catch (error) {
		console.log(error);
	}
};

export default clone;
