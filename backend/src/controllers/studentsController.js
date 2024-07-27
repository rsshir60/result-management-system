// backend/controllers/studentController.js
const Result = require('../models/resultModel');

const getStudentResults = async (req, res) => {
  try {
    const results = await Result.find({ studentId: req.user._id });
    res.json(results);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching results', error });
  }
};

module.exports = {
  getStudentResults,
};
