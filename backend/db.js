const mongoose =  require("mongoose");
mongoose.set('strictQuery', false);

const mongoURI = "mongodb://localhost:27017/application-form"

const connectToMongo = ()=>{
    mongoose.connect(mongoURI, ()=>{
        console.log("Connection Established");
    })
}

module.exports = connectToMongo;