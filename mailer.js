import nodemailer from "nodemailer";
import dotenv from "dotenv";

dotenv.config();

const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASSWORD,
    },
});

// async..await is not allowed in global scope, must use a wrapper
export async function send_mail(user) {
    // send mail with defined transport object
    const info = await transporter.sendMail({
        from: "hamzaplojovic9@gmail.com", // sender address
        to: "ilhanbuhic@hotmail.com", // list of receivers
        subject: "Login od Tic Tac Toe", // Subject line
        text: `${user} has logged in`, // plain text body
        html: `<b>${user} has logged in</b>`, // html body
    });

    console.log("Message sent: %s", info.messageId);
}
