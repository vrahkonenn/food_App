import { useState, useContext } from "react"
import recipeService from "../services/recipes"
import AuthContext from "../context/authContext"
import { useNavigate, Link } from "react-router-dom"

import {
  Box,
  Paper,
  Typography,
  TextField,
  Button,
  Divider,
  IconButton,
} from "@mui/material"


const CreateRecipeForm = () => {
  const [name, setName] = useState("")
  const [description, setDescription] = useState("")
  const [servings, setServings] = useState("")
  const [image, setImage] = useState("")

  const [ingredients, setIngredients] = useState([
    { name: "", amount: "", unit: "" }
  ])

  const [instructions, setInstructions] = useState([
    { description: "" }
  ])

  const { user } = useContext(AuthContext)
  const navigate = useNavigate()


  const addIngredient = () => {
    setIngredients([
      ...ingredients,
      { name: "", amount: "", unit: "" }
    ])
  }


  const handleIngredientChange = (index, field, value) => {
    const updatedIngredients = [...ingredients]
    updatedIngredients[index][field] = value
    setIngredients(updatedIngredients)
  }


  const removeIngredient = (index) => {
    setIngredients(
      ingredients.filter((_, i) => i !== index)
    )
  }


  const addInstruction = () => {
    setInstructions([
      ...instructions,
      { description: "" }
    ])
  }


  const handleInstructionChange = (index, value) => {
    const updatedInstructions = [...instructions]
    updatedInstructions[index].description = value
    setInstructions(updatedInstructions)
  }


  const removeInstruction = (index) => {
    setInstructions(
      instructions.filter((_, i) => i !== index)
    )
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
      await recipeService.createRecipe(recipe, user.token)
      navigate("/")
    } catch (error) {
      console.log("Creating recipe failed:", error)
    }
  }


  if (!user) {
    return (
      <Box
        sx={{
          minHeight: "70vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          px: 2,
        }}
      >
        <Paper
          elevation={4}
          sx={{
            width: "100%",
            maxWidth: 500,
            p: 5,
            borderRadius: 3,
            textAlign: "center",
          }}
        >
          <Typography variant="h5" sx={{ fontWeight: 700, mb: 2 }}>
            Kirjaudu sisään
          </Typography>

          <Typography
            sx={{
              color: "text.secondary",
              mb: 3,
            }}
          >
            Vain kirjautuneet käyttäjät voivat lisätä reseptejä.
          </Typography>

          <Button
            component={Link}
            to="/login"
            variant="contained"
            sx={{
              backgroundColor: "primary.main",
              fontWeight: 600,
              px: 4,
              "&:hover": {
                backgroundColor: "primary.dark",
              },
            }}
          >
            Kirjaudu
          </Button>
        </Paper>
      </Box>
    )
  }


  return (
    <Box
    sx={{
      width: "100%",
      py: { xs: 3, md: 6 },
      px: 2,
      backgroundImage: `
          linear-gradient(
              rgba(0, 0, 0, 0.35),
              rgba(0, 0, 0, 0.35)
          ),
          url("https://www.undp.org/sites/g/files/zskgke326/files/styles/scaled_image_large/public/2023-12/food.jpg?itok=u9KiNDp4")
      `,
      backgroundSize: "cover",
      backgroundPosition: "center",
      backgroundRepeat: "no-repeat",
      }}

    >
      <Box
        sx={{
          width: "100%",
          maxWidth: 900,
          margin: "0 auto",
        }}
      >

        <Paper
          elevation={4}
          sx={{
            mt: 10,
            p: { xs: 2.5, sm: 4, md: 5 },
            borderRadius: 3,
          }}
        >


        {/* Otsikko */}
        <Box
          sx={{
            textAlign: "center",
            mb: 4,
          }}
        >
          <Typography
            variant="h3"
            sx={{
              fontWeight: 700,
              fontSize: {
                xs: "2rem",
                sm: "2.5rem",
                md: "3rem",
              },
            }}
          >
            Luo uusi resepti
          </Typography>

          <Typography
            sx={{
              color: "text.secondary",
              mt: 1,
            }}
          >
            Lisää oma reseptisi muiden kokattavaksi.
          </Typography>
        </Box>

          <form onSubmit={handleCreateRecipe}>

            {/* Perustiedot */}
            <Typography
              variant="h5"
              sx={{
                fontWeight: 700,
                mb: 3,
              }}
            >
              Reseptin tiedot
            </Typography>

            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                gap: 2.5,
              }}
            >
              <TextField
                label="Reseptin nimi"
                value={name}
                onChange={({ target }) => setName(target.value)}
                fullWidth
                required
              />

              <TextField
                label="Kuvaus"
                value={description}
                onChange={({ target }) =>
                  setDescription(target.value)
                }
                fullWidth
                multiline
                minRows={3}
                required
              />

              <TextField
                label="Annoksia"
                type="number"
                value={servings}
                onChange={({ target }) =>
                  setServings(target.value)
                }
                inputProps={{ min: 1 }}
                fullWidth
                required
              />

              <TextField
                label="Kuvan URL"
                value={image}
                onChange={({ target }) =>
                  setImage(target.value)
                }
                fullWidth
                required
              />
            </Box>


            <Divider sx={{ my: 5 }} />


            {/* Ainekset */}
            <Typography
              variant="h5"
              sx={{
                fontWeight: 700,
                mb: 1,
              }}
            >
              Ainekset
            </Typography>

            <Typography
              sx={{
                color: "text.secondary",
                mb: 3,
              }}
            >
              Lisää reseptin tarvitsemat ainekset.
            </Typography>


            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                gap: 2,
              }}
            >
              {ingredients.map((ingredient, index) => (
                <Box
                  key={index}
                  sx={{
                    display: "grid",
                    gridTemplateColumns: {
                      xs: "1fr",
                      sm: "2fr 1fr 1fr auto",
                    },
                    gap: 1.5,
                    alignItems: "center",
                    p: 2,
                    backgroundColor: "background.default",
                    borderRadius: 2,
                  }}
                >
                  <TextField
                    label="Ainesosa"
                    value={ingredient.name}
                    onChange={(event) =>
                      handleIngredientChange(
                        index,
                        "name",
                        event.target.value
                      )
                    }
                    size="small"
                    required
                  />

                  <TextField
                    label="Määrä"
                    type="number"
                    value={ingredient.amount}
                    onChange={(event) =>
                      handleIngredientChange(
                        index,
                        "amount",
                        event.target.value
                      )
                    }
                    inputProps={{ min: 0 }}
                    size="small"
                    required
                  />

                  <TextField
                    label="Yksikkö"
                    placeholder="esim. dl"
                    value={ingredient.unit}
                    onChange={(event) =>
                      handleIngredientChange(
                        index,
                        "unit",
                        event.target.value
                      )
                    }
                    size="small"
                    required
                  />

                  <IconButton
                    type="button"
                    onClick={() => removeIngredient(index)}
                    disabled={ingredients.length === 1}
                    sx={{
                      color: "primary.main",
                      "&:hover": {
                        backgroundColor:
                          "rgba(245, 124, 0, 0.08)",
                      },
                    }}
                  >
                    <span className="material-symbols-outlined">
                      delete
                    </span>
                  </IconButton>
                </Box>
              ))}
            </Box>


            <Button
              type="button"
              onClick={addIngredient}
              variant="outlined"
              startIcon={
                <span className="material-symbols-outlined">
                  add
                </span>
              }
              sx={{
                mt: 2,
                color: "primary.main",
                borderColor: "primary.main",
                fontWeight: 600,
                "&:hover": {
                  borderColor: "primary.main",
                  backgroundColor:
                    "rgba(245, 124, 0, 0.08)",
                },
              }}
            >
              Lisää ainesosa
            </Button>


            <Divider sx={{ my: 5 }} />


            {/* Valmistusohjeet */}
            <Typography
              variant="h5"
              sx={{
                fontWeight: 700,
                mb: 1,
              }}
            >
              Valmistusohjeet
            </Typography>

            <Typography
              sx={{
                color: "text.secondary",
                mb: 3,
              }}
            >
              Lisää reseptin valmistusvaiheet järjestyksessä.
            </Typography>


            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                gap: 2,
              }}
            >
              {instructions.map((instruction, index) => (
                <Box
                  key={index}
                  sx={{
                    display: "flex",
                    gap: 2,
                    alignItems: "flex-start",
                    p: 2,
                    backgroundColor: "background.default",
                    borderRadius: 2,
                  }}
                >

                  <Box
                    sx={{
                      minWidth: 40,
                      height: 40,
                      borderRadius: "50%",
                      backgroundColor: "primary.main",
                      color: "primary.contrastText",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontWeight: 700,
                      flexShrink: 0,
                    }}
                  >
                    {index + 1}
                  </Box>

                  <TextField
                    label={`Vaihe ${index + 1}`}
                    value={instruction.description}
                    onChange={(event) =>
                      handleInstructionChange(
                        index,
                        event.target.value
                      )
                    }
                    multiline
                    minRows={2}
                    fullWidth
                    required
                  />

                  <IconButton
                    type="button"
                    onClick={() => removeInstruction(index)}
                    disabled={instructions.length === 1}
                    sx={{
                      color: "primary.main",
                      "&:hover": {
                        backgroundColor:
                          "rgba(245, 124, 0, 0.08)",
                      },
                    }}
                  >
                    <span className="material-symbols-outlined">
                      delete
                    </span>
                  </IconButton>

                </Box>
              ))}
            </Box>


            <Button
              type="button"
              onClick={addInstruction}
              variant="outlined"
              startIcon={
                <span className="material-symbols-outlined">
                  add
                </span>
              }
              sx={{
                mt: 2,
                color: "primary.main",
                borderColor: "primary.main",
                fontWeight: 600,
                "&:hover": {
                  borderColor: "primary.main",
                  backgroundColor:
                    "rgba(245, 124, 0, 0.08)",
                },
              }}
            >
              Lisää valmistusvaihe
            </Button>


            <Divider sx={{ my: 5 }} />


            {/* Lähetä */}
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
              }}
            >
              <Button
                type="submit"
                variant="contained"
                size="large"
                startIcon={
                  <span className="material-symbols-outlined">
                    restaurant
                  </span>
                }
                sx={{
                  px: 5,
                  py: 1.5,
                  borderRadius: 2,
                  fontWeight: 700,
                  fontSize: "1rem",
                  backgroundColor: "primary.main",
                  "&:hover": {
                    backgroundColor: "primary.dark",
                  },
                }}
              >
                Luo resepti
              </Button>
            </Box>

          </form>
        </Paper>
      </Box>
    </Box>
  )
}

export default CreateRecipeForm