const nodemailer = require('nodemailer');
const dotenv = require('dotenv');

// Load environment variables from .env file
dotenv.config();
// Create a reusable transporter using Gmail (or any other service you prefer)
const transporter = nodemailer.createTransport({
   host: 'smtp.gmail.com', // SMTP server
  port: 587,              // TLS port (587)
  secure: false,          // Use TLS
    // service: 'gmail',
  auth: {
   user: process.env.EMAIL_USER,   // Use the email stored in the .env file
    pass: process.env.EMAIL_PASS,   // Use the generated app password
  },
  logger: true, // Enable logger to get detailed info about email sending process
});

// Function to send registration email
const sendRegistrationEmail = async (email, fullName) => {
 
 const mailOptions ={
    from:`"Ssbr iNet", ${process.env.EMAIL_USER}`, // Sender's email
    to:email,                          // Recipient email (dynamic)
    subject: 'Registration Successful',
   // HTML email content with inline CSS
    html: `
      <html>
        <head>
          <style>
            body {
              font-family: Arial, sans-serif;
              color: #333;
            }
            .container {
              width: 100%;
              padding: 20px;
              background-color: #f4f4f4;
            }
            .content {
              background-color: white;
              padding: 30px;
              border-radius: 8px;
              box-shadow: 0px 2px 5px rgba(0, 0, 0, 0.1);
            }
            h1 {
              color: #4CAF50;
              font-size: 24px;
              margin-bottom: 20px;
            }
            p {
              font-size: 16px;
            }
            .footer {
              margin-top: 30px;
              font-size: 12px;
              color: #888;
            }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="content">
              <h1>Welcome, ${fullName}!</h1>
              <p>Thank you for registering with us. We are excited to have you onboard.</p>
              <p>Best regards,<br>Your Team</p>
            </div>
            <div class="footer">
              <p>If you did not register, please ignore this email.</p>
            </div>
          </div>
        </body>
      </html>
    `,
  };

 try {
    // Send the email
    const info = await transporter.sendMail(mailOptions);
    console.log('Email sent:', info);
  } catch (error) {
    console.error('Error details:', error);  // Log full error object for more info
    throw new Error('Email could not be sent');
  }
 
};

module.exports = { sendRegistrationEmail };
