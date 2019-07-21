import git from "simple-git/promise";
import * as Sentry from "@sentry/electron";
import gitCommand from "../mixins/commands";

const show = async (repository, params) => {
	const data = await git(repository.path).show(params);
	try {
		gitCommand("show", params.join(" "));
		return data;
	} catch (error) {
		Sentry.captureException(error);
		let errorMessage = "Unable to run git show command.";
		console.log(errorMessage);
		Sentry.captureMessage(errorMessage, data);
	}
};

export default show;
