const mysql = require("mysql2");
const PORT = process.env.PORT || 3001;
const app = express();
const express = require("express");

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use((req, res) => {
  res.status(404).end();
});
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
