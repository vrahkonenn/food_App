import { useContext } from "react"
import { useEffect } from "react"
import RecipeContext from "../context/recipeContext"

const Home = () => {
    const { recipes, setRecipes, fetchRecipes } = useContext(RecipeContext)

    useEffect(() => {
        fetchRecipes()
    }, [])

    return(
        <div>
            <p>Tänne tulee etusivu</p>
            {recipes}
        </div>
    )
}

export default Home