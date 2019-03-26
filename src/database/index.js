const sqlite3 = require("sqlite3").verbose()

const database = new sqlite3.Database("thermalapp")

database.serialize(() => {
	database.run("CREATE TABLE IF NOT EXISTS repositories(name VARCHAR(100), path VARCHAR(1000));")
})

database.serialize(() => {
	database.run("INSERT into repositories(name, path) VALUES ('thermal', 'C:/Users/YASHU/Desktop/thermal')")
})

database.serialize(() => {
	database.all("SELECT * from repositories", (err, rows) => {
		if (err) {
			console.log(err)
		} else {
			console.log(rows)
		}
	})
})
