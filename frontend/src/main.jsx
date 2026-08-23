import ReactDOM from 'react-dom/client'
import App from './App'
import { AuthContextProvider } from './context/authContext'
import { RecipeContextProvider } from './context/recipeContext'

ReactDOM.createRoot(document.getElementById('root')).render(
  <RecipeContextProvider>
    <AuthContextProvider>
      <App />
    </AuthContextProvider>
  </RecipeContextProvider>
)