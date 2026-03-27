const express = require("express");
const cors = require("cors");
const nodemailer = require("nodemailer");
const mysql = require("mysql2");
require("dotenv").config();

const app = express();
const PORT = 5500;

app.use(cors());
app.use(express.json());

// ✅ MYSQL CONNECTION
const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "Lia#123@", // ⚠️ put your MySQL password
  database: "portfolio_db"
});

db.connect((err) => {
  if (err) {
    console.log("MySQL Error:", err);
  } else {
    console.log("MySQL Connected ✅");
  }
});

// ✅ CONTACT FORM
app.post("/contact", async (req, res) => {
  const { name, email, message } = req.body;

  if (!name || !email || !message) {
    return res.json({ success: false, error: "All fields required" });
  }

  // 🔹 SAVE TO MYSQL
  const sql = "INSERT INTO messages (name, email, message) VALUES (?, ?, ?)";
  db.query(sql, [name, email, message], async (err, result) => {
    if (err) {
      console.log(err);
      return res.json({ success: false, error: "Database error" });
    }

    // 🔹 SEND EMAIL
    try {
      const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
          user: "aliafathima2006@gmail.com",
          pass: process.env.EMAIL_PASS
        },
      });

      await transporter.sendMail({
        from: "aliafathima2006@gmail.com",
        to: "aliafathima2006@gmail.com",
        subject: "New Portfolio Message",
        text: `Name: ${name}\nEmail: ${email}\nMessage: ${message}`
      });

      res.json({ success: true, message: "Message sent & saved ✅" });

    } catch (error) {
      console.log(error);
      res.json({ success: false, error: "Email failed" });
    }
  });
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});