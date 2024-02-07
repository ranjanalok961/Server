const express = require('express')
const cors = require('cors')
const dotenv = require('dotenv')
const colors = require('colors')
const morgon = require('morgan')
const connectDb = require('./config/db')

//Dotenv 
dotenv.config()

connectDb();

//Resr object
const app = express()

//middleWare
app.use(cors())
app.use(express.json())
app.use(morgon('dev'))

//rotes 
app.use('/api/v1/auth',require('./Routes/userRoutes'))

//port
const PORT = 8084

//listen
app.listen(PORT,()=>{
    console.log(`Server Running ${PORT}`.bgGreen.white)
})


