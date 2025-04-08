const { sendEmail } = require('../services/emailService');
  
  const handleContactForm = async (req, res) => {
    try {
      const { firstName, lastName, email, phone, message } = req.body;
  
      // Validate required fields
      if (!firstName || !lastName || !email || !message) {
        return res.status(400).json({
          success: false,
          message: 'Please fill in all required fields'
        });
      }
  
      // Send email
      const result = await sendEmail({
        firstName,
        lastName,
        email,
        phone,
        message
      });
  
      if (result.success) {
        res.status(200).json({
          success: true,
          message: 'Message sent successfully'
        });
      } else {
        res.status(500).json({
          success: false,
          message: 'Failed to send message'
        });
      }
    } catch (error) {
      console.error('Error in contact form submission:', error);
      res.status(500).json({
        success: false,
        message: 'Internal server error'
      });
    }
  };
  
  module.exports = {
    handleContactForm
  };