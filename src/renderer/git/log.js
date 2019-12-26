import git from "simple-git/promise";
import * as Sentry from "@sentry/electron";
import gitCommand from "../mixins/commands";

const log = async (path, params) => {
	const data = await git(path).log(params);
	try {
		let command = !!params === true ? params.join(" ") : "";
		gitCommand("log", command);
		return data.all;
	} catch (error) {
		Sentry.captureException(error);
		let errorMessage = "Unable to fetch logs.";
		console.log(errorMessage);
		Sentry.captureMessage(errorMessage, data);
	}
};

export default log;
