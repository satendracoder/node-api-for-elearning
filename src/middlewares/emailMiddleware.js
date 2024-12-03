const { sendRegistrationEmail } = require('../utils/emailService.js');

// Middleware function to send registration email
const registrationEmailMiddleware = async (req, res, next) => {
  const {email, fullName  } = req.body;
   console.log("Data:", email, fullName);
  try {
    // Send registration email
    await sendRegistrationEmail(email, fullName);
    console.log(`Registration email sent to ${email}`);
    console.log("right",email, fullName)
    // Proceed to the next middleware or controller (in your case, registration response)
  } catch (error) {
    console.error(`Error sending email to ${email}:`, error.message|| error);
    // Send error response if email sending fails
    return res.status(500).json({ message: 'Failed to send registration email', error: error.message || error``});
  }
};

module.exports = registrationEmailMiddleware;
