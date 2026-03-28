import { Resend } from "resend";

export default async function sendemail(name, email, message) {
  const resend = new Resend(process.env.RESEND_EMAIL_API_KEY);
  const emailTemplate = `
<!DOCTYPE html>
<html>
<head>
  <style>
    body {
      font-family: Arial, sans-serif;
      background-color: #f4f4f5;
      padding: 40px 20px;
      color: #1a1a1a;
      line-height: 1.6;
    }
    .container {
      max-width: 600px;
      background-color: #ffffff;
      padding: 32px;
      margin: 0 auto;
      border-radius: 12px;
      box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
      border: 1px solid #e4e4e7;
    }
    .header {
      margin-bottom: 24px;
      padding-bottom: 16px;
      border-bottom: 1px solid #e4e4e7;
    }
    h2 {
      margin: 0;
      color: #18181b;
      font-size: 20px;
      font-weight: 600;
      letter-spacing: -0.01em;
    }
    .field {
      margin-bottom: 24px;
    }
    .label {
      display: block;
      font-size: 13px;
      font-weight: 600;
      color: #52525b;
      text-transform: uppercase;
      letter-spacing: 0.05em;
      margin-bottom: 8px;
    }
    .value {
      font-size: 15px;
      color: #27272a;
      background-color: #fafafa;
      padding: 14px 16px;
      border-radius: 8px;
      border: 1px solid #e4e4e7;
      margin: 0;
      white-space: pre-wrap;
    }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h2>New Contact Message</h2>
    </div>
    
    <div class="field">
      <span class="label">Name</span>
      <p class="value">${name}</p>
    </div>
    
    <div class="field">
      <span class="label">Email Address</span>
      <p class="value">${email}</p>
    </div>
    
    <div class="field">
      <span class="label">Message</span>
      <p class="value">${message}</p>
    </div>
  </div>
</body>
</html>`;
  try {
    await resend.emails.send({
      from: process.env.SENDER_EMAIL,
      to: process.env.RECIVING_EMAIL,
      subject: `Message from ${name} from Portfolio Website`,
      html: emailTemplate,
    });
  } catch (error) {
    console.log(error);
    throw error;
  }
}
