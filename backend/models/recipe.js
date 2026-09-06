const mongoose = require('mongoose')

// Creating schema for recipes
const ingredientSchema = new mongoose.Schema (
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },

    amount: {
      type: Number,
      required: true,
      min: 0,
    },

    unit: {
      type: String,
      required: true,
      trim: true
    }
  },
  { _id: false }
)

const instructionSchema = new mongoose.Schema (
  {
    step: {
      type: Number,
      required: true,
      min: 1,
    },

    description: {
      type: String,
      required: true,
      trim: true
    }
  },
  { _id: false }
)

const commentSchema = new mongoose.Schema (
  {
    text: {
      type: String,
      required: true,
      trim: true,
    },

    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },
  },
  {
    timestamps: true
  }
)

const ratingSchema = new mongoose.Schema(
  {
    rating: {
      type: Number,
      required: true,
      min: 1,
      max: 5
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true
    }
  },
  {
    timestamps: true
  }
)

const recipeSchema = new mongoose.Schema (
  {
    name: {
      type: String,
      required: true,
      trim: true
    },

    description: {
      type: String,
      trim: true
    },

    servings: {
      type: Number,
      required: true,
      min: 1,
    },

    image: {
      type: String
    },

    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },

    ingredients: {
      type: [ingredientSchema],
      required: true,

      validate: {
        validator: (ingredients) => ingredients.length > 0,
        message: "Recipe must have at least 1 ingredient"
      }
    },

    instructions: {
      type: [instructionSchema],
      required: true,

      validate: {
        validator: (instructions) => instructions.length > 0,
        message: "Recipe must have at least 1 step"
      }
    },

    comments: {
      type: [commentSchema],
    },

    ratings: {
      type: [ratingSchema]
    },
  },
  {
    timestamps: true
  }
)

recipeSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  }
})

const Recipe = mongoose.model('Recipe', recipeSchema)

module.exports = Recipe
