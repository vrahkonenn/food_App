import recipeService from "../services/recipes"
import userService from "../services/user"
import { useState, useEffect, useContext } from "react"
import { useParams, useNavigate } from "react-router-dom"
import recipeContext from "../context/recipeContext"
import authContext from "../context/authContext"
import CommentSection from "./CommentSection"
import {
    Box,
    Typography,
    Paper,
    Divider,
    Button,
} from "@mui/material"

const Recipe = () => {
    const [recipe, setRecipe] = useState(null)
    const [favorite, setFavorite] = useState(false)

    const { id } = useParams()
    const navigate = useNavigate()

    const { user, setUser } = useContext(authContext)
    const { recipes, setRecipes } = useContext(recipeContext)

    const handleFavoriteClick = async (event) => {
        event.preventDefault()
        if (!user) {
            window.alert('Reseptin voi asettaa suosikiksi vain kirjautunut käyttäjä!')
            return
        }

        try {
            let newFavourites = []

            if (favorite) {
                newFavourites = user.favourites.filter(
                    favouriteId => favouriteId !== recipe.id
                )
            } else {
                newFavourites = [
                    ...user.favourites,
                    recipe.id
                ]
            }

            const updatedUser = await userService.update(
                user.username,
                user.email,
                newFavourites,
                user.token
            )

            const updatedUserWithToken = {
                ...updatedUser,
                token: user.token
            }

            setUser(updatedUserWithToken)

            window.localStorage.setItem(
                'loggedFoodAppUser',
                JSON.stringify(updatedUserWithToken)
            )

            setFavorite(!favorite)

        } catch (error) {
            console.log("Setting as favourite failed:", error)
        }
    }

    const handleCommentClick = () => {
        document.getElementById('comments-section')?.scrollIntoView({
            behavior: 'smooth',
            block: 'start',
        })
    }

    const handleDeleteClick = async () => {
        const confirmed = window.confirm(
            "Are you sure you want to delete this recipe?"
        )

        if (!confirmed) {
            return
        }

        try {
            await recipeService.deleteRecipe(id, user.token)

            const filteredRecipes = recipes.filter(
                recipe => recipe.id !== id
            )

            setRecipes(filteredRecipes)
            navigate("/")
        } catch (error) {
            console.log("Deleting recipe failed:", error)
        }
    }


    useEffect(() => {
        const fetchRecipe = async () => {
            setRecipe(await recipeService.getOne(id))
        }

        fetchRecipe()
    }, [id])

    useEffect(() => {
        if (user && recipe) {
            setFavorite(user.favourites?.includes(recipe.id) || false)
        }
    }, [user, recipe])

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

    const creatorUser = Boolean(
        user && recipe.user.id === user.id
    )

    const commentAmount = recipe.comments?.length || 0
    const ratingAmount = recipe.ratings.length || 0
    const averageRating = ratingAmount > 0
        ? recipe.ratings.reduce((sum, rating) => sum + rating.rating, 0) / ratingAmount
        : 0

    return (
        <Box
            sx={{
                width: "100%",
                py: { xs: 3, md: 6 },
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
                display: "block",
                boxShadow: 4,
            }}
        />
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

                {/* Toimintonapit */}
                <Box
                    sx={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        gap: 1,
                        mt: 1.5,
                    }}
                >
                    
                    {/* Suosikki */}
                    <Button
                        onClick={handleFavoriteClick}
                        variant="text"
                        sx={{
                            color: "primary.main",
                            fontSize: "0.75rem",
                            fontWeight: 600,
                            minWidth: "auto",
                            px: 1,
                            py: 0.5,
                            borderRadius: 2,

                            "&:hover": {
                                backgroundColor:
                                    "rgba(245, 124, 0, 0.08)",
                            },
                        }}
                    >
                        <span
                            className="material-symbols-outlined"
                            style={{
                                fontSize: "22px",
                                marginRight: "5px",
                                fontVariationSettings: `'FILL' ${
                                    favorite ? 1 : 0
                                }, 'wght' 400, 'GRAD' 0, 'opsz' 48`,
                            }}
                        >
                            favorite
                        </span>

                        SUOSIKKI
                    </Button>

                    {/* Kommentoi */}
                    <Button
                        onClick={handleCommentClick}
                        variant="text"
                        sx={{
                            color: "primary.main",
                            fontSize: "0.75rem",
                            fontWeight: 600,
                            minWidth: "auto",
                            px: 1,
                            py: 0.5,
                            borderRadius: 2,

                            "&:hover": {
                                backgroundColor:
                                    "rgba(245, 124, 0, 0.08)",
                            },
                        }}
                    >
                        <span
                            className="material-symbols-outlined"
                            style={{
                                fontSize: "22px",
                                marginRight: "5px",
                            }}
                        >
                            chat_bubble
                        </span>
                        {commentAmount} KPL
                    </Button>

                    {/* Poista */}
                    {creatorUser && (
                        <Button
                            onClick={handleDeleteClick}
                            variant="text"
                            sx={{
                                color: "primary.main",
                                fontSize: "0.75rem",
                                fontWeight: 600,
                                minWidth: "auto",
                                px: 1,
                                py: 0.5,
                                borderRadius: 2,

                                "&:hover": {
                                    backgroundColor:
                                        "rgba(245, 124, 0, 0.08)",
                                },
                            }}
                        >
                            <span
                                className="material-symbols-outlined"
                                style={{
                                    fontSize: "22px",
                                    marginRight: "5px",
                                }}
                            >
                                delete
                            </span>

                            POISTA
                        </Button>
                    )}
                </Box>

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

                    {/* ARVIOT */}
                    <Box
                        sx={{
                            display: "flex",
                            alignItems: "center",
                            color: "primary.main",
                            justifyContent: "center",
                            px: 1,
                            py: 0.5,
                            marginBottom: "10px"
                        }}
                    >
                        {[1, 2, 3, 4, 5].map((star) => (
                            <span
                                key={star}
                                className="material-symbols-outlined"
                                style={{
                                    fontSize: "30px",
                                    color: "primary.main",
                                    fontVariationSettings:
                                        star <= Math.round(averageRating)
                                            ? "'FILL' 1, 'wght' 400, 'GRAD' 0, 'opsz' 48"
                                            : "'FILL' 0, 'wght' 400, 'GRAD' 0, 'opsz' 48",
                                }}
                            >
                                star
                            </span>
                        ))}

                        <Typography
                            variant="body2"
                            sx={{
                                ml: 0.5,
                                fontSize: "0.75rem",
                                fontWeight: 600,
                            }}
                        >
                            ({ratingAmount} ARVIOTA)
                        </Typography>
                    </Box>

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
                <Box id="comments-section">
                    <CommentSection recipe={recipe} setRecipe={setRecipe} recipeId={recipe.id} comments={recipe.comments} />
                </Box>
            </Box>
        </Box>
    )
}

export default Recipe
