import git from "simple-git/promise";
import * as Sentry from "@sentry/electron";

const log = {
	data() {
		return {
			logs: []
		};
	},
	async mounted() {
		const gitLog = await git(this.currentRepository.path).log();
		try {
			this.logs = gitLog.all;
		} catch (error) {
			Sentry.captureException(error);
			let errorMessage = "Unable to fetch logs.";
			console.log(errorMessage);
			Sentry.captureMessage(errorMessage, gitLog.all);
		}
	}
};

export default log;
