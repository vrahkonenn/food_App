const userRouter = require('express').Router()
const User = require('../models/user')
const bcrypt = require('bcrypt')


// Getting all users
userRouter.get('/', async (request, response) => {
    const users = await User.find({})
    response.json(users)
})

// Creating a new user
userRouter.post('/', async (request, response) => {
    const { username, password, email} = request.body
    
    // Error checks
    if (!username || !password) return response.status(400).json({ error: "Password and username are required!"})

    // Hashing password with bcrypt
    const saltRounds = 10
    const passwordHash = await bcrypt.hash(password, saltRounds)

    // Saving user to the database
    const user = new User ({
        username,
        passwordHash,
        email        
    })

    const savedUser = await user.save()
    response.status(201).json(savedUser)
})

module.exports = userRouter