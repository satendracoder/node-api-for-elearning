// utils/email.js
const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  host: "smtp.hostinger.com",
    port: 465,
    secure: true,
  auth: {
    user: 'info@ssbrinet.com',
    pass: 'Satendra%9953',
  },
});

const sendEmail = async (email, subject, text) => {
  try {
    await transporter.sendMail({
      from: 'info@ssbrinet.com',
      to: "satendracaria@gmail.com",
      subject: "This is tesing email",
      text: "I'm satendra from Satendra Rajput",
    });
    console.log('Email sent');
  } catch (error) {
    console.error('Error sending email:', error);
  }
};

module.exports = sendEmail;
