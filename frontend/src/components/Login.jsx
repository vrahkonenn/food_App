
import { useContext, useState } from "react"
import AuthContext from "../context/authContext"
import loginService from "../services/login"
import { useNavigate } from "react-router-dom"
import {
    Box,
    Paper,
    TextField,
    Button,
    Typography,
} from "@mui/material"
import food_background from "../assets/food_background.jpg"
import { Link } from "react-router-dom"

const Login = () => {
    const { setUser } = useContext(AuthContext)

    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")

    const navigate = useNavigate()

    const handleLogin = async (event) => {
        event.preventDefault()

        try {
            const response = await loginService.login(username, password)

            setUser(response)

            window.localStorage.setItem(
                "loggedFoodAppUser",
                JSON.stringify(response)
            )

            navigate("/")
        } catch (error) {
            console.log(error)
        }

        setUsername("")
        setPassword("")
    }

return (
<Box
    sx={{
        width: "100%",
        minHeight: "100vh",

        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        marginTop: 4,

        backgroundImage: `
            linear-gradient(
                rgba(0, 0, 0, 0.35),
                rgba(0, 0, 0, 0.35)
            ),
            url(${food_background})
        `,

        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",

        px: 2,
        py: 4,
        boxSizing: "border-box",
    }}
>
        <Paper
            elevation={8}
            sx={{
                width: "100%",
                maxWidth: 450,
                p: {
                    xs: 3,
                    sm: 5,
                },
                borderRadius: 4,
                backgroundColor: "rgba(255, 255, 255, 0.95)",
            }}
        >
            <Typography
                variant="h3"
                component="h1"
                sx={{
                    textAlign: "center",
                    fontWeight: 700,
                    mb: 1,
                }}
            >
                Kirjaudu
            </Typography>

            <Typography
                sx={{
                    textAlign: "center",
                    color: "text.secondary",
                    mb: 4,
                }}
            >
                Kirjaudu sisään luodaksesi reseptejä!
            </Typography>

            <Box
                component="form"
                onSubmit={handleLogin}
                sx={{
                    display: "flex",
                    flexDirection: "column",
                    gap: 2.5,
                }}
            >
                <TextField
                    label="Käyttäjänimi"
                    type="text"
                    value={username}
                    onChange={({ target }) =>
                        setUsername(target.value)
                    }
                    fullWidth
                    required
                    autoComplete="username"
                />

                <TextField
                    label="Salasana"
                    type="password"
                    value={password}
                    onChange={({ target }) =>
                        setPassword(target.value)
                    }
                    fullWidth
                    required
                    autoComplete="current-password"
                />

                <Button
                    type="submit"
                    variant="contained"
                    size="large"
                    sx={{
                        mt: 1,
                        py: 1.5,
                        borderRadius: 2,
                        fontSize: "1rem",
                        fontWeight: 600,
                    }}
                >
                    Kirjaudu
                </Button>
                <Typography
                    sx={{
                        textAlign: "center",
                        color: "text.secondary",
                    }}
                >
                    Ei käyttäjätunnusta? <Link to="/register">Rekisteröidy</Link>
                </Typography>
            </Box>
        </Paper>
    </Box>
)
}

export default Login

