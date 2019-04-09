import git from "simple-git/promise";
import * as Sentry from "@sentry/electron";

const status = async (repository) => {
	const data = await git(repository.path).status();
	try {
		return data;
	} catch (error) {
		Sentry.captureException(error);
		let errorMessage = "Unable to run git status command.";
		console.log(errorMessage);
		Sentry.captureMessage(errorMessage, data);
	}
};

export default status;
