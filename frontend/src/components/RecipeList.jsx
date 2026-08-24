import { useContext, useEffect } from "react"
import { Box, Typography } from "@mui/material"
import RecipeContext from "../context/recipeContext"
import RecipeCard from "./RecipeCard"

const RecipeList = () => {
  const { recipes, fetchRecipes } = useContext(RecipeContext)

  useEffect(() => {
    fetchRecipes()
  }, [])

  return (
    <Box
      sx={{
        width: "100%",
        py: 4,
      }}
    >
      <Typography
        variant="h4"
        sx={{
          textAlign: "center",
          mb: 5,
        }}
      >
        Reseptit
      </Typography>

      {!recipes ? (
        <Typography sx={{ textAlign: "center" }}>
          Loading recipes...
        </Typography>
      ) : (
        <Box
          sx={{
            width: {
              xs: "95%",
              sm: "90%",
              md: "75%",
            },
            margin: "0 auto",

            display: "grid",

            gridTemplateColumns: {
              xs: "1fr",
              sm: "repeat(2, 1fr)",
              md: "repeat(4, 1fr)",
            },

            gap: 4,
          }}
        >
          {recipes.map((recipe) => (
            <RecipeCard
              key={recipe.id}
              name={recipe.name}
              image={recipe.image}
            />
          ))}
        </Box>
      )}
    </Box>
  )
}

export default RecipeList