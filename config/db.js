const mongoose = require('mongoose')
const colors = require('colors')

const connectDb  = async() =>{
    try{
        await mongoose.connect(process.env.mongo_url)
        console.log(`Connect to database ${mongoose.connection.host}`.bgCyan.white)
    }catch(error){
        console.log(error)
    }
}

module.exports = connectDb;