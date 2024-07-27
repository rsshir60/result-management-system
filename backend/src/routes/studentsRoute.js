const express = require('express');
const router = express.Router();
const studentsController = require('../controllers/studentsController')
const { protect } = require('../middlewares/auth');
const { getStudentResults } = require('../controllers/studentsController');


router.get('/results', protect, getStudentResults);




router.all("/*", (req, res)=>{ return res.status(400).send({status:false, message:"check your URL"}) })
module.exports = router;