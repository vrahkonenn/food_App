import { useState } from "react"
import recipeService from "../services/recipes"
import { useContext } from "react"
import AuthContext from "../context/authContext"
import { useNavigate } from "react-router-dom"
import { Link } from "react-router-dom"

const CreateRecipeForm = () => {
  const [name, setName] = useState('')
  const [description, setDescription] = useState('')
  const [servings, setServings] = useState('')
  const [image, setImage] = useState('')

  const [ingredients, setIngredients] = useState([
    { name: '', amount: '', unit: '' }
  ])

  const [instructions, setInstructions] = useState([
    { description: '' }
  ])

  const { user } = useContext(AuthContext)
  const navigate = useNavigate()

  const addIngredient = () => {
    setIngredients([...ingredients, { name: '', amount: '', unit: '' }])
  }

  const handleIngredientChange = (index, field, value) => {
    const updatedIngredients = [...ingredients]
    updatedIngredients[index][field] = value
    setIngredients(updatedIngredients)
  }

  const removeIngredient = (index) => {
    setIngredients(ingredients.filter((_, i) => i !== index))
  }

  const addInstruction = () => {
    setInstructions([...instructions, { description: ''}])
  }

  const handleInstructionChange = (index, value) => {
    const updatedInstructions = [...instructions]
    updatedInstructions[index]['description'] = value 
    setInstructions(updatedInstructions)
  }

  const removeInstruction = (index) => {
    setInstructions(instructions.filter((_, i) => i !== index))
  }

const handleCreateRecipe = async (event) => {
  event.preventDefault()

  const recipe = {
    name,
    description,
    servings: Number(servings),
    image,
    ingredients: ingredients.map(ingredient => ({
      ...ingredient,
      amount: Number(ingredient.amount)
    })),
    instructions: instructions.map((instruction, index) => ({
      step: index + 1,
      description: instruction.description
    }))
  }

  try {
    const response = await recipeService.createRecipe(recipe, user.token)
    console.log(response)
    navigate('/')
  } catch (error) {
    console.log
  }
}

  const style = { margin: 20 }

  if (!user) {
    return(
      <div>
        <p>Only logged users can add recipes!</p>
        <Link to="/login">Log in</Link>
        <br></br>
        <Link to="/login">Register</Link>
      </div>
    )
  }

  return(
    <div>
      <h2>Create new recipe</h2>

      <form onSubmit={handleCreateRecipe}>
        <div style={style}>
          <label>
              Name
              <input
                  type="text"
                  value={name}
                  onChange={({ target }) => setName(target.value)}
                  />
          </label>
          <br></br>
          <label>
              Description
              <input
                  type="text"
                  value={description}
                  onChange={({ target }) => setDescription(target.value)}
                  />
          </label>
          <br></br>
          <label>
              Servings
              <input
                  type="number"
                  value={servings}
                  onChange={({ target }) => setServings(target.value)}
                  />
          </label>
          <br></br>
          <label>
              Image
              <input
                  type="text"
                  value={image}
                  onChange={({ target }) => setImage(target.value)}
                  />
          </label>
        </div>
        {/* Adding ingredients */}
        <div style={style}>
          {ingredients.map((ingredient, index) => (
            <div key={index}>
              <input
                type="text"
                placeholder="Ingredient"
                value={ingredient.name}
                onChange={(event) =>
                  handleIngredientChange(index, 'name', event.target.value)
                }
                />
              <input
                type="number"
                placeholder="Amount"
                value={ingredient.amount}
                onChange={(event) =>
                  handleIngredientChange(index, 'amount', event.target.value)
                }
                />
              <input
                type="text"
                placeholder="Unit"
                value={ingredient.unit}
                onChange={(event) =>
                  handleIngredientChange(index, 'unit', event.target.value)
                }
                />
              <button type="button" onClick={() => removeIngredient(index)}>Remove</button>
            </div>
          ))}
          <button type="button" onClick={addIngredient}>
            Add ingredient
          </button>
        </div>
    
        {/* Adding instructions */}
        <div style={style}>
          {instructions.map((instruction, index) => (
            <div key={index}>
              <label>
                Step {index + 1}
              </label>
              <textarea
                value={instruction.description}
                onChange={(event) =>
                  handleInstructionChange(index, event.target.value)
                }
                />
              <button type="button" onClick={() => removeInstruction(index)}>Remove</button>
            </div>
          ))}
          <button type="button" onClick={addInstruction}>
            Add instruction
          </button>
        </div>
        <button type="submit">Create recipe</button>
      </form>
    </div>
  )
}

export default CreateRecipeForm