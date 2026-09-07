import { useState, useContext } from 'react'
import { Box, Paper, Typography, TextField, Button } from '@mui/material'
import StarIcon from '@mui/icons-material/Star'
import StarBorderIcon from '@mui/icons-material/StarBorder'
import recipeService from '../services/recipes'
import AuthContext from '../context/authContext'

const getTimeAgo = (date) => {
    const now = new Date()
    const created = new Date(date)
    const differenceInSeconds = Math.floor((now - created) / 1000)

    const minutes = Math.floor(differenceInSeconds / 60)
    const hours = Math.floor(minutes / 60)
    const days = Math.floor(hours / 24)
    const months = Math.floor(days / 30)
    const years = Math.floor(days / 365)

    if (minutes < 1) return 'juuri nyt'
    if (minutes < 60) return `${minutes} min sitten`
    if (hours < 24) return `${hours} h sitten`
    if (days < 30) return `${days} pv sitten`
    if (months < 12) return `${months} kk sitten`
    return `${years} v sitten`
}

const CommentSection = ({ recipe, setRecipe, recipeId, comments }) => {
    const { user } = useContext(AuthContext)
    const [text, setText] = useState('')
    const [hoverRating, setHoverRating] = useState(0)

    const handleRating = async (rating) => {
        console.log('Arvioitiin: ', rating)

        try {
            const response = await recipeService.rateRecipe(recipeId, rating, user.token)
            setRecipe(response)
        } catch (error) {
            console.log('Virhe arvioinnissa: ', error)
        }
    }

    const handleCommentEvent = async (event) => {
        event.preventDefault()

        try {
            const response = await recipeService.commentRecipe(
                recipeId,
                text,
                user.token
            )
            setRecipe(response)
            setText('')
        } catch (error) {
            console.log('Virhe kommentoinnissa: ', error)
        }
    }

    const handleDeleteComment = async (commentId) => {
        try {
            console.log('Poistetaan kommentti: ', commentId)
            const response = await recipeService.deleteComment(recipeId, commentId, user.token)
            setRecipe(response)
        } catch (error) {
            console.log(error)
        }
    }

    const sortedComments = [...comments].sort(
        (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
    )

    return (
        <Box sx={{ mt: 4 }}>
            <Paper
                elevation={2}
                sx={{
                    p: 3,
                    borderRadius: 3,
                    mb: 3
                }}
            >
                {user ? (
                    <>
                        {/* ARVOSTELU */}

                        <Box sx={{ mb: 3 }}>
                            <Typography
                                variant="h6"
                                sx={{ fontWeight: 600, mb: 1 }}
                            >
                                Arvostele resepti
                            </Typography>

                                <Box sx={{ display: 'flex', gap: 0.5 }}>
                                    {[1, 2, 3, 4, 5].map((star) => {
                                        const userRating = recipe.ratings?.find(
                                            rating => rating.user === user.id
                                        )

                                        const currentRating = userRating?.rating || 0
                                        const displayedRating = hoverRating || currentRating

                                        return (
                                            <Box
                                                key={star}
                                                onClick={() => handleRating(star)}
                                                onMouseEnter={() => setHoverRating(star)}
                                                onMouseLeave={() => setHoverRating(0)}
                                                sx={{
                                                    cursor: 'pointer',
                                                    display: 'flex',
                                                    alignItems: 'center',
                                                    color: 'primary.main'
                                                }}
                                            >
                                                <span
                                                    className="material-symbols-outlined"
                                                    style={{
                                                        fontSize: '36px',
                                                        fontVariationSettings:
                                                            star <= displayedRating
                                                                ? "'FILL' 1"
                                                                : "'FILL' 0"
                                                    }}
                                                >
                                                    star
                                                </span>
                                            </Box>
                                        )
                                    })}
                                </Box>
                        </Box>

                        {/* KOMMENTTI */}

                        <Typography
                            variant="h6"
                            sx={{ fontWeight: 600, mb: 1 }}
                        >
                            Kommentoi reseptiä
                        </Typography>

                        <Box
                            component="form"
                            onSubmit={handleCommentEvent}
                        >
                            <TextField
                                fullWidth
                                multiline
                                minRows={3}
                                value={text}
                                onChange={({ target }) =>
                                    setText(target.value)
                                }
                                placeholder="Kirjoita kommentti..."
                                sx={{ mb: 2 }}
                            />

                            <Button
                                type="submit"
                                variant="contained"
                                disabled={!text.trim()}
                            >
                                Kommentoi
                            </Button>
                        </Box>
                    </>
                ) : (
                    <Typography color="text.secondary">
                        Kirjaudu sisään voidaksesi arvostella ja kommentoida!
                    </Typography>
                )}
            </Paper>

            {/* KOMMENTIT */}

            <Box>
                {sortedComments.map((comment) => (
                    <Paper
                        key={comment._id}
                        elevation={1}
                        sx={{
                            p: 2,
                            mb: 2,
                            borderRadius: 2
                        }}
                    >
                        <Box
                            sx={{
                                display: 'flex',
                                alignItems: 'baseline',
                                gap: 1,
                                mb: 1
                            }}
                        >
                            <Typography sx={{ fontWeight: 700 }}>
                                {comment.user.username}
                            </Typography>

                            <Typography
                                variant="body2"
                                color="text.secondary"
                            >
                                · {getTimeAgo(comment.createdAt)}
                            </Typography>
                            
                            {/* POISTO NAPPI */}
                            { user && comment.user.id === user.id &&
                                <Box >
                                    <Button
                                    onClick={() => handleDeleteComment(comment._id)}
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
                                </Box>
                            }
                        </Box>

                        <Typography>
                            {comment.text}
                        </Typography>
                    </Paper>
                ))}
            </Box>
        </Box>
    )
}

export default CommentSection