import database from "../../database";

export default {
	methods: {
		addCommand(icon, command, path) {
			database.run(
				`INSERT INTO gitCommands(
					icon,
					command,
					path
				) VALUES(
					$icon,
					$command,
					$path
				);
			`,
				{
					$icon: icon,
					$command: command,
					$path: path
				},
				err => {
					if (err) console.log(err);
				}
			);
		},
		removeCommand(commandId) {
			database.run(
				`DELETE FROM gitCommands WHERE commandId IS $commandId`,
				{
					$commandId: commandId
				},
				err => {
					if (err) console.log(err);
				}
			);
		}
	}
};
