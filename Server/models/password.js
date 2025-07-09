const mongoose = require('mongoose');

const passwordSchema = new mongoose.Schema({
  user_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
    unique: true
  },
  password_hash: {
    type: String,
    required: true
  },
  salt: {
    type: String,
    required: true
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Password', passwordSchema);
// This model defines the structure of the password document in the MongoDB database.