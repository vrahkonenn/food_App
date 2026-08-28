import Login from './components/Login'
import Home from './components/Home'
import Register from './components/Register'
import NavBar from './components/NavBar'
import Recipe from './components/Recipe'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import CreateRecipeForm from './components/CreateRecipeForm'

const App = () => {

  return (
    <Router>
      <NavBar />
      <Routes>
        <Route path="/" element={<Home />}/>
        <Route path="/login" element={<Login />}/>
        <Route path="/register" element={<Register />}/>
        <Route path="/recipes/new" element={<CreateRecipeForm />}/>
        <Route path="/recipes/:id" element={<Recipe />}/>
      </Routes>      
    </Router>
  )
}

export default App
