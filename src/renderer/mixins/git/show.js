import git from "simple-git/promise";
import * as Sentry from "@sentry/electron";

const show = async (repository, params) => {
	const data = await git(repository.path).show(params);
	try {
		return data;
	} catch (error) {
		Sentry.captureException(error);
		let errorMessage = "Unable to fetch logs.";
		console.log(errorMessage);
		Sentry.captureMessage(errorMessage, data);
	}
};

export default show;
