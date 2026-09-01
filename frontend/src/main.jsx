import ReactDOM from 'react-dom/client'
import App from './App'
import theme from './theme'
import { AuthContextProvider } from './context/authContext'
import { RecipeContextProvider } from './context/recipeContext'
import { CssBaseline } from "@mui/material"
import { ThemeProvider } from "@mui/material/styles"

ReactDOM.createRoot(document.getElementById('root')).render(
  <RecipeContextProvider>
    <AuthContextProvider>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <App />
      </ThemeProvider>
    </AuthContextProvider>
  </RecipeContextProvider>
)