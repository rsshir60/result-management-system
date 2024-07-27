// backend/middleware/validate.js
const { z } = require('zod');

const validate = (schema) => (req, res, next) => {
  try {
    schema.parse({
      body: req.body,
      files: req.files,
    });
    next();
  } catch (err) {
    res.status(400).json({ errors: err.errors });
  }
};

module.exports = validate;