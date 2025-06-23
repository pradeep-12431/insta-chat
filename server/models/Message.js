// models/Message.js
const mongoose = require('mongoose');

const messageSchema = new mongoose.Schema({
  sender: String,
  avatar: String,
  text: String,
  time: String,
}, { timestamps: true });

module.exports = mongoose.model('Message', messageSchema);
