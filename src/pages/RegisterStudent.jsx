import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import api from "../api/axios"
import { useAuth } from "../context/AuthContext"
import toast from "react-hot-toast"
import "./RegisterStudent.css"

export default function RegisterStudent() {
  const [type, setType] = useState("student")
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    password_confirmation: "",
    filiere: "",
    niveau: "",
    company_name: "",
    city: "",
    sector: "",
  })
  const [loading, setLoading] = useState(false)
  const { login } = useAuth()
  const navigate = useNavigate()

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (form.password !== form.password_confirmation) {
      toast.error("Les mots de passe ne correspondent pas")
      return
    }
    setLoading(true)
    try {
      const res = await api.post("/register", { ...form, role: type })
      login(res.data.token, res.data.user)
      toast.success("Compte créé avec succès !")
      if (type === "student") navigate("/dashboard/student")
      else navigate("/dashboard/company")
    } catch (err) {
      toast.error("Erreur lors de l'inscription")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="register-page">
      <div className="register-box">

        <div className="register-logo">StageLink</div>

        <h1 className="register-title">Créer un compte</h1>
        <p className="register-subtitle">Choisissez votre type de compte</p>

        <div className="type-selector">
          <button
            type="button"
            className={`type-btn ${type === "student" ? "active" : ""}`}
            onClick={() => setType("student")}
          >
            <div className="type-icon">🎓</div>
            <div className="type-label">Étudiant</div>
          </button>
          <button
            type="button"
            className={`type-btn ${type === "company" ? "active" : ""}`}
            onClick={() => setType("company")}
          >
            <div className="type-icon">🏢</div>
            <div className="type-label">Entreprise</div>
          </button>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Nom complet</label>
            <input
              type="text"
              name="name"
              value={form.name}
              onChange={handleChange}
              placeholder="Entrez votre nom complet"
              required
            />
          </div>

          <div className="form-group">
            <label>Email</label>
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              placeholder="Entrez votre email"
              required
            />
          </div>

          {type === "student" && (
            <>
              <div className="form-group">
                <label>Filière</label>
                <select name="filiere" value={form.filiere} onChange={handleChange} required>
                  <option value="">Choisir votre filière</option>
                  <option value="Informatique">Informatique</option>
                  <option value="Gestion">Gestion</option>
                  <option value="Marketing">Marketing</option>
                  <option value="Finance">Finance</option>
                  <option value="RH">Ressources Humaines</option>
                </select>
              </div>
              <div className="form-group">
                <label>Niveau</label>
                <select name="niveau" value={form.niveau} onChange={handleChange} required>
                  <option value="">Choisir votre niveau</option>
                  <option value="Licence 1">Licence 1</option>
                  <option value="Licence 2">Licence 2</option>
                  <option value="Licence 3">Licence 3</option>
                  <option value="Master 1">Master 1</option>
                  <option value="Master 2">Master 2</option>
                </select>
              </div>
            </>
          )}

          {type === "company" && (
            <>
              <div className="form-group">
                <label>Nom de l'entreprise</label>
                <input
                  type="text"
                  name="company_name"
                  value={form.company_name}
                  onChange={handleChange}
                  placeholder="Nom de votre entreprise"
                  required
                />
              </div>
              <div className="form-group">
                <label>Secteur</label>
                <select name="sector" value={form.sector} onChange={handleChange} required>
                  <option value="">Choisir le secteur</option>
                  <option value="Informatique">Informatique</option>
                  <option value="Finance">Finance</option>
                  <option value="Marketing">Marketing</option>
                  <option value="BTP">BTP</option>
                  <option value="Santé">Santé</option>
                </select>
              </div>
              <div className="form-group">
                <label>Ville</label>
                <input
                  type="text"
                  name="city"
                  value={form.city}
                  onChange={handleChange}
                  placeholder="Votre ville"
                  required
                />
              </div>
            </>
          )}

          <div className="form-group">
            <label>Mot de passe</label>
            <input
              type="password"
              name="password"
              value={form.password}
              onChange={handleChange}
              placeholder="Créez un mot de passe"
              required
            />
          </div>

          <div className="form-group">
            <label>Confirmer le mot de passe</label>
            <input
              type="password"
              name="password_confirmation"
              value={form.password_confirmation}
              onChange={handleChange}
              placeholder="Confirmez votre mot de passe"
              required
            />
          </div>

          <button type="submit" className="btn-submit" disabled={loading}>
            {loading ? "Création du compte..." : "Créer mon compte"}
          </button>
        </form>

        <p className="form-footer">
          Vous avez déjà un compte ? <Link to="/login">Se connecter</Link>
        </p>

      </div>
    </div>
  )
}