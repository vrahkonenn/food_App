const bcrypt = require('bcrypt')
const loginRouter = require('express').Router()
const User = require('../models/user')
const jwt = require('jsonwebtoken')

loginRouter.post('/', async (request, response, next) => {
  try{
    if (!process.env.SECRET) {
      throw new Error('SECRET environment variable is not defined')
    }

    const {username, password} = request.body
    
    const user = await User.findOne({username})
    
    const passwordCorrect = user === null
    ? false
    : await bcrypt.compare(password, user.passwordHash) 
    
    if (!(user && passwordCorrect)) return response.status(401).json({ error: 'Invalid username or password'})
      
    const userForToken = {
        username: user.username,
        id: user.id
      }
      
    const token = jwt.sign(userForToken, process.env.SECRET)

    response.status(200).send({ token, username: user.username, id: user.id })

  } catch (error) {
    next(error)
  }
})

module.exports = loginRouter