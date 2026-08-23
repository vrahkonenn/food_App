import { createContext, useState, useEffect } from "react";

const AuthContext = createContext()

export default AuthContext

export const AuthContextProvider = (props) => {
    const [user, setUser] = useState(null)

    useEffect(() => {
      const loggedUserJson = window.localStorage.getItem('loggedFoodAppUser')
      if (loggedUserJson) {
          const parsedUser = JSON.parse(loggedUserJson)
          setUser(parsedUser)
      }
    }, [])

    return(
        <AuthContext.Provider value={{ user, setUser }}>
            {props.children}
        </AuthContext.Provider>
    )
}