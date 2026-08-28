import { useState } from "react"
import registerService from "../services/register"
import { useNavigate } from "react-router-dom"
import {
    Box,
    Paper,
    TextField,
    Button,
    Typography,
} from "@mui/material"

const Register = () => {
    const [username, setUsername] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    const navigate = useNavigate()

    const handleRegister = async (event) => {
        event.preventDefault()

        try {
            await registerService.register(
                username,
                email,
                password
            )

            navigate("/login")
        } catch (error) {
            console.log(error)
        }

        setUsername("")
        setEmail("")
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
                    Register
                </Typography>

                <Typography
                    sx={{
                        textAlign: "center",
                        color: "text.secondary",
                        mb: 4,
                    }}
                >
                    Luo uusi käyttäjätili
                </Typography>

                <Box
                    component="form"
                    onSubmit={handleRegister}
                    sx={{
                        display: "flex",
                        flexDirection: "column",
                        gap: 2.5,
                    }}
                >
                    <TextField
                        label="Username"
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
                        label="Email"
                        type="email"
                        value={email}
                        onChange={({ target }) =>
                            setEmail(target.value)
                        }
                        fullWidth
                        autoComplete="email"
                    />

                    <TextField
                        label="Password"
                        type="password"
                        value={password}
                        onChange={({ target }) =>
                            setPassword(target.value)
                        }
                        fullWidth
                        required
                        autoComplete="new-password"
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
                        Register
                    </Button>
                </Box>
            </Paper>
        </Box>
    )
}

export default Register