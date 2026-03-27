const express = require("express");
const cors = require("cors");
const nodemailer = require("nodemailer");
require("dotenv").config();
const path = require("path");

const app = express();
const PORT = process.env.PORT || 5500;

// Middlewares
app.use(cors());
app.use(express.json());

// ✅ Serve frontend files (HTML, CSS, JS)
app.use(express.static(path.join(__dirname, "..")));

// ✅ Home route (open index.html)
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "..", "index.html"));
});

// ✅ Contact route (send email)
app.post("/contact", async (req, res) => {
  const { name, email, message } = req.body;

  if (!name || !email || !message) {
    return res.json({ success: false, error: "All fields required" });
  }

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

    res.json({ success: true });

  } catch (error) {
    console.log("Email Error:", error);
    res.json({ success: false, error: "Email failed" });
  }
});

// ✅ IMPORTANT: Listen on Railway port
app.listen(PORT, "0.0.0.0", () => {
  console.log(`Server running on port ${PORT}`);
});