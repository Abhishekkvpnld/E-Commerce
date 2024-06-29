import nodemailer from "nodemailer";
import dotenv from "dotenv";

dotenv.config();

const userEmail = process.env.USER_EMAIL;
const userPassword = process.env.EMAIL_PASSWORD;

// Configure the transporter
const transporter = nodemailer.createTransport({
  service: "gmail",
  host: "smtp.gmail.com",
  port: 587,
  secure: false, // Use `true` for port 465, `false` for all other ports
  auth: {
    user: userEmail,
    pass: userPassword,
  },
});

export const sendMail = async (to, subject, text) => {
  const mailOptions = {
    from: {
      name: "Eshop online shopping",
      address: process.env.USER_EMAIL,
    }, // sender address
    to, // list of receivers
    subject, // Subject line
    text, // plain text body
  };

  try {
    let info = await transporter.sendMail(mailOptions);
    console.log("Message sended✅");
    console.log("Message sent: %s", info.messageId);
  } catch (error) {
    console.error("Error sending email: ", error);
  }
};
