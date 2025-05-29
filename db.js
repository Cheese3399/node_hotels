const mongoose = require('mongoose');
require('dotenv').config();


const mongoURL = 'mongodb://localhost:27017/hotels'

// set up MongoDB conncetinon
mongoose.connect(mongoURL,{
    useNewURLParser: true,
    useUnifiedTopology: true,
})

// get the default connection
// mongoose maintain a default connection object represeting the mongoDB conncection.
const db= mongoose.connection;

// default event lisgenr for database conncetion

db.on('connected',()=>{
    console.log('conncected to MongoDB server');
})

db.on('error',(err)=>{
    console.log('MongoDB cooncection error:',err);
})

db.on('disconnected',()=>{
    console.log('MongoDb discooncectd');
}); 

// export the database connection
module.exports =db;