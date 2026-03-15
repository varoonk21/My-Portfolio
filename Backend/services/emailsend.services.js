const { Resend } = require('resend');

async function sendemail(name, email, message) {
  const resend = new Resend(process.env.RESEND_EMAIL_API_KEY);
  const emailTemplate = `
<!DOCTYPE html>
<html>
<head>
  <style>
    body {
      font-family: Arial, sans-serif;
      background-color: #f9f9f9;
      padding: 20px;
      color: #333;
    }
    .container {
      max-width: 600px;
      background-color: #ffffff;
      padding: 20px;
      margin: auto;
      border-radius: 8px;
      box-shadow: 0 2px 8px rgba(0,0,0,0.1);
    }
    p {
      line-height: 1.6;
    }
    .label {
      font-weight: bold;
    }
  </style>
</head>
<body>
  <div class="container">
    <p><span class="label">Name:</span> ${name}</p>
    <p><span class="label">Email:</span> ${email}</p>
    <p><span class="label">Message:</span></p>
    <p>${message}</p>
  </div>
</body>
</html>`;
  try {
    await resend.emails.send({
      from: process.env.SENDER_EMAIL,
      to: process.env.RECIVING_EMAIL,
      subject: `Message from ${name} from Portfolio Website`,
      html: emailTemplate
    });
  } catch (error) {
    console.log(error);
    throw error;
  }
}
module.exports = { sendemail };