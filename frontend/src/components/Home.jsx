import { Link } from "react-router-dom"
import {
  Box,
  Typography,
  Button,
  Paper,
} from "@mui/material"

import heroImage from "../assets/etusivukuva.png"
import foodImage from "../assets/ruoka1.jpg"

const Home = () => {
  return (
    <Box>
      {/* Hero-kuva */}
      <Box
        sx={{
          width: "100%",
          height: {
            xs: 300,
            sm: 400,
            md: 500,
          },
          position: "relative",
          overflow: "hidden",
        }}
      >
        <Box
          component="img"
          src={heroImage}
          alt="Ruokaa"
          sx={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
            display: "block",
          }}
        />

        <Box
          sx={{
            position: "absolute",
            inset: 0,
            background:
              "linear-gradient(to bottom, rgba(0,0,0,0.05), rgba(0,0,0,0.5))",
          }}
        />

        <Box
          sx={{
            position: "absolute",
            inset: 0,
            display: "flex",
            alignItems: "flex-end",
            justifyContent: "center",
            pb: {
              xs: 4,
              md: 6,
            },
            px: 2,
          }}
        >
          <Typography
            variant="h2"
            sx={{
              color: "white",
              fontWeight: 800,
              textAlign: "center",
              textShadow: "0 2px 8px rgba(0,0,0,0.5)",
              fontSize: {
                xs: "2.5rem",
                sm: "3.5rem",
                md: "4.5rem",
              },
            }}
          >
            Hyvää ruokaa, hyviä reseptejä
          </Typography>
        </Box>
      </Box>

      {/* V-Ruoka esittely */}
      <Box
        sx={{
          width: {
            xs: "92%",
            md: "80%",
          },
          maxWidth: 1200,
          mx: "auto",
          py: {
            xs: 7,
            md: 10,
          },
        }}
      >
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: {
              xs: "1fr",
              md: "1fr 1fr",
            },
            gap: {
              xs: 5,
              md: 8,
            },
            alignItems: "center",
          }}
        >
          {/* Teksti */}
          <Box>
            <Typography
              variant="h3"
              sx={{
                fontWeight: 800,
                mb: 3,
              }}
            >
              V-Ruoka
            </Typography>

            <Typography
              variant="h6"
              sx={{
                fontWeight: 400,
                lineHeight: 1.7,
                color: "text.secondary",
              }}
            >
              V-Ruoka on yksityiseen käyttöön tehty reseptisovellus, jonne voit tallentaa reseptejäsi ja selata omia, sekä muiden lisäämiä ruoka ideoita nälän yllättäessä.
            </Typography>

            <Typography
              sx={{
                mt: 2,
                lineHeight: 1.8,
                color: "text.secondary",
              }}
            >
              Tutustu resepteihin, arvioi ja kommentoi muiden tekemiä ruokia ja löydä
              inspiraatiota seuraavaan kokkailuun.
            </Typography>
          </Box>

          {/* Kuva */}
          <Box
            component="img"
            src={foodImage}
            alt="Herkullista ruokaa"
            sx={{
              width: "100%",
              height: {
                xs: 280,
                md: 380,
              },
              objectFit: "cover",
              borderRadius: 4,
              boxShadow: 4,
            }}
          />
        </Box>
      </Box>

      {/* Reseptit */}
      <Box
        sx={{
          backgroundColor: "grey.100",
          py: {
            xs: 7,
            md: 9,
          },
          px: 2,
        }}
      >
        <Box
          sx={{
            maxWidth: 900,
            mx: "auto",
            textAlign: "center",
          }}
        >
          <span
            className="material-symbols-outlined"
            style={{
              fontSize: "52px",
              marginBottom: "12px",
            }}
          >
            menu_book
          </span>

          <Typography
            variant="h4"
            sx={{
              fontWeight: 800,
              mb: 2,
            }}
          >
            Tutustu resepteihin
          </Typography>

          <Typography
            sx={{
              maxWidth: 650,
              mx: "auto",
              mb: 4,
              lineHeight: 1.7,
              color: "text.secondary",
            }}
          >
            Löydä uusia suosikkeja ja inspiraatiota seuraavaan
            ruokahetkeen. Tutustu kaikkiin V-Ruoan resepteihin.
          </Typography>

          <Button
            component={Link}
            to="/recipes"
            variant="contained"
            size="large"
            startIcon={
              <span className="material-symbols-outlined">
                restaurant_menu
              </span>
            }
            sx={{
              px: 4,
              py: 1.5,
              borderRadius: 3,
              fontWeight: 700,
              fontSize: "1rem",
            }}
          >
            Katso reseptit
          </Button>
        </Box>
      </Box>

      {/* Uuden reseptin luominen */}
      <Box
        sx={{
          py: {
            xs: 7,
            md: 9,
          },
          px: 2,
        }}
      >
        <Paper
          elevation={0}
          sx={{
            maxWidth: 1000,
            mx: "auto",
            p: {
              xs: 4,
              md: 7,
            },
            borderRadius: 4,
            backgroundColor: "primary.main",
            color: "white",
            textAlign: "center",
          }}
        >
          <span
            className="material-symbols-outlined"
            style={{
              fontSize: "52px",
              marginBottom: "12px",
            }}
          >
            add_circle
          </span>

          <Typography
            variant="h4"
            sx={{
              fontWeight: 800,
              mb: 2,
            }}
          >
            Jaa oma reseptisi
          </Typography>

          <Typography
            sx={{
              maxWidth: 650,
              mx: "auto",
              mb: 4,
              lineHeight: 1.7,
            }}
          >
            Onko sinulla hyväksi havaittu resepti, jonka haluaisit
            tallentaa itsellesi tai lisätä muiden nähtäväksi? Luo oma reseptisi ja anna muiden
            kokeilla sitä.
          </Typography>

          <Button
            component={Link}
            to="/recipes/new"
            variant="contained"
            size="large"
            startIcon={
              <span className="material-symbols-outlined">
                add
              </span>
            }
            sx={{
              backgroundColor: "white",
              color: "primary.main",
              px: 4,
              py: 1.5,
              borderRadius: 3,
              fontWeight: 700,
              fontSize: "1rem",
              "&:hover": {
                backgroundColor: "grey.100",
              },
            }}
          >
            Luo uusi resepti
          </Button>
        </Paper>
      </Box>
    </Box>
  )
}

export default Home
