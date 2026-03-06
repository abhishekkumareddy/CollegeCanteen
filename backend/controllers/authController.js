const crypto = require('crypto');
const User = require('../models/User');
const generateToken = require('../utils/generateToken');
const sendEmail = require('../utils/sendEmail');

// @desc    Register a new user
// @route   POST /api/auth/signup
// @access  Public
const registerUser = async (req, res) => {
    try {
        const { name, email, password } = req.body;

        // Check if user exists
        const userExists = await User.findOne({ email });

        if (userExists) {
            return res.status(400).json({ message: 'User already exists' });
        }

        // Generate 6-digit OTP
        const otp = Math.floor(100000 + Math.random() * 900000).toString();

        // OTP expires in 10 minutes
        const otpExpires = Date.now() + 10 * 60 * 1000;

        // Create user
        const user = await User.create({
            name,
            email,
            password,
            verificationOTP: otp,
            verificationOTPExpires: otpExpires
        });

        if (user) {
            // Send verification email with OTP
            const message = `Your College Canteen email verification code is: ${otp}\n\nThis code will expire in 10 minutes.`;
            const html = `<p>Your College Canteen email verification code is:</p> <h2>${otp}</h2> <p>This code will expire in 10 minutes.</p>`;

            try {
                await sendEmail({
                    email: user.email,
                    subject: 'Email Verification',
                    message,
                    html
                });

                res.status(201).json({
                    message: 'User registered successfully. Please check your email to verify your account.'
                });
            } catch (err) {
                console.error(err);
                // We could delete the user or keep it and allow resend
                await User.deleteOne({ _id: user._id });
                return res.status(500).json({ message: 'Error sending email' });
            }

        } else {
            res.status(400).json({ message: 'Invalid user data' });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
};

// @desc    Verify user email with OTP
// @route   POST /api/auth/verify-email
// @access  Public
const verifyEmail = async (req, res) => {
    try {
        const { email, otp } = req.body;

        const user = await User.findOne({ email });

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        if (user.isVerified) {
            return res.status(400).json({ message: 'Email is already verified' });
        }

        if (user.verificationOTP !== otp) {
            return res.status(400).json({ message: 'Invalid OTP' });
        }

        if (user.verificationOTPExpires < Date.now()) {
            return res.status(400).json({ message: 'OTP has expired. Please request a new one.' });
        }

        user.isVerified = true;
        user.verificationOTP = undefined;
        user.verificationOTPExpires = undefined;
        await user.save();

        res.status(200).json({ message: 'Email verified successfully. You can now log in.' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
};

// @desc    Auth user & get token
// @route   POST /api/auth/login
// @access  Public
const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;

        // Check for user
        const user = await User.findOne({ email }).select('+password');

        if (!user) {
            return res.status(401).json({ message: 'Invalid email or password' });
        }

        if (!user.isVerified) {
            return res.status(401).json({ message: 'Please verify your email before logging in' });
        }

        // Check if password matches
        const isMatch = await user.matchPassword(password);

        if (isMatch) {
            res.json({
                _id: user._id,
                name: user.name,
                email: user.email,
                role: user.role,
                token: generateToken(user._id),
            });
        } else {
            res.status(401).json({ message: 'Invalid email or password' });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
};

module.exports = {
    registerUser,
    verifyEmail,
    loginUser,
};
