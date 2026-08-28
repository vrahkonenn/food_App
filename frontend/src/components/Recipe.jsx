import recipeService from "../services/recipes"
import { useState, useEffect } from "react"
import { useParams } from "react-router-dom"
import {
    Box,
    Typography,
    Paper,
    Divider,
} from "@mui/material"

const Recipe = () => {
    const [recipe, setRecipe] = useState(null)
    const { id } = useParams()

    useEffect(() => {
        const fetchRecipe = async () => {
            setRecipe(await recipeService.getOne(id))
        }

        fetchRecipe()
    }, [id])

    if (!recipe) {
        return (
            <Box
                sx={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    minHeight: "50vh",
                }}
            >
                <Typography variant="h6">
                    Recipe loading...
                </Typography>
            </Box>
        )
    }

    return (
        <Box
            sx={{
                width: "100%",
                py: { xs: 3, md: 6 },
            }}
        >
            {/* Pääsisältö */}
            <Box
                sx={{
                    width: {
                        xs: "95%",
                        md: "85%",
                        lg: "75%",
                    },
                    maxWidth: "1400px",
                    margin: "0 auto",
                }}
            >
                {/* Hero-kuva */}
                <Box
                    component="img"
                    src={recipe.image}
                    alt={recipe.name}
                    sx={{
                        width: "100%",
                        height: {
                            xs: "250px",
                            sm: "350px",
                            md: "500px",
                        },
                        objectFit: "cover",
                        borderRadius: 4,
                        display: "block",
                        boxShadow: 4,
                    }}
                />

                {/* Nimi ja kuvaus */}
                <Box
                    sx={{
                        textAlign: "center",
                        py: { xs: 4, md: 6 },
                        px: 2,
                    }}
                >
                    <Typography
                        variant="h2"
                        sx={{
                            fontWeight: 700,
                            fontSize: {
                                xs: "2.2rem",
                                sm: "3rem",
                                md: "4rem",
                            },
                            lineHeight: 1.1,
                            mb: 2,
                        }}
                    >
                        {recipe.name}
                    </Typography>

                    <Typography
                        variant="h6"
                        sx={{
                            maxWidth: "800px",
                            margin: "0 auto",
                            color: "text.secondary",
                            fontWeight: 400,
                            lineHeight: 1.6,
                        }}
                    >
                        {recipe.description}
                    </Typography>

                    <Typography
                        sx={{
                            mt: 2,
                            color: "text.secondary",
                            fontWeight: 500,
                        }}
                    >
                        Resepti: {recipe.user.username}
                    </Typography>
                </Box>

                {/* Ainekset + valmistus */}
                <Box
                    sx={{
                        display: "grid",
                        gridTemplateColumns: {
                            xs: "1fr",
                            md: "1fr 1fr",
                        },
                        gap: 4,
                        alignItems: "start",
                    }}
                >
                    {/* Ainekset */}
                    <Paper
                        elevation={3}
                        sx={{
                            p: { xs: 3, md: 4 },
                            borderRadius: 3,
                        }}
                    >
                        <Typography
                            variant="h4"
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
                            {recipe.servings} annosta
                        </Typography>

                        <Divider sx={{ mb: 2 }} />

                        <Box
                            component="ul"
                            sx={{
                                margin: 0,
                                paddingLeft: 3,
                            }}
                        >
                            {recipe.ingredients.map((ingredient, index) => (
                                <Box
                                    component="li"
                                    key={index}
                                    sx={{
                                        mb: 1.5,
                                        pl: 1,
                                    }}
                                >
                                    <Typography>
                                        <strong>
                                            {ingredient.amount}{" "}
                                            {ingredient.unit}
                                        </strong>{" "}
                                        {ingredient.name}
                                    </Typography>
                                </Box>
                            ))}
                        </Box>
                    </Paper>

                    {/* Valmistusohjeet */}
                    <Paper
                        elevation={3}
                        sx={{
                            p: { xs: 3, md: 4 },
                            borderRadius: 3,
                        }}
                    >
                        <Typography
                            variant="h4"
                            sx={{
                                fontWeight: 700,
                                mb: 3,
                            }}
                        >
                            Valmistus
                        </Typography>

                        <Box>
                            {recipe.instructions.map((instruction) => (
                                <Box
                                    key={instruction.step}
                                    sx={{
                                        display: "flex",
                                        gap: 2,
                                        mb: 3,
                                    }}
                                >
                                    {/* Vaiheen numero */}
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
                                        {instruction.step}
                                    </Box>

                                    {/* Ohje */}
                                    <Typography
                                        sx={{
                                            lineHeight: 1.7,
                                            pt: 0.5,
                                        }}
                                    >
                                        {instruction.description}
                                    </Typography>
                                </Box>
                            ))}
                        </Box>
                    </Paper>
                </Box>
            </Box>
        </Box>
    )
}

export default Recipe
