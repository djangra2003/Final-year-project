const express = require('express');
const { generateOtp, sendOtpToEmail, sendOtpToPhone } = require('../services/otpService');

const router = express.Router();

router.post('/send-otp', async (req, res) => {
  const { contactMethod, contact } = req.body;

  try {
    const otp = generateOtp();

    if (contactMethod === 'email') {
      await sendOtpToEmail(contact, otp);
    } else {
      await sendOtpToPhone(contact, otp);
    }

    res.status(200).json({ message: 'OTP sent successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Failed to send OTP', error: error.message });
  }
});

module.exports = router;