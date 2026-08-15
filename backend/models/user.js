const mongoose = require('mongoose')

// Creating MongoDB schema
const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },

    passwordHash: {
        type: String,
        required: true,
    },

    email: {
        type: String,
        required: false,
    }        
})

// Modifying schema, which is returned when document is fetched 
userSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
    delete returnedObject.passwordHash
    }
})

// Making a model with schema
const User = mongoose.model('User', userSchema)

module.exports = User