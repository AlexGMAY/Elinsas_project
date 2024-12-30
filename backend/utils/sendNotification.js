const nodemailer = require('nodemailer');
const twilio = require('twilio');

const twilioClient = twilio(process.env.TWILIO_ACCOUNT_SID, process.env.TWILIO_AUTH_TOKEN);

// Send SMS Notification
const sendSmsNotification = async (phoneNumber, message) => {
  try {
    await twilioClient.messages.create({
      body: message,
      from: process.env.TWILIO_PHONE_NUMBER,
      to: phoneNumber,
    });
    console.log(`SMS sent to ${phoneNumber}`);
  } catch (error) {
    console.error('Failed to send SMS:', error.message);
  }
};

// Send Email Notification
const sendEmailNotification = async (email, subject, message) => {
  try {
    const transporter = nodemailer.createTransport({
      service: 'gmail', // Or another service
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: email,
      subject,
      text: message,
    });
    console.log(`Email sent to ${email}`);
  } catch (error) {
    console.error('Failed to send email:', error.message);
  }
};

module.exports = { sendSmsNotification, sendEmailNotification };
