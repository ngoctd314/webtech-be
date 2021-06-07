/**
 * Required External Modules
 */
import { createTransport } from 'nodemailer';

/**
 * Required Dev Modules
 */
import config from '@config';

/**
 * !TL;DR
 * 1. Create a Nodemailer transporter using eithre SMTP or other
 * 2. Set up message options (who send what to whom)
 * 3. Deliver the message object using the sendMail() method of your previously created transporter
 */
interface Options {
  email: string;
  subject: string;
  text: string;
  html?: string;
}

export default async function sendMail(options: Options) {
  // create transporter
  const transporter = createTransport({
    service: config.mail.service,
    auth: {
      user: config.mail.username,
      pass: config.mail.password,
    },
  });

  // send message to
  const mailOptions = {
    from: 'TDN Social Media <tdn.social.media@gmail.com>',
    to: options.email,
    subject: options.subject,
    text: options.text,
  };

  // deliver message
  await transporter.sendMail(mailOptions);
}
