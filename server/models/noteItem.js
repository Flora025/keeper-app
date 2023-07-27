// import mongoose to create mongoose model
const mongoose = require('mongoose');

const NoteItemSchema = new mongoose.Schema({
  // TODO:
  title: {
    type: String,
    required: true
  },
  content: {
    type: String,
    required: true
  }
});

module.exports = mongoose.model('note', NoteItemSchema);
