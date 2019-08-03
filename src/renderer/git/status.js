import git from "simple-git/promise";
import * as Sentry from "@sentry/electron";
import gitCommand from "../mixins/commands";

const status = async repository => {
	const data = await git(repository.path).status();
	try {
		gitCommand("status");
		return data;
	} catch (error) {
		Sentry.captureException(error);
		let errorMessage = "Unable to run git status command.";
		console.log(errorMessage);
		Sentry.captureMessage(errorMessage, data);
	}
};

export default status;
