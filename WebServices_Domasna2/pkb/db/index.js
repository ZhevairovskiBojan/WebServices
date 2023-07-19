const mongoose = require("mongoose");
const dotenv = require("dotenv");

dotenv.config({path: `${__dirname}/../../config.env`});

const DB = process.env.DATABASE.replace(
    "<PASSWORD>", 
    process.env.DATABASE_PASSWORD);

//* Kreiravme funkcija so koja funkcija kje eksportirame i kje povikame vo app.js (povrzuvanje so database)
exports.init = async() => {
    try{
        await mongoose.connect(DB, {
            useNewUrlParser: true, 
            useUnifiedTopology: true
        });
        console.log("Successfully concected to DATABASE.");
    }
    catch(err){
        console.log(err);
    }
}