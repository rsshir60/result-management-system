const express = require('express');
const router = express.Router();
const AdminController = require('../controllers/AdminController')


router.get('/', async (req, res) => {
    try {
        res.json({msg : "Admin Route is on steroid"})
     
    } catch (error) {
      res.status(500).json({ message: 'Error fetching examples', error: error.message });
    }
  });



router.all("/*", (req, res)=>{ return res.status(400).send({status:false, message:"check your URL"}) })
module.exports = router;