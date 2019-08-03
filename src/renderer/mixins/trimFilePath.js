export default data => {
	let files = [];
	for (let i = 0; i < data.length; i++) {
		files.push(data[i].replace(/\|.*/, "").trim());
	}
	return files;
};
