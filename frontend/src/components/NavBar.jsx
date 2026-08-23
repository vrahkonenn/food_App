import { useContext } from "react"
import { Link } from "react-router-dom"
import {
  AppBar,
  Toolbar,
  Button,
  Typography,
  Box
} from "@mui/material"
import AuthContext from "../context/authContext"

const NavBar = () => {
  const { user, setUser } = useContext(AuthContext)

  const logOut = () => {
    setUser(null)
    window.localStorage.removeItem("loggedFoodAppUser")
  }

  return (
    <AppBar position="static">
      <Toolbar>

        {/* Vasen */}
        <Typography variant="h6">
          Food App
        </Typography>

        {/* Keski */}
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            flexGrow: 1,
            gap: 2
          }}
        >
          <Button
            color="inherit"
            component={Link}
            to="/"
          >
            Home
          </Button>

          <Button
            color="inherit"
            component={Link}
            to="/recipes/new"
          >
            New recipe
          </Button>
        </Box>

        {/* Oikea */}
        {user ? (
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              gap: 2
            }}
          >
            <Typography>
              Logged in as: <strong>{user.username}</strong>
            </Typography>

            <Button
              color="inherit"
              onClick={logOut}
            >
              Logout
            </Button>
          </Box>
        ) : (
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              gap: 1
            }}
          >
            <Button
              color="inherit"
              component={Link}
              to="/login"
            >
              Login
            </Button>

            <Button
              color="inherit"
              component={Link}
              to="/register"
            >
              Register
            </Button>
          </Box>
        )}

      </Toolbar>
    </AppBar>
  )
}

export default NavBar