import nodemailer from "nodemailer";
import { SendMailOptions, SentMessageInfo } from "nodemailer";

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 465,
  secure: true,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASSWORD
  }
});

export function sendMail(options: SendMailOptions): Promise<SentMessageInfo> {
  return transporter.sendMail(options);
}
