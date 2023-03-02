const mongoose = require("mongoose")
const {Schema} = mongoose;

const detailSchema = new mongoose.Schema({
    user:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user'
    },
    state:{
        type: String,
        required: true
    },
    city:{
        type: String,
        required: true,
    },
    date:{
        type: String,
        required: true
    }, 
    timeslot:{
        type: String,
        required:true
    },
})

const Details = mongoose.model('details', detailSchema)
Details.createIndexes()
module.exports = Details