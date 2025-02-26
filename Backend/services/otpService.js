const nodemailer = require('nodemailer');
const twilio = require('twilio');

// Configure nodemailer
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

// Configure Twilio
const twilioClient = twilio(process.env.TWILIO_ACCOUNT_SID, process.env.TWILIO_AUTH_TOKEN);

// Generate OTP
const generateOtp = () => {
  return Math.floor(100000 + Math.random() * 900000).toString();
};

// Send OTP via email
const sendOtpToEmail = async (email, otp) => {
  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: email,
    subject: 'Your OTP Code',
    text: `Your OTP code is ${otp}`,
  };

  await transporter.sendMail(mailOptions);
};

// Send OTP via phone
const sendOtpToPhone = async (phone, otp) => {
  await twilioClient.messages.create({
    body: `Your OTP code is ${otp}`,
    from: process.env.TWILIO_PHONE_NUMBER,
    to: phone,
  });
};

module.exports = {
  generateOtp,
  sendOtpToEmail,
  sendOtpToPhone,
};