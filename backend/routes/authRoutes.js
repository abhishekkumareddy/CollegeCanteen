const express = require('express');
const router = express.Router();
const {
    registerUser,
    loginUser,
    verifyEmail,
} = require('../controllers/authController');

router.post('/signup', registerUser);
router.post('/login', loginUser);
router.post('/verify-email', verifyEmail);

module.exports = router;
