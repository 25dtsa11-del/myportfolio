const express = require("express");
const mysql = require("mysql2");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "Lia#123@",
  database: "alia_db"
});

db.connect(err => {
  if (err) console.log(err);
  else console.log("MySQL Connected");
});

app.post("/contact", (req, res) => {
  const { name, email, message } = req.body;

  const sql = "INSERT INTO contacts (name,email,message) VALUES (?,?,?)";

  db.query(sql, [name, email, message], (err) => {
    if (err) return res.status(500).send(err);
    res.send("Saved");
  });
});

app.listen(5000, () => console.log("Server running"));