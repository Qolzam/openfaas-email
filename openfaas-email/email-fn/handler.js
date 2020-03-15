"use strict"
const nodemailer = require('nodemailer');
const md = require('markdown-it')({
  html: true,
  linkify: true,
  breaks: true,
  typographer: true
});
const emoji = require('markdown-it-emoji');
md.use(emoji)

/**
 * Request handler
 */
module.exports = async (event, context) => {

  const emailInfo = event.body

  // Convert body markdown to html
  const htmlBody = markdownToHtml(emailInfo.body)

  // Send email 
  const emailResult = await sendEmail(emailInfo.emails, emailInfo.subject, htmlBody)

  if (!emailResult.error) {
    return context
      .status(200)
      .succeed(emailResult)

  }

  return context
  .status(200)
  .succeed(emailResult)
}


/**
 * Send email
 * reference : https://codeburst.io/sending-an-email-using-nodemailer-gmail-7cfa0712a799
 */
const sendEmail = async (emailTerget, subject, text) => {
  const email = fs.readFileSync('/var/openfaas/secrets/email', 'utf8');
  const password = fs.readFileSync('/var/openfaas/secrets/password', 'utf8');

  const mailOptions = {
    from: email, // sender address
    to: emailTerget, // list of receivers
    subject: subject, // Subject line
    html: `<p>${text}</p>`// plain text body
  };
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: email,
      pass: password
    }
  });

  try {
    const info = await transporter.sendMail(mailOptions);
    return ({
      message: "Email has been sent: " + info.emails + ' : ' + info.subject,
      success: true
    })
  } catch (error) {
    return ({ error: err })
  }
}

/**
 * Convert markdown to html
 */
const markdownToHtml = (body) => {
  return md.render(body);
}