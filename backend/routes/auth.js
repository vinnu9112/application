const express = require('express');
const User = require('../models/User');
const router = express.Router();
const { body, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken');
const fetchuser = require('../middleware/fetchuser')

const JWT_SECRET = "thisisatoken"

router.post('/createuser', [
    body('name', 'enter a valid name').isLength({ min: 3 }),
    body('email', 'enter a valid email').isEmail(),
    body('password', 'Minimum length should be 5').isLength({ min: 5 }),
], async (req, res) => {

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    try {
        let user = await User.findOne({ email: req.body.email })
        if (user) {
            return res.status(400).json({ error: "a user with this email already exists" })
        }

        const salt = await bcrypt.genSalt(10)
        const secPass = await bcrypt.hash(req.body.password, salt);

        user = await User.create({
            name: req.body.name,
            password: secPass,
            email: req.body.email,
        })
        const data = {
            id: user.id
        }

        const authToken = await jwt.sign(data, JWT_SECRET);

        res.json({authToken})   
    }
    catch (error) {
        console.error(error.message);
        res.status(500).send("Some error occured")
    }
})

router.post('/login',[
    body('email', 'enter a valid email').isEmail(),
    body('password', 'password cannot be blank').exists(),
], async (req, res) => {
    
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const {email, password} = req.body

    try {
        let user = await User.findOne({email});
        if(!user){
            return res.status(400).json({error: "invalid credentails"})
        }

        const passwordCompare = await bcrypt.compare(password, user.password);

        if(!passwordCompare){
            return res.status(400).json({error: "invalid credentails"})
        }

        const data = {
            id: user.id
        }

        const authToken = await jwt.sign(data, JWT_SECRET);
        res.send({authToken});

    } 
    catch (error) {
        console.error(error.message);
        res.status(500).send("Some error occured")
    }
})

router.post('/getuser',fetchuser,  async (req, res) => {
    
    try {
        let userId = req.user.id; 
        const user = await User.findById(userId).select('-password')
        res.send(user)
    } 
    catch (error) {
        console.error(error.message);
        res.status(500).send("Some error occured")
    }
})


module.exports = router