import git from "simple-git/promise";
import * as Sentry from "@sentry/electron";
import gitCommand from "../mixins/commands";

const status = async (path, files, message) => {
	console.log(files);
	await git(path).add(files);
	let data = git(path).commit(message);
	try {
		let params = `${files.join(",")} -m "${message}"`;
		gitCommand("commit", params);
		return data;
	} catch (error) {
		Sentry.captureException(error);
		let errorMessage = "Unable to commit files.";
		console.log(errorMessage);
		Sentry.captureMessage(errorMessage, data);
	}
};

export default status;
