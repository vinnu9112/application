const express = require('express');
const router = express.Router();
const { body, validationResult } = require('express-validator'); 
const fetchuser = require('../middleware/fetchuser')
const Detail = require('../models/Detail');


router.get('/fetchalldetails',fetchuser, async (req, res)=>{
    try {        
        const details = await Detail.find({user: req.id})
        res.send(details) 
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Some error occured")
    }
})
 
router.post('/adddetails', async (req, res)=>{

    const {state, city, date, timeslot} = req.body

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
  
    try{
        const detail = new Detail ({
            state, city, date, timeslot, user: req.id 
        })
        const savedNote = await detail.save(); //async await
        res.json(savedNote) 
    }
    catch(error){
        console.error(error.message);
        res.status(500).send("Some error occured")
    }
})

router.put("/updatedetails/:id", fetchuser, async (req, res) => {
    try {
      const { state, city, date, timeslot } = req.body;
      const newDetail = {};
      if (state) (newDetail.state = state);
      if (city) (newDetail.city = city);
      if (date) (newDetail.date = date);
      if (timeslot) (newDetail.timeslot = timeslot);

      let details = await Detail.findById(req.params.id); //params.id - from the endpoint
      if (!details) { return res.status(404).send("Not Found") };
  
      if (details.user.toString() !== req.user.id) { 
        return res.status(401).send("Not Allowed")
      };
  
      details = await Detail.findByIdAndUpdate(req.params.id, { $set: newDetail }, { new: true });
      res.json(details);
    } catch (error) {
      console.error(error.message);
      res.status(500).send("Internal Server Error");
    }
  });

  router.delete("/deletedetails/:id", fetchuser, async (req, res) => {
    try {
  
      let details = await Detail.findById(req.params.id);
      if (!details) { return res.status(404).send("Not Found") };
  
    //   if (details.user.toString() !== req.user.id) {
    //     return res.status(401).send("Not Allowed")
    //   };
  
      details = await Detail.findByIdAndDelete(req.params.id);
      res.json({ "Success": "Detail has been deletd", details: details });
    } catch (error) {
      console.error(error.message);
      res.status(500).send("Internal Server Error");
    }
  });


module.exports = router