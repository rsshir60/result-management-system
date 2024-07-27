
const express = require('express');

const { registerUser, authUser } = require('../controllers/authController');
const { registerSchema, loginSchema } = require('../validations/authValidation');
const validate = require('../middlewares/validate');
const router = express.Router();

router.post('/signup', validate(registerSchema), registerUser);
router.post('/login', validate(loginSchema), authUser);
module.exports = router;









