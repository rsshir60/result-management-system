// backend/models/Result.js
const mongoose = require('mongoose');

const resultSchema = new mongoose.Schema({
  studentId: { type: String, required: true },
  type: { type: String, required: true },
  marks: { type: Number, required: true },
});

const Result = mongoose.model('Result', resultSchema);

module.exports = Result;
