const nodemailer = require('nodemailer');
const dotenv = require('dotenv');

dotenv.config();

const testEmail = async () => {
    console.log('Testing Email configuration with:');
    console.log('User:', process.env.EMAIL_USER);
    console.log('Pass:', process.env.EMAIL_PASS ? '***' + process.env.EMAIL_PASS.slice(-4) : 'NO PASSWORD SET');

    try {
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASS
            }
        });

        console.log('Transporter created, verifying connection...');
        await transporter.verify();
        console.log('Server is ready to take our messages (Authentication Successful)');

        console.log('Attempting to send a test email to', process.env.EMAIL_USER);
        const info = await transporter.sendMail({
            from: `"CraveBite Admin" <${process.env.EMAIL_USER}>`,
            to: process.env.EMAIL_USER, // sending to self
            subject: "CraveBite Nodemailer Test",
            text: "If you receive this, Nodemailer is working perfectly!",
            html: "<b>If you receive this, Nodemailer is working perfectly!</b>",
        });

        console.log("Message sent: %s", info.messageId);
        process.exit(0);
    } catch (error) {
        console.error('Nodemailer Error Details:');
        console.error(error);
        process.exit(1);
    }
};

testEmail();
