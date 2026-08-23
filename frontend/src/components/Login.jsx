import { useContext, useState } from "react"
import AuthContext from "../context/authContext"
import loginService from "../services/login"
import { useNavigate } from "react-router-dom"

const Login = () => {
    const { user, setUser } = useContext(AuthContext)

    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')

    const navigate = useNavigate()

    const handleLogin = async (event) => {
        event.preventDefault()
        console.log('logging in with', username, password)

        try {
            const response = await loginService.login(username, password)
            setUser(response)
            window.localStorage.setItem('loggedFoodAppUser', JSON.stringify(response))
            navigate('/')
        } catch (error) {
            console.log(error)
        }

        setUsername('')
        setPassword('')
    }

    return(
        <div>
            <form onSubmit={handleLogin}>
                <label>
                    Username
                    <input type="text" value={username} onChange={({ target }) => setUsername(target.value)}/>
                </label>

                <br></br>

                <label>
                    Password
                    <input type="password" value={password} onChange={({ target }) => setPassword(target.value)}/>
                </label>

                <br></br>

                <button type="Submit">Log in</button>

            </form>
        </div>
    )
}

export default Login