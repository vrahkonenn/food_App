import { useState, useEffect, useContext } from "react"
import {
  Card,
  CardMedia,
  CardContent,
  Typography,
  IconButton,
  Box,
} from "@mui/material"
import userService from "../services/user"
import authContext from "../context/authContext"

const RecipeCard = ({ name, image, id, comments, ratings, servings }) => {
  const [favorite, setFavorite] = useState(false)
  const { user, setUser } = useContext(authContext)

  useEffect(() => {
    if (user) {
      setFavorite(user.favourites?.includes(id) || false)
    }
  }, [user])

  const handleFavoriteClick = async (event) => {
    event.preventDefault()

    if (!user) {
      window.alert("Reseptin voi asettaa suosikiksi vain kirjautunut käyttäjä!")
      return
    }

    try {
      let newFavourites = []

      if (favorite) {
        newFavourites = user.favourites.filter(
          favouriteId => favouriteId !== id
        )
      } else {
        newFavourites = [
          ...user.favourites,
          id
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
        "loggedFoodAppUser",
        JSON.stringify(updatedUserWithToken)
      )

      setFavorite(!favorite)
    } catch (error) {
      console.log("Setting as favourite failed:", error)
    }
  }

  const commentCount = comments?.length || 0
  const ratingCount = ratings?.length || 0

  const averageRating =
    ratingCount > 0
      ? ratings.reduce((sum, rating) => sum + rating.rating, 0) / ratingCount
      : 0

  return (
    <Card
      sx={{
        width: "100%",
        height: "100%",
        border: "2px solid #ddd",
        borderRadius: 3,
        overflow: "hidden",
        boxShadow: 3,
        display: "flex",
        flexDirection: "column",
        transition: "transform 0.2s, box-shadow 0.2s",

        "&:hover": {
          transform: "translateY(-5px)",
          boxShadow: 6,
        },
      }}
    >
      <CardMedia
        component="img"
        image={image}
        alt={name}
        sx={{
          width: "100%",
          height: 280,
          objectFit: "cover",
        }}
      />

      <CardContent
        sx={{
          minHeight: 85,
          backgroundColor: "#fff",
          display: "flex",
          alignItems: "flex-start",
          justifyContent: "space-between",
          padding: 1.5,
          gap: 1,
        }}
      >
        <Box
          sx={{
            flexGrow: 1,
            minWidth: 0,
          }}
        >
          <Typography
            variant="h6"
            sx={{
              fontWeight: 600,
              textAlign: "left",
              mb: 0.5,
            }}
          >
            {name}
          </Typography>

          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              gap: 1.5,
              color: "primary.main",
              flexWrap: "wrap",
            }}
          >
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                gap: 0.25,
              }}
            >
              <span
                className="material-symbols-outlined"
                style={{
                  fontSize: "20px",
                  fontVariationSettings:
                    "'FILL' 1, 'wght' 400, 'GRAD' 0, 'opsz' 48",
                }}
              >
                star
              </span>

              <Typography
                variant="body2"
                sx={{
                  fontSize: "0.8rem",
                  color: "text.primary",
                }}
              >
                {averageRating.toFixed(1)}
              </Typography>
            </Box>

            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                gap: 0.25,
              }}
            >
              <span
                className="material-symbols-outlined"
                style={{
                  fontSize: "19px",
                }}
              >
                chat_bubble
              </span>

              <Typography
                variant="body2"
                sx={{
                  fontSize: "0.8rem",
                  color: "text.primary",
                }}
              >
                {commentCount} kpl
              </Typography>
            </Box>

            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                gap: 0.25,
              }}
            >
              <span
                className="material-symbols-outlined"
                style={{
                  fontSize: "19px",
                }}
              >
                restaurant
              </span>

              <Typography
                variant="body2"
                sx={{
                  fontSize: "0.8rem",
                  color: "text.primary",
                }}
              >
                {servings} annosta
              </Typography>
            </Box>
          </Box>
        </Box>

        <IconButton
          onClick={handleFavoriteClick}
          aria-label={
            favorite
              ? "Poista suosikeista"
              : "Lisää suosikkeihin"
          }
          sx={{
            flexShrink: 0,
            padding: 0.5,
            color: "primary.main",
          }}
        >
          <span
            className="material-symbols-outlined"
            style={{
              fontSize: "30px",
              color: "inherit",
              fontVariationSettings: `'FILL' ${
                favorite ? 1 : 0
              }, 'wght' 400, 'GRAD' 0, 'opsz' 48`,
            }}
          >
            favorite
          </span>
        </IconButton>
      </CardContent>
    </Card>
  )
}

export default RecipeCard