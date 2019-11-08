import { Clone } from "nodegit";

const clone = async (remoteUrl, localPath, cloneProgress) => {
	try {
		await Clone(remoteUrl, localPath, {
			fetchOpts: {
				callbacks: {
					transferProgress: progress =>
						cloneProgress(
							(progress.receivedObjects() / progress.totalObjects()) * 100
						)
				}
			}
		});
		return true;
	} catch (error) {
		console.log(error);
	}
};

export default clone;
