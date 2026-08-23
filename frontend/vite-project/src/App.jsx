import { useState, useEffect } from 'react'
import recipeService from './services/recipes'
import Login from './components/Login'
import Home from './components/Home'
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom'

const App = () => {
  const [recipes, setRecipes] = useState([])
  
  useEffect(() => {
    getRecipes()
  }, [])

  const getRecipes = async () => {
    const response = await recipeService.getAll()
    const mappedRecipes = response.map(recipe => <p key={recipe.id}>{recipe.name}</p>)
    console.log(mappedRecipes)
    setRecipes(mappedRecipes)
  }

  const padding = {
    padding: 5
  }

  return (
    <Router>
      <div>
        <h2>Food App</h2>
        <Link style={padding} to="/">Home</Link>
        <Link style={padding} to="/login">Login</Link>
      </div>

      <Routes>
        <Route path="/" element={<Home recipes={recipes} />}/>
        <Route path="/login" element={<Login />}/>
      </Routes>  
    
    </Router>
  )
}

export default App
