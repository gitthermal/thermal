import git from "simple-git/promise";
import * as Sentry from "@sentry/electron";

const status = async (repository, files, message) => {
	console.log(files);
	await git(repository.path).add(files);
	let data = git(repository.path).commit(message);
	try {
		return data;
	} catch (error) {
		Sentry.captureException(error);
		let errorMessage = "Unable to commit files.";
		console.log(errorMessage);
		Sentry.captureMessage(errorMessage, data);
	}
};

export default status;
