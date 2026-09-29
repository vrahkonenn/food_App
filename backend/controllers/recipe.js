const recipeRouter = require('express').Router()
const Recipe = require('../models/recipe')
const middleware = require('../utils/middleware')
const upload = require("../utils/upload")
const uploadImage = require("../utils/uploadImage")

// Get all recipes
recipeRouter.get('/', async (request, response, next) => {
  try {
    const populatedRecipes = await Recipe.find({}).populate('user', {username: 1}).populate('comments.user', {username: 1})
    response.json(populatedRecipes)
  } catch (error) {
    next(error)
  }
})

// Get one recipe
recipeRouter.get('/:id', async (request, response, next) => {
  try {
    const populatedRecipe = await Recipe.findById(request.params.id).populate('user', {username: 1}).populate('comments.user', {username: 1})

    if (!populatedRecipe) {
      return response.status(404).json({
        error: 'Recipe not found'
      })
    }

    response.json(populatedRecipe)
  } catch (error) {
    next(error)
  }
})

// Create recipe
recipeRouter.post('/', middleware.userExtractor, upload.single("image"), async (request, response, next) => {
  try {
    const user = request.user
    if (!user) return response.status(401).json({ error: 'userId invalid or missing'})
    
    const {
      name,
      description,
      servings,
      ingredients,
      instructions,
    } = request.body

    let imageUrl = ""

    // Upload image if one was selected
    if (request.file) {
      const result = await uploadImage(
        request.file.buffer
      )
      imageUrl = result.secure_url
    }

    const recipe = new Recipe({
      name,
      description,
      servings: Number(servings),
      image: imageUrl,
      ingredients: JSON.parse(ingredients),
      instructions: JSON.parse(instructions),
      user: user._id,
    })
    
    const savedRecipe = await recipe.save()
    user.recipes = user.recipes.concat(savedRecipe._id)
    await user.save()

    const populatedRecipe = await Recipe.findById(savedRecipe._id).populate('user', {username: 1})

    response.status(201).json(populatedRecipe)
  } catch (error) {
    next(error)
  }
})

// Update recipe
recipeRouter.put('/:id', middleware.userExtractor, async (request, response, next) => {
  try {
    const user = request.user

    const {
      name,
      description,
      servings,
      image,
      ingredients,
      instructions
    } = request.body

    const recipeToUpdate = await Recipe.findById(request.params.id)
    if (!recipeToUpdate) return response.status(404).json({ error: 'Recipe not found'})
    if (!(recipeToUpdate.user.toString() === user._id.toString())) return response.status(403).json({ error: 'Only the creator of the recipe can edit it'})

    const updatedRecipe = await Recipe.findByIdAndUpdate(
      request.params.id,
      {
        name,
        description,
        servings,
        image,
        ingredients,
        instructions
      },
      {
        returnDocument: 'after',
        runValidators: true
      }
    )

    response.json(updatedRecipe)
  } catch (error) {
    next(error)
  }
})

// Delete recipe
recipeRouter.delete('/:id', middleware.userExtractor, async (request, response, next) => {
  try {
    const user = request.user
    const recipeToDelete = await Recipe.findById(request.params.id)
    if (!recipeToDelete) return response.status(404).json({ error: 'Recipe not found'})
    if (!(recipeToDelete.user.toString() === user._id.toString())) return response.status(403).json({ error: 'Only the creator of the recipe can delete it'})

    await Recipe.findByIdAndDelete(request.params.id)

    user.recipes = user.recipes.filter(recipeId => recipeId.toString() !== request.params.id)

    await user.save()

    response.status(200).json({
      message: 'Deletion of a recipe successful'
    })
  } catch (error) {
    next(error)
  }
})

// Comment a recipe 
recipeRouter.post('/:id/comments', middleware.userExtractor, async (request, response, next) => {
  try {
    const user = request.user
    if (!user) return response.status(401).json({ error: 'userId invalid or missing'})

    const recipeToUpdate = await Recipe.findById(request.params.id)
    if (!recipeToUpdate) return response.status(404).json({ error: 'Recipe not found'})

    const { text } = request.body

    if (!text || text.trim() === '') {
      return response.status(400).json({
        error: 'Comment cannot be empty'
      })
    }

    const newComment = {
      text,
      user: user._id
    }

    recipeToUpdate.comments = recipeToUpdate.comments.concat(newComment)

    const savedRecipe = await recipeToUpdate.save()
    
    const populatedRecipe = await Recipe.findById(savedRecipe._id)
      .populate('user', { username: 1 })
      .populate('comments.user', { username: 1 })

    response.json(populatedRecipe)
    
  } catch (error) {
    next(error)
  }
})

// Delete a comment
recipeRouter.delete('/:id/comments/:commentId', middleware.userExtractor, async (request, response, next) => {
  try {
    const user = request.user
    const recipe = await Recipe.findById(request.params.id)
    if (!recipe) return response.status(404).json({ error: 'Recipe not found'})

    const commentToDelete = recipe.comments.find(comment => comment._id.toString() === request.params.commentId)
    if (!commentToDelete) return response.status(404).json({ error: 'Comment not found'})
    if (!(commentToDelete.user.toString() === user._id.toString())) return response.status(403).json({ error: 'Only the creator of the comment can delete it'})

    recipe.comments = recipe.comments.filter(comment => comment._id.toString() !== request.params.commentId)

    const savedRecipe = await recipe.save()

    const populatedRecipe = await Recipe.findById(savedRecipe._id)
      .populate('user', { username: 1 })
      .populate('comments.user', { username: 1 })

    response.status(200).json(populatedRecipe)
  } catch (error) {
    next(error)
  }
})

// Rate a recipe 
recipeRouter.post('/:id/ratings', middleware.userExtractor, async (request, response, next) => {
  try {
    const user = request.user
    if (!user) return response.status(401).json({ error: 'userId invalid or missing'})

    const recipeToUpdate = await Recipe.findById(request.params.id)
    if (!recipeToUpdate) return response.status(404).json({ error: 'Recipe not found'})

    const { rating } = request.body

    if (!Number.isInteger(rating) || rating < 1 || rating > 5) {
      return response.status(400).json({
        error: 'Rating must be an integer between 1-5'
      })
    }

    const existingRating = recipeToUpdate.ratings.find(
      rating => rating.user.toString() === user._id.toString()
    )

    if (existingRating) { 
      existingRating.rating = rating
    } else {
      const newRating = {
        rating,
        user: user._id
      }
      recipeToUpdate.ratings = recipeToUpdate.ratings.concat(newRating)
    }
    
    const savedRecipe = await recipeToUpdate.save()

    const populatedRecipe = await Recipe.findById(savedRecipe._id)
      .populate('user', { username: 1 })
      .populate('comments.user', { username: 1 })

    response.json(populatedRecipe)
    
  } catch (error) {
    next(error)
  }
})



module.exports = recipeRouter