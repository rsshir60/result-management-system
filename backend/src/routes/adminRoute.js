const express = require('express');
const router = express.Router();


const upload = require('../middlewares/upload');
const { uploadMarks } = require('../controllers/adminController');
const { protect, admin } = require('../middlewares/auth');

router.post('/upload-attendance', protect, admin, upload.single('file'), (req, res) => {
  req.body.type = 'attendance';
  uploadMarks(req, res);
});

router.post('/upload-project-review', protect, admin, upload.single('file'), (req, res) => {
  req.body.type = 'project-review';
  uploadMarks(req, res);
});

router.post('/upload-assessment', protect, admin, upload.single('file'), (req, res) => {
  req.body.type = 'assessment';
  uploadMarks(req, res);
});

router.post('/upload-project-submission', protect, admin, upload.single('file'), (req, res) => {
  req.body.type = 'project-submission';
  uploadMarks(req, res);
});

router.post('/upload-linkedin-post', protect, admin, upload.single('file'), (req, res) => {
  req.body.type = 'linkedin-post';
  uploadMarks(req, res);
});






router.all("/*", (req, res)=>{ return res.status(400).send({status:false, message:"check your URL"}) })
module.exports = router;