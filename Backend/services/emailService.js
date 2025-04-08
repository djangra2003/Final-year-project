const nodemailer = require('nodemailer');
 require('dotenv').config();
 
 const transporter = nodemailer.createTransport({
     service: 'gmail',
     auth: {
         user: process.env.EMAIL_USER,
         pass: process.env.EMAIL_PASSWORD
     }
 });
 
 const sendEmail = async ({ firstName, lastName, email, phone, message }) => {
     try {
         const mailOptions = {
             from: process.env.EMAIL_USER,
             to: 'harshita85jangra@gmail.com',
             subject: `New Contact Form Submission from ${firstName} ${lastName}`,
             html: `
                 <h2>New Contact Form Submission</h2>
                 <p><strong>Name:</strong> ${firstName} ${lastName}</p>
                 <p><strong>Email:</strong> ${email}</p>
                 <p><strong>Phone:</strong> ${phone || 'Not provided'}</p>
                 <p><strong>Message:</strong> ${message}</p>
             `
         };
 
         const info = await transporter.sendMail(mailOptions);
         return { success: true, message: 'Email sent successfully', info };
     } catch (error) {
         console.error('Error sending email:', error);
         return { success: false, message: 'Failed to send email', error };
     }
 };
 
 module.exports = {
     sendEmail
 };