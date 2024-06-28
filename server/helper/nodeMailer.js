
import nodemailer from 'nodemailer';

// Configure the transporter
const transporter = nodemailer.createTransport({
    service: "gmail",
    host: "smtp.gmail.com",
    port: 587,
    secure: false, // Use `true` for port 465, `false` for all other ports
    auth: {
        user: "abhishekproject587@gmail.com",
        pass: "kiyocugyjznwpcsb",
    },
});

export const sendMail = async (to, subject, text) => {
    const mailOptions = {
        from: {
            name: "Eshop online shopping",
            address: process.env.USER_EMAIL
        }, // sender address
        to, // list of receivers
        subject, // Subject line
        text,// plain text body
    }; 

    try {
        let info = await transporter.sendMail(mailOptions);
        console.log("Message sended ✅✅✅✅✅✅✅")
        console.log('Message sent: %s', info.messageId);
        console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
    } catch (error) {
        console.error('Error sending email:❌❌❌❌❌', error);
    }
};
