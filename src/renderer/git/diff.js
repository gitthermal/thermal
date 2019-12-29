import git from "simple-git/promise";
import * as Sentry from "@sentry/electron";
import gitCommand from "../mixins/commands";

const diff = async (path, params) => {
	const data = await git(path).diff(params);
	try {
		gitCommand("diff", params.join(" "));
		return data;
	} catch (error) {
		Sentry.captureException(error);
		let errorMessage = "Unable to show file diff.";
		console.log(errorMessage);
		Sentry.captureMessage(errorMessage, data);
	}
};

export default diff;
