const express = require("express");
const cors = require("cors");
const nodemailer = require("nodemailer");
const path = require("path");
require("dotenv").config();

const app = express();

// ✅ IMPORTANT FOR RAILWAY
const PORT = process.env.PORT || 5500;

app.use(cors());
app.use(express.json());

// ✅ SERVE FRONTEND FILES (VERY IMPORTANT)
app.use(express.static(path.join(__dirname, "..")));

// ✅ HOME ROUTE (SHOW YOUR WEBSITE)
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "..", "index.html"));
});

// ✅ CONTACT FORM (EMAIL)
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

// ✅ START SERVER
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
New