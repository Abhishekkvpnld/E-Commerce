
import nodemailer from 'nodemailer';

// Configure the transporter
const transporter = nodemailer.createTransport({
  service: 'gmail', // e.g., Gmail
  auth: {
    user: 'Eshop online shopping', // replace with your email
    pass: 'your-email-password' // replace with your email password
  }
});

export const sendMail = async (to, subject, text) => {
  const mailOptions = {
    from: 'your-email@gmail.com', // sender address
    to, // list of receivers
    subject, // Subject line
    text // plain text body
  };

  try {
    let info = await transporter.sendMail(mailOptions);
    console.log('Message sent: %s', info.messageId);
    console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
  } catch (error) {
    console.error('Error sending email:❌❌❌❌❌', error);
  }
};
