const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true, // לכל משתמש שם ייחודי
    trim: true
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true
  },
  external_id: {
    type: String, // מזהה חיצוני למשל מ־Google/Facebook
    default: null
  },
  role: {
    type: String,
    enum: ['user', 'admin'],
    default: 'user'
  }
}, {
  timestamps: true // יוסיף createdAt ו־updatedAt
});

module.exports = mongoose.model('User', userSchema);
// This model defines the structure of the user document in the MongoDB database.