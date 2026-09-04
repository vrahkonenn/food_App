const userRouter = require('express').Router()
const User = require('../models/user')
const bcrypt = require('bcrypt')
const middleware = require('../utils/middleware')

// Get all users
userRouter.get('/', async (request, response, next) => {
  try {
    const populatedUsers = await User.find({}).populate('recipes', {name: 1})
    response.json(populatedUsers)
  } catch (error) {
    next(error)
  }
})

// Get initial user
userRouter.get('/:id', async (request, response, next) => {
  try {
    const id = request.params.id
    const populatedUser = await User.findById(id).populate('recipes', {name: 1})
    response.json(populatedUser)
  } catch (error) {
    next(error)
  }
})

// Create user
userRouter.post('/', async (request, response, next) => {
  try {
    const { username, password, email } = request.body

    // Error checks
    if (!username || !password) {
      return response.status(400).json({
        error: 'Password and username are required!'
      })
    }

    // Hashing password with bcrypt
    const saltRounds = 10
    const passwordHash = await bcrypt.hash(password, saltRounds)

    // Saving user to database
    const user = new User({
      username,
      passwordHash,
      email
    })

    const savedUser = await user.save()

    // Not returning whole savedUser object, because passwordHash should not be returned
    response.status(201).json({
      id: savedUser._id,
      username: savedUser.username,
      email: savedUser.email
    })
  } catch (error) {
    next(error)
  }
})

// Update user (for updating favourites)
userRouter.put('/profile', middleware.userExtractor, async (request, response, next) => {
  try {
    const user = request.user
    if (!user) return response.status(401).json({ error: 'User not logged in'})
    
    const id = user._id

    const userToUpdate = await User.findById(id)
    if (!userToUpdate) return response.status(404).json({ error: "user not found"})

    if (userToUpdate.id.toString() !== user.id.toString()) {
      return response.status(403).json({ error: 'You can only update your own account'})
    }

    const { username, email, favourites } = request.body
      
    const updatedUser = await User.findByIdAndUpdate(
      id,
      {
        username,
        email,
        favourites
      },
      {
        returnDocument: 'after',
        runValidators: true
      }
    )
      
    response.json(updatedUser)

  } catch (error) {
    next(error)
  }
})

module.exports = userRouter