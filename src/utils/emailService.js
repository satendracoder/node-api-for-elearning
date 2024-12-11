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
const sendRegistrationEmail = async (email, fullName, phone) => {
 

 const mailOptions ={
    from:`"${"Ssbr iNet.."}" <${process.env.EMAIL_USER}>`, // Sender's email
    to:email,                          // Recipient email (dynamic)
    subject: 'Registration Successful',
   // HTML email content with inline CSS
    html: `
      <!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Registration Successful</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            background-color: #f4f4f4;
            margin: 0;
            padding: 0;
        }
        .container {
            width: 100%;
            max-width: 600px;
            margin: 10px auto;
            background-color: #ffffff;
            border-radius: 8px;
            box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
            overflow: hidden;
            border:0.5px solid #ccc;
        }
        .header {
            background-color: #26a69a;
            color: white;
            padding: 1px 10px;
            font-size:16px;
            text-align: center;
        }
        .content {
            padding: 20px;
        }
            .social-icons {
            text-align: center;
            padding: 20px 0;
        }

        .social-icons svg {
            margin: 0 5px;
            width: 32px;
            height: 32px;
            display: inline-block;
        }
        .footer {
            padding: 5px 10px;
            text-align: center;
            background-color: #f1f1f1;
            font-size: 12px;
            color: #777;
        }
        a {
            color: #26a69a;
            text-decoration: none;
        }
    </style>
</head>
<body>

    <div class="container">
        <div class="header">
            <h2>Welcome to Ssbr iNet...</h2>
        </div>
        <div class="content">
            <h3>Your Registration is Successful!</h3>
            <p>Dear ${fullName},</p>
            <p>Thank you for registering with us! We’re thrilled to have you as part of our community.</p>
            <p><strong>Your Account Details:</strong></p>
            <ul>
                <li><strong>Name :</strong> ${fullName}</li>
                <li><strong>Email:</strong> ${email}</li>
                <li><strong>Mobile No:</strong> ${phone}</li>
            </ul>
            <p>To begin exploring all the features we offer, simply log in to your account using the link below:</p>
            <p><a href="www.ssbrinet.com/login">Login to Your Account</a></p>
            <p>If you have any questions or need assistance, don’t hesitate to reach out to our support team at info@ssbrinet.com. We’re here to help!</p>
            <p>Thank you for joining Ssbr iNet. We look forward to serving you!</p>
        </div>

<!-- Social Media Icons -->
        <div class="social-icons">
            <a href="https://linkedin.com/ssbrinet" target="_blank">
                <img src="/assets/images/linkedin-brands-solid.svg" alt="LinkedIn">
            </a>
            <a href="https://github.com/ssbrinet" target="_blank">
                <img src="/assets/images/github-brands-solid.svg" alt="GitHub">
            </a>
            <a href="https://facebook.com/ssbrinet" target="_blank">
                <img src="/assets/images/facebook-brands-solid.svg" alt="Facebook">
            </a>
            <a href="https://instagram.com/ssbrinet" target="_blank">
                <img src="/assets/images/instagram-brands-solid.svg" alt="Instagram">
            </a>
            <a href="https://twitter.com/ssbrinet" target="_blank">
                <img src="/assets/images/twitter-brands-solid.svg" alt="Twitter">
            </a>
        </div>
        
        <div class="footer">
            <p>&copy; 2019-2024 Ssbr iNet. All rights reserved.</p>
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
