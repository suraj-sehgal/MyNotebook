const mongoose = require('mongoose');

const mongoURI ="mongodb://localhost:27017/mynotebook"

connectToMongo().catch(err => console.log(err));

async function connectToMongo() {
    await mongoose.connect('mongodb://127.0.0.1:27017/test');
    console.log("Connected to Mongo Successfully")
  }


module.exports= connectToMongo;