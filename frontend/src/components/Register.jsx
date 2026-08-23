import { useContext, useState } from "react"
import AuthContext from "../context/authContext"
import registerService from "../services/register"
import { useNavigate } from "react-router-dom"

const Register = () => {
    const [username, setUsername] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    
    const navigate = useNavigate()
    
    const handleRegister = async (event) => {
        event.preventDefault()
        console.log('Registering with', username, email, password)

        try {
            const response = await registerService.register(username, email, password)
            navigate('/login')

        } catch(error) {
            console.log(error)
        }
        
        setUsername('')
        setEmail('')
        setPassword('')
    }

    return(
        <div>
            <form onSubmit={handleRegister}>
                <label>
                    Username
                    <input type="text" value={username} onChange={({ target }) => setUsername(target.value)}/>
                </label>

                <br></br>

                <label>
                    Email
                    <input type="email" value={email} onChange={({ target }) => setEmail(target.value)}/>
                </label>

                <br></br>

                <label>
                    Password
                    <input type="password" value={password} onChange={({ target }) => setPassword(target.value)}/>
                </label>

                <br></br>

                <button type="Submit">Register</button>
            </form>
        </div>
    )
}

export default Register