import nodegit from "nodegit";

export const getStatus = async path => {
	let repository = await nodegit.Repository.open(path);

	let status = await repository.getStatus();
	let statusList = [];

	status.forEach(file => {
		let item = {};
		item.path = file.path();

		// X "unknown" change type (most probably a bug, please report it)
		item.symbol = "X";
		item.color = "E2E2E2";

		// A: addition of a file
		if (file.isNew()) {
			item.symbol = "A";
			item.isNew = true;
			item.color = "7CCD5F";
		}

		// R: renaming of a file
		if (file.isRenamed()) {
			item.symbol = "R";
			item.isRenamed = true;
			item.color = "3585de";
		}

		// D: deletion of a file
		if (file.isDeleted()) {
			item.symbol = "D";
			item.isDeleted = true;
			item.color = "EC746E";
		}

		if (file.isIgnored()) {
			item.isIgnored = true;
		}

		// M: modification of the contents or mode of a file
		if (file.isModified()) {
			item.symbol = "M";
			item.isModified = true;
			item.color = "57C9F6";
		}

		// T: change in the type of the file
		if (file.isTypechange()) {
			item.symbol = "T";
			item.isTypechange = true;
		}

		// U: file is unmerged (you must complete the merge before it can be committed)
		if (file.isConflicted()) {
			item.symbol = "U";
			item.isConflicted = true;
		}

		statusList.push(item);
	});

	return statusList;
};
