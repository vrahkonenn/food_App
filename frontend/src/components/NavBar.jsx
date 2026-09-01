import { useContext } from "react"
import { Link, useLocation } from "react-router-dom"
import {
  AppBar,
  Toolbar,
  Button,
  Typography,
  Box,
} from "@mui/material"
import AuthContext from "../context/authContext"

const NavBar = () => {
  const { user, setUser } = useContext(AuthContext)
  const location = useLocation()

  const logOut = () => {
    setUser(null)
    window.localStorage.removeItem("loggedFoodAppUser")
  }

  const isActive = (path) => location.pathname === path

  const navButtonSx = (path) => ({
    color: isActive(path) ? "primary.main" : "text.primary",
    fontWeight: isActive(path) ? 700 : 500,
    fontSize: "1rem",
    px: 2,
    borderRadius: 2,

    "&:hover": {
      backgroundColor: "rgba(245, 124, 0, 0.08)",
      color: "primary.main",
    },
  })

  return (
    <AppBar
      position="fixed"
      elevation={0}
      sx={{
        backgroundColor: "background.paper",
        color: "text.primary",
        boxShadow: "0 2px 10px rgba(0, 0, 0, 0.10)",
      }}
    >
      <Toolbar
        sx={{
          minHeight: "72px",
          px: {
            xs: 2,
            md: 5,
          },
        }}
      >
        {/* Logo */}
        <Typography
          variant="h5"
          component={Link}
          to="/"
          sx={{
            textDecoration: "none",
            color: "text.primary",
            fontWeight: 800,
            letterSpacing: "-0.5px",

            "&:hover": {
              color: "primary.main",
            },
          }}
        >
          Food App
        </Typography>

        {/* Keskellä olevat navigointilinkit */}
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            flexGrow: 1,
            gap: 1,
          }}
        >
          <Button
            component={Link}
            to="/"
            sx={navButtonSx("/")}
          >
            Home
          </Button>

          <Button
            component={Link}
            to="/recipes/new"
            sx={navButtonSx("/recipes/new")}
          >
            New recipe
          </Button>
        </Box>

        {/* Oikea puoli */}
        {user ? (
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              gap: 2,
            }}
          >
            <Typography
              sx={{
                color: "text.secondary",
                display: {
                  xs: "none",
                  sm: "block",
                },
              }}
            >
              Logged in as{" "}
              <Box
                component="span"
                sx={{
                  color: "text.primary",
                  fontWeight: 700,
                }}
              >
                {user.username}
              </Box>
            </Typography>

            <Button
              onClick={logOut}
              sx={{
                color: "text.primary",
                fontWeight: 500,
                borderRadius: 2,

                "&:hover": {
                  backgroundColor: "rgba(0, 0, 0, 0.05)",
                },
              }}
            >
              Logout
            </Button>
          </Box>
        ) : (
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              gap: 1,
            }}
          >
            <Button
              component={Link}
              to="/login"
              sx={navButtonSx("/login")}
            >
              Login
            </Button>

            <Button
              component={Link}
              to="/register"
              sx={navButtonSx("/register")}
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
