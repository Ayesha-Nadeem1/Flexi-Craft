const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const UserSchema = new mongoose.Schema({
  email: { type: String, required: true,unique:true },
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  projects: { type: [String], default: [] },
  profilePic: { type: String, default: '' },
});

UserSchema.pre('save', async function(next) {
  if (this.isModified('password')) {
    this.password = await bcrypt.hash(this.password, 10);
    console.log('pre save:'+this.password)
  }
  next();
});

UserSchema.methods.comparePassword = function(candidatePassword) {
  console.log(candidatePassword)
  console.log(this.password)
  return bcrypt.compare(candidatePassword, this.password);
};

module.exports = mongoose.model('User', UserSchema);
