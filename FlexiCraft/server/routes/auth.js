const express = require('express');
const { registerUser, loginUser,refreshToken,forgotPassword,resetPasswordForm,updatePassword } = require('../controllers/authController');

const router = express.Router();

router.post('/register', registerUser);
router.post('/login', loginUser);
router.post('/refresh-token', refreshToken);
router.post('/forgot-password',forgotPassword);
router.get('/reset-password/:token', resetPasswordForm);
router.post('/reset-password/:token', updatePassword);
module.exports = router;
