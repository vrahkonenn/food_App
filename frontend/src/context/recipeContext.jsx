import { createContext, useState } from "react";
import recipeService from "../services/recipes"

const RecipeContext = createContext()

export default RecipeContext

export const RecipeContextProvider = (props) => {
    const [recipes, setRecipes] = useState(null)

    const fetchRecipes = async () => {
        console.log('fetch recipe kutsuttiin')
        const response = await recipeService.getAll()
        const mappedRecipes = response.map(recipe => <p key={recipe.id}>{recipe.name}</p>)
        setRecipes(mappedRecipes)
    }

    return(
        <RecipeContext.Provider value={{ recipes, setRecipes, fetchRecipes }}>
            {props.children}
        </RecipeContext.Provider>
    )
}