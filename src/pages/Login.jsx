
import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import api from "../api/axios"
import { useAuth } from "../context/AuthContext"
import toast from "react-hot-toast"
import "./Login.css"


export default function Login() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [loading, setLoading] = useState(false)
  const { login } = useAuth()
  const navigate = useNavigate()

const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    try {
      const res = await api.post("/login", { email, password })
      login(res.data.token, res.data.user)
      toast.success("Bienvenue " + res.data.user.name)
      const role = res.data.user.role
      if (role === "student") navigate("/dashboard/student")
      else if (role === "company") navigate("/dashboard/company")
      else navigate("/admin")
    } catch (err) {
      toast.error("Email ou mot de passe incorrect")
    } finally {
      setLoading(false)
    }
  }


  return (
    <div className="login-page">
      <div className="login-box">

        <div className="login-logo">StageLink</div>

        <h1 className="login-title">Se connecter</h1>
        <p className="login-subtitle">Bienvenue de retour !</p>

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Email</label>
            <input
              type="email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              placeholder="Entrez votre email"
              required
            />
          </div>

          <div className="form-group">
            <label>Mot de passe</label>
            <input
              type="password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              placeholder="Entrez votre mot de passe"
              required
            />
            <a href="#" className="forgot">Mot de passe oublié ?</a>
          </div>

          <button type="submit" className="btn-submit" disabled={loading}>
            {loading ? "Connexion..." : "Se connecter"}
          </button>
        </form>


    <p className="form-footer">
          Vous n'avez pas de compte ? <Link to="/register/student">S'inscrire</Link>
        </p>

      </div>
    </div>
  )
}