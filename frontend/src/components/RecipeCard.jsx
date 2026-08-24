import { useState } from "react"
import {
  Card,
  CardMedia,
  CardContent,
  Typography,
  IconButton,
} from "@mui/material"

const RecipeCard = ({ name, image }) => {
  const [favorite, setFavorite] = useState(false)

  const handleFavoriteClick = () => {
    setFavorite(!favorite)
  }

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
          minHeight: 70,
          backgroundColor: "#fff",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: 1.5,
          gap: 1,
        }}
      >
        <Typography
          variant="h6"
          sx={{
            fontWeight: 600,
            textAlign: "left",
            flexGrow: 1,
          }}
        >
          {name}
        </Typography>

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
          }}
        >
          <span
            className="material-symbols-outlined"
            style={{
              fontSize: "30px",
              color: "#e53935",
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