const express = require('express')
const app = express()
const config = require('./utils/config')
const mongoose = require('mongoose')

// Routers
const userRouter = require('./controllers/user')
const loginRouter = require('./controllers/login')
const recipeRouter = require('./controllers/recipe')

// Middleware
const middleware = require('./utils/middleware')

// Creating MongoDB connection
console.log(`Connecting to: ${config.mongoUrl}`)
mongoose
    .connect(config.mongoUrl, { family: 4 })
    .then(() => console.log('connected to MongoDB'))
    .catch(err => console.log(`Error with connecting to MongoDB ${err}`))

app.use(express.json())
app.use(middleware.requestLogger)
app.use(middleware.tokenExtractor)

app.use('/api/users', userRouter)
app.use('/api/login', loginRouter)
app.use('/api/recipes', recipeRouter)

app.use(middleware.unknownEndpoint)
app.use(middleware.errorHandler) 

module.exports = app