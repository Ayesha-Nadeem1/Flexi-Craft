const User = require('../models/User');
const jwt = require('jsonwebtoken');
const nodemailer = require('nodemailer');
require('dotenv').config();
const JWT_SECRET = process.env.JWT_SECRET;
const bcrypt = require('bcrypt');

const JWT_EXPIRE = '1h'; // Access token expiration
const JWT_REFRESH_EXPIRE = '7d'; // Refresh token expiration

// Function to generate tokens
const generateToken = (userId) => {
  const accessToken = jwt.sign({ userId }, JWT_SECRET, { expiresIn: JWT_EXPIRE });
  const refreshToken = jwt.sign({ userId }, JWT_SECRET, { expiresIn: JWT_REFRESH_EXPIRE });
  return { accessToken, refreshToken };
};
// Register a new user
exports.registerUser = async (req, res) => {
  const { email,username, password, firstName, lastName } = req.body;

  try {
    const existingUser = await User.findOne({ username });
    if (existingUser) {
      return res.status(400).json({ message: 'Username not available' });
    }

    const existingEmail = await User.findOne({ email });
    if (existingEmail) {
      return res.status(400).json({ message: 'User already exists' });
    }

    const user = new User({ email,username, password, firstName, lastName });
    await user.save();
    const tokens = generateToken(user._id);
    //res.status(201).json(tokens);

    res.status(201).json({ message: 'User registered successfully' });
  } catch (error) {
    console.error('Error registering user:', error);
    res.status(500).json({ message: 'Error registering user', error });
  }
};

// Login user
exports.loginUser = async (req, res) => {
  const { username, password } = req.body;
  try {
    const user = await User.findOne({ username });
    if (!user) {
      return res.status(400).json({ message: 'Invalid username' });
    }

    const isMatch = await user.comparePassword(password);

    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid password' });
    }

    const tokens = generateToken(user._id);
    res.status(200).json({ tokens });
  } catch (error) {
    console.error('Error logging in user:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

exports.refreshToken = async (req, res) => {
  const { refreshToken } = req.body;
  
  if (!refreshToken) return res.sendStatus(401);

  jwt.verify(refreshToken, JWT_SECRET, (err, decoded) => {
    if (err) return res.sendStatus(403);

    const tokens = generateToken(decoded.userId);
    res.json(tokens);
  });
};

exports.forgotPassword = async (req, res) => {
  const { email } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) {
      console.log('User not found with email:', email);
      return res.status(400).json({ message: 'User not found' });
    }

    const resetToken = jwt.sign({ id: user._id }, JWT_SECRET, { expiresIn: '1h' });
    console.log('Reset token created:', resetToken);

    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.GMAIL_USER,
        pass: process.env.GMAIL_PASS,
      },
    });

    const resetLink = `http://localhost:5173/reset-password/${resetToken}`;
    console.log('Reset link created:', resetLink);

    const mailOptions = {
      from: process.env.GMAIL_USER,
      to: email,
      subject: 'Password Reset',
      text: `Click the link to reset your password: ${resetLink}`,
    };

    await transporter.sendMail(mailOptions);
    console.log('Email sent to:', email);

    res.json({ message: 'Password reset link sent to your email' });
  } catch (error) {
    console.error('Error in forgotPassword:', error);
    res.status(500).json({ message: 'Error sending email' });
  }
};

// exports.resetPassword = async (req, res) => {
//   const { token } = req.params;
//   const { password } = req.body;

//   try {
//     const decoded = jwt.verify(token, JWT_SECRET);
//     const user = await User.findById(decoded.id);

//     if (!user) {
//       return res.status(400).json({ message: 'User not found' });
//     }

//     const hashedPassword = await bcrypt.hash(password, 10);
//     console.log(hashedPassword)
//     user.password = hashedPassword;
//     await user.save();

//     res.json({ message: 'Password updated successfully' });
//   } catch (error) {
//     res.status(500).json({ message: 'Error updating password' });
//   }
// };

// Serve the reset password form
exports.resetPasswordForm = (req, res) => {
  // Simply serve the frontend with the token, the actual form handling will be in the frontend
  res.sendFile(path.join(__dirname, '../public/reset-password.html'));
};

exports.updatePassword = async (req, res) => {
  const { token } = req.params;
  const { password, confirmPassword } = req.body;

  if (password !== confirmPassword) {
    return res.status(400).json({ message: 'Passwords do not match' });
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    const user = await User.findById(decoded.id);

    if (!user) {
      return res.status(400).json({ message: 'User not found' });
    }

    // const hashedPassword = await bcrypt.hash(password, 10);
    // user.password = hashedPassword;

    // console.log(hashedPassword)
    // console.log(password)
    // const isMatch = await user.comparePassword(password);
    // if (isMatch) {console.log('hello') }
    user.password = password
    console.log(password)
    await user.save();

    res.json({ message: 'Password updated successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error updating password' });
  }
};
