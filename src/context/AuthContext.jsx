import { createContext, useContext, useState, useEffect } from "react"
import api from "../api/axios"

const AuthContext = createContext()

export function AuthProvider({ children }) {
  const [token, setToken] = useState(localStorage.getItem("token"))
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const initUser = async () => {
      if (token) {
        try {
          const res = await api.get("/me")
          setUser(res.data)
        } catch {
          logout()
        }
      }
      setLoading(false)
    }
    initUser()
  }, [])

  const login = (newToken, userData) => {
    localStorage.setItem("token", newToken)
    setToken(newToken)
    setUser(userData)
  }

  const logout = () => {
    localStorage.removeItem("token")
    setToken(null)
    setUser(null)
  }

  return (
    <AuthContext.Provider value={{ token, user, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => useContext(AuthContext)