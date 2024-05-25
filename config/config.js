const mongoose = require('mongoose');
require('dotenv').config();

async function dbConnect () {
    try{
        await mongoose.connect(process.env.MONGO_URI);
        console.log('DONE : data base initialized');
    }catch(err){
        console.error(err);
        throw new Error ('ERROR : can not initialize data base');
    }
}

module.exports = {dbConnect}