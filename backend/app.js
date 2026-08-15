const express = require('express')
const app = express()
const config = require('./utils/config')
const mongoose = require('mongoose')

// Controllers
const userRouter = require('./controllers/user')

// Creating MongoDB connection
console.log(`Connecting to: ${config.mongoUrl}`)
mongoose
    .connect(config.mongoUrl, { family: 4 })
    .then(console.log('connected to MongoDB'))
    .catch(err => console.log(`Error with connecting to MongoDB ${err}`))

app.use(express.json())
app.use('/api/users', userRouter)

module.exports = app