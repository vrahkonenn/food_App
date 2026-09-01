import { createTheme } from "@mui/material/styles"

const theme = createTheme({
  palette: {
    primary: {
      main: "#f57c00",
      dark: "#e65100",
      light: "#ffb74d",
      contrastText: "#ffffff",
    },

    background: {
      default: "#fafafa",
      paper: "#ffffff",
    },

    text: {
      primary: "#222222",
      secondary: "#666666",
    },
  },

  typography: {
    fontFamily: "Arial, sans-serif",

    h1: {
      fontWeight: 700,
    },

    h2: {
      fontWeight: 700,
    },

    h3: {
      fontWeight: 700,
    },

    h4: {
      fontWeight: 700,
    },

    h5: {
      fontWeight: 700,
    },

    h6: {
      fontWeight: 700,
    },
  },

  shape: {
    borderRadius: 10,
  },

  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: "none",
          fontWeight: 600,
          borderRadius: 8,
        },
      },
    },

    MuiPaper: {
      styleOverrides: {
        root: {
          backgroundImage: "none",
        },
      },
    },
  },
})

export default theme
