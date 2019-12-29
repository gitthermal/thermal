const sqlite3 = require("sqlite3").verbose();
const database = new sqlite3.Database("thermal.sqlite");

export default database;
