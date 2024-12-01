const User = require('../models/User');
const bcrypt = require('bcryptjs');
const path = require('path');
const fs = require('fs');

exports.updateUserProfile = async (req, res) => {
  const { username, currentPassword, newPassword } = req.body;
  const user = await User.findById(req.user._id);

  if (!user) {
    return res.status(404).json({ message: 'User not found' });
  }

  if(currentPassword){
    const isMatch = await bcrypt.compare(currentPassword, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Incorrect current password' });
    }
  }
  

  user.username = username || user.username;
  if (newPassword) {
    user.password = newPassword
  }
  if (req.file) {
    user.profilePic = req.file.filename;
  }

  await user.save();
  res.status(200).json({
    id: user._id,
    username: user.username,
    profilePic: user.profilePic,
  });
};

exports.deleteProfilePic = async (req, res) => {
  const user = await User.findById(req.user._id);
  if (!user) {
    return res.status(404).json({ message: 'User not found' });
  }

  if (user.profilePic) {
    const filePath = path.join(__dirname, '../uploads', path.basename(user.profilePic));
    fs.unlink(filePath, (err) => {
      if (err) {
        console.error('Error deleting file:', err);
      }
    });
  }

  user.profilePic = null;
  await user.save();
  res.status(200).json({ message: 'Profile picture removed' });
};

exports.getUserProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);
    if (!user) return res.status(404).json({ message: 'User not found' });
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};
