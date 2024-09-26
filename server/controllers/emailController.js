const expressAsyncHandler = require("express-async-handler");
const dotenv = require("dotenv");
const nodemailer = require("nodemailer");
dotenv.config();

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: process.env.SMTP_PORT,
  secure: false,
  auth: { user: process.env.SMTP_MAIL, pass: process.env.SMTP_PASSWORD },
});

const sendEmail = expressAsyncHandler(async (req, res) => {
  const { email } = req.body;

  var mailOptions = {
    from: process.env.SMTP_MAIL,
    to: email,
    subject: "Welcome to DEV@Deakin",
    text: "We're excited to have you on board. At Deakin, we strive to provide the best experience possible, and we are confident that you'll love what we have to offer.",
  };

  try {
    const info = await transporter.sendMail(mailOptions);
    console.log("Email sent successfully:", info.response);
    return res.status(200).json({ message: "Email sent successfully" });
  } catch (error) {
    console.error("Error sending email:", error);
    return res.status(500).json({ message: "Failed to send email" });
  }
});

module.exports = { sendEmail };
