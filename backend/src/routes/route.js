const express = require('express');
const router = express.Router();


//ROUTES FOR STUDENTS
router.get('/', async (req, res) => {
    try {
        res.json({msg : "Route is on steroid"})
      console.log("Hii.. i am route & i am working fine")
    } catch (error) {
      res.status(500).json({ message: 'Error fetching examples', error: error.message });
    }
  });


  //ROUTES FOR ADMIN
  

module.exports = router;