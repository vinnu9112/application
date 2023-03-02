const express = require('express');

const connectToMongo = require("./db");
connectToMongo();

const app = express();
const port = 8080
// app.get('/', (req, res)=>{
//     res.send("hello")
// })

app.use(express.json()) // middleware to use req.body

// Available Routes
app.use('/api/auth', require('./routes/auth'))
app.use('/api/details', require('./routes/details'))

app.listen(port, ()=>{
    console.log(`listening at port http://localhost:${port}`);
})