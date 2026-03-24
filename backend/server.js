const express = require("express");
const cors = require("cors");
const nodemailer = require("nodemailer");
require("dotenv").config(); // to use .env file for password

const app = express();
const PORT = 5500;

app.use(cors());
app.use(express.json());

// Contact form route
app.post("/contact", async (req, res) => {
  const { name, email, message } = req.body;

  if (!name || !email || !message) {
    return res.json({ success: false, error: "All fields are required" });
  }

  try {
    // Create transporter
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: "aliafathima2006@gmail.com", // your Gmail
        pass: process.env.EMAIL_PASS      // your app password
      },
    });

    // Test connection (optional, helps debug)
    await transporter.verify();

    // Mail options
    const mailOptions = {
      from: "aliafathima2006@gmail.com", // must be your Gmail
      replyTo: email,                    // user’s email for reply
      to: "aliafathima2006@gmail.com",   // receive the message
      subject: "New Portfolio Message",
      text: `Name: ${name}\nEmail: ${email}\nMessage: ${message}`,
    };

    // Send email
    await transporter.sendMail(mailOptions);

    res.json({ success: true, message: "Thank you for responding! 😊" });
  } catch (error) {
    console.error("Email sending error:", error);
    res.json({ success: false, error: "Failed to send email." });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});