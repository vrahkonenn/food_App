import { Box, Paper, Typography} from '@mui/material'
import recipeService from '../services/recipes'


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

const Comment = (recipeId, commentId, username, createdAt, text, token ) => {

    const handleDeleteComment = async (commentId) => {

        try {
            console.log('Poistetaan kommentti: ', commentId)
            await recipeService.deleteComment(recipeId, commentId, token)
        } catch (error) {
            console.log(error)
        }
    }

    return(
      <div>
        <Paper
          key={commentId}
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
                {username}
            </Typography>

            <Typography
                variant="body2"
                color="text.secondary"
            >
              · {getTimeAgo(createdAt)}
            </Typography>
          </Box>
          <Typography>
              {text}
          </Typography>
          <button onClick={() => handleDeleteComment(commentId)}>DELETE</button>
        </Paper>
      </div>
    )
}

export default Comment