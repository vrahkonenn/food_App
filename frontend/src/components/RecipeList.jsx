import { useContext, useEffect, useState } from "react"
import { Box, Typography, TextField, Paper } from "@mui/material"
import RecipeContext from "../context/recipeContext"
import AuthContext from "../context/authContext"
import RecipeCard from "./RecipeCard"
import { Link } from "react-router-dom"

const RecipeList = () => {
  const { recipes, fetchRecipes } = useContext(RecipeContext)
  const { user } = useContext(AuthContext)

  const [favourite, setFavourite] = useState(false)
  const [search, setSearch] = useState("")

  useEffect(() => {
    fetchRecipes()
  }, [])

  const filterRecipes = () => {
    let filteredRecipes = recipes

    if (user && favourite) {
      filteredRecipes = filteredRecipes.filter(recipe =>
        user.favourites.includes(recipe.id)
      )
    }

    filteredRecipes = filteredRecipes.filter(recipe =>
      recipe.name.toLowerCase().includes(search.toLowerCase())
    )

    return filteredRecipes
  }

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

      {/* Hakupaneeli */}
      <Paper
        elevation={3}
        sx={{
          width: {
            xs: "95%",
            sm: "90%",
            md: "75%",
          },
          margin: "0 auto",
          mb: 5,
          overflow: "hidden",
          borderRadius: 2,
        }}
      >
        {/* Reseptien valinta */}
        <Box
          sx={{
            display: "flex",
            width: "100%",
          }}
        >
          {/* Kaikki reseptit */}
          <Box
            onClick={() => setFavourite(false)}
            sx={{
              width: "50%",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              py: 2,
              cursor: "pointer",
              position: "relative",
              "&:hover": {
                backgroundColor: "action.hover",
              },
              "&::after": {
                content: '""',
                position: "absolute",
                bottom: 0,
                left: 0,
                width: "100%",
                height: "3px",
                backgroundColor:
                  !favourite ? "primary.main" : "transparent",
              },
            }}
          >
            <Typography
              sx={{
                fontWeight: !favourite ? 600 : 400,
              }}
            >
              Kaikki reseptit
            </Typography>
          </Box>

          {/* Suosikki reseptit */}
          <Box
            onClick={() => setFavourite(true)}
            sx={{
              width: "50%",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              py: 2,
              cursor: "pointer",
              position: "relative",
              "&:hover": {
                backgroundColor: "action.hover",
              },
              "&::after": {
                content: '""',
                position: "absolute",
                bottom: 0,
                left: 0,
                width: "100%",
                height: "3px",
                backgroundColor:
                  favourite ? "primary.main" : "transparent",
              },
            }}
          >
            <Typography
              sx={{
                fontWeight: favourite ? 600 : 400,
              }}
            >
              Suosikki reseptit
            </Typography>
          </Box>
        </Box>

        {/* Hakukenttä */}
        <Box
          sx={{
            width: "100%",
            display: "flex",
            justifyContent: "center",
            py: 3,
          }}
        >
          <TextField
            fullWidth
            placeholder="Hae reseptejä..."
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            sx={{
              width: "90%",
            }}
            slotProps={{
              input: {
                startAdornment: (
                  <span
                    className="material-symbols-outlined"
                    style={{
                      marginRight: "8px",
                    }}
                  >
                    search
                  </span>
                ),
              },
            }}
          />
        </Box>
      </Paper>

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
              md: "repeat(3, 1fr)",
            },

            gap: 4,
          }}
        >
          {filterRecipes().map((recipe) => (
            <Link
              key={recipe.id}
              to={`/recipes/${recipe.id}`}
              style={{
                textDecoration: "none",
                color: "inherit",
              }}
            >
              <RecipeCard
                name={recipe.name}
                image={recipe.image}
                id={recipe.id}
                comments={recipe.comments}
                ratings={recipe.ratings}
                servings={recipe.servings}
              />
            </Link>
          ))}
        </Box>
      )}
    </Box>
  )
}

export default RecipeList