import Login from './components/Login'
import Home from './components/Home'
import Register from './components/Register'
import NavBar from './components/NavBar'
import Recipe from './components/Recipe'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import CreateRecipeForm from './components/CreateRecipeForm'
import Footer from './components/Footer'
import RecipeList from './components/RecipeList'

const App = () => {

  return (
    <Router>
      <NavBar />
      <Routes>
        <Route path="/" element={<Home />}/>
        <Route path="/login" element={<Login />}/>
        <Route path="/register" element={<Register />}/>
        <Route path="/recipes" element={<RecipeList />}/>
        <Route path="/recipes/new" element={<CreateRecipeForm />}/>
        <Route path="/recipes/:id" element={<Recipe />}/>
      </Routes>
      <Footer />      
    </Router>
  )
}

export default App
