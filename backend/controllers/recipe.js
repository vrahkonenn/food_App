const recipeRouter = require('express').Router()
const Recipe = require('../models/recipe')
const middleware = require('../utils/middleware')

// Get all recipes
recipeRouter.get('/', async (request, response, next) => {
  try {
    const populatedRecipes = await Recipe.find({}).populate('user', {username: 1})
    response.json(populatedRecipes)
  } catch (error) {
    next(error)
  }
})

// Get one recipe
recipeRouter.get('/:id', async (request, response, next) => {
  try {
    const populatedRecipe = await Recipe.findById(request.params.id).populate('user', {username: 1})

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
recipeRouter.post('/', middleware.userExtractor, async (request, response, next) => {
  try {
    const user = request.user
    if (!user) return response.status(401).json({ error: 'userId invalid or missing'})
    
    const {
      name,
      description,
      servings,
      image,
      ingredients,
      instructions,
    } = request.body

    const recipe = new Recipe({
      name,
      description,
      servings,
      image,
      ingredients,
      user: user._id,
      instructions
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
      message: 'Deletion successful'
    })
  } catch (error) {
    next(error)
  }
})

module.exports = recipeRouter