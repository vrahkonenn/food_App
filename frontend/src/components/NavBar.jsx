import { useContext, useState } from "react"
import { Link, useLocation } from "react-router-dom"
import {
  AppBar,
  Toolbar,
  Button,
  Typography,
  Box,
  IconButton,
  Drawer,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Divider,
} from "@mui/material"

import AuthContext from "../context/authContext"
import logo from "../assets/vruoka2.png"

const NavBar = () => {
  const { user, setUser } = useContext(AuthContext)
  const location = useLocation()

  const [drawerOpen, setDrawerOpen] = useState(false)

  const logOut = () => {
    setUser(null)
    window.localStorage.removeItem("loggedFoodAppUser")
    setDrawerOpen(false)
  }

  const isActive = (path) => location.pathname === path

  const closeDrawer = () => {
    setDrawerOpen(false)
  }

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
    <>
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
<Box
  component={Link}
  to="/"
  sx={{
    display: "flex",
    alignItems: "center",
    textDecoration: "none",
  }}
>
  <Box
    component="img"
    src={logo}
    alt="Reseptitori"
    sx={{
      height: 60,
      width: "auto",
      display: "block",
    }}
  />
</Box>

          {/* Desktop navigaatio */}
          <Box
            sx={{
              display: {
                xs: "none",
                md: "flex",
              },
              justifyContent: "center",
              alignItems: "center",
              flexGrow: 1,
              gap: 1,
            }}
          >
            <Button
              component={Link}
              to="/"
              startIcon={
                <span className="material-symbols-outlined">
                  home
                </span>
              }
              sx={navButtonSx("/")}
            >
              Etusivu
            </Button>

            <Button
              component={Link}
              to="/recipes/new"
              startIcon={
                <span className="material-symbols-outlined">
                  add
                </span>
              }
              sx={navButtonSx("/recipes/new")}
            >
              Uusi resepti
            </Button>
          </Box>

          {/* Desktop käyttäjätoiminnot */}
          <Box
            sx={{
              display: {
                xs: "none",
                md: "flex",
              },
              alignItems: "center",
              gap: 1,
            }}
          >
            {user ? (
              <>
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    gap: 0.5,
                    mr: 1,
                  }}
                >
                  <span className="material-symbols-outlined">
                    account_circle
                  </span>

                  <Typography
                    sx={{
                      color: "text.primary",
                      fontWeight: 600,
                    }}
                  >
                    {user.username}
                  </Typography>
                </Box>

                <Button
                  onClick={logOut}
                  startIcon={
                    <span className="material-symbols-outlined">
                      logout
                    </span>
                  }
                  sx={{
                    color: "text.primary",
                    fontWeight: 500,
                    borderRadius: 2,

                    "&:hover": {
                      backgroundColor: "rgba(0, 0, 0, 0.05)",
                    },
                  }}
                >
                  Kirjaudu ulos
                </Button>
              </>
            ) : (
              <>
                <Button
                  component={Link}
                  to="/login"
                  startIcon={
                    <span className="material-symbols-outlined">
                      login
                    </span>
                  }
                  sx={navButtonSx("/login")}
                >
                  Kirjaudu
                </Button>

                <Button
                  component={Link}
                  to="/register"
                  startIcon={
                    <span className="material-symbols-outlined">
                      person_add
                    </span>
                  }
                  sx={navButtonSx("/register")}
                >
                  Rekisteröidy
                </Button>
              </>
            )}
          </Box>

          {/* Mobiilin hamburger */}
          <IconButton
            onClick={() => setDrawerOpen(true)}
            aria-label="Avaa navigaatio"
            sx={{
              display: {
                xs: "flex",
                md: "none",
              },
              ml: "auto",
              color: "text.primary",
            }}
          >
            <span className="material-symbols-outlined">
              menu
            </span>
          </IconButton>
        </Toolbar>
      </AppBar>

      {/* Mobiilin navigaatiovalikko */}
      <Drawer
        anchor="right"
        open={drawerOpen}
        onClose={closeDrawer}
      >
        <Box
          sx={{
            width: 280,
            pt: 2,
          }}
          role="presentation"
        >
          {/* Valikon otsikko */}
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              px: 2,
              pb: 2,
            }}
          >
            <Typography
              variant="h6"
              sx={{
                fontWeight: 700,
              }}
            >
              Valikko
            </Typography>

            <IconButton onClick={closeDrawer}>
              <span className="material-symbols-outlined">
                close
              </span>
            </IconButton>
          </Box>

          <Divider />

          <List>
            {/* Etusivu */}
            <ListItemButton
              component={Link}
              to="/"
              selected={isActive("/")}
              onClick={closeDrawer}
            >
              <ListItemIcon>
                <span className="material-symbols-outlined">
                  home
                </span>
              </ListItemIcon>

              <ListItemText primary="Etusivu" />
            </ListItemButton>

            {/* Uusi resepti */}
            <ListItemButton
              component={Link}
              to="/recipes/new"
              selected={isActive("/recipes/new")}
              onClick={closeDrawer}
            >
              <ListItemIcon>
                <span className="material-symbols-outlined">
                  add
                </span>
              </ListItemIcon>

              <ListItemText primary="Uusi resepti" />
            </ListItemButton>
          </List>

          <Divider />

          <List>
            {user ? (
              <>
                {/* Käyttäjä */}
                <ListItemButton
                  sx={{
                    cursor: "default",
                    "&:hover": {
                      backgroundColor: "transparent",
                    },
                  }}
                >
                  <ListItemIcon>
                    <span className="material-symbols-outlined">
                      account_circle
                    </span>
                  </ListItemIcon>

                  <ListItemText
                    primary={user.username}
                    secondary="Kirjautuneena"
                  />
                </ListItemButton>

                {/* Logout */}
                <ListItemButton onClick={logOut}>
                  <ListItemIcon>
                    <span className="material-symbols-outlined">
                      logout
                    </span>
                  </ListItemIcon>

                  <ListItemText primary="Kirjaudu ulos" />
                </ListItemButton>
              </>
            ) : (
              <>
                {/* Login */}
                <ListItemButton
                  component={Link}
                  to="/login"
                  selected={isActive("/login")}
                  onClick={closeDrawer}
                >
                  <ListItemIcon>
                    <span className="material-symbols-outlined">
                      login
                    </span>
                  </ListItemIcon>

                  <ListItemText primary="Kirjaudu" />
                </ListItemButton>

                {/* Register */}
                <ListItemButton
                  component={Link}
                  to="/register"
                  selected={isActive("/register")}
                  onClick={closeDrawer}
                >
                  <ListItemIcon>
                    <span className="material-symbols-outlined">
                      person_add
                    </span>
                  </ListItemIcon>

                  <ListItemText primary="Rekisteröidy" />
                </ListItemButton>
              </>
            )}
          </List>
        </Box>
      </Drawer>
    </>
  )
}

export default NavBar