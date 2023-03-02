const express = require('express');
const router = express.Router();
const { body, validationResult } = require('express-validator'); 
const fetchuser = require('../middleware/fetchuser')
const Detail = require('../models/Detail');


router.get('/fetchalldetails',fetchuser, async (req, res)=>{
    try {        
        const details = await Details.find({user: req.id})
        res.json(details)
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
        const savedNote = detail.save();
        res.json(savedNote)
    }
    catch(error){
        console.error(error.message);
        res.status(500).send("Some error occured")
    }
})


module.exports = router