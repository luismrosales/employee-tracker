const mysql = require("mysql2");

const db = mysql.createConnection(
  {
    socketPath: "/tmp/mysql.sock",

    user: "root",

    password: "",
    database: "workforce",
  },
  console.log("Connected to the workforce database.")
);
db.connect((err) => {
  if (err) {
    return console.error("error " + err.message);
  }
  console.log("Connected");
});
module.exports = db;
