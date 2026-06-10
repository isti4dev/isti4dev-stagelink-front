import { useState } from "react"
import { useNavigate, Link } from "react-router-dom"
import api from "../api/axios"
import { useAuth } from "../context/AuthContext"
import toast from "react-hot-toast"
import "./CreateOffer.css"

export default function CreateOffer() {
  const navigate = useNavigate()
  const { user } = useAuth()
  const [loading, setLoading] = useState(false)
  const [form, setForm] = useState({
    title: "",
    description: "",
    missions: "",
    profile: "",
    sector: "",
    city: "",
    duration: 3,
    type: "Stage académique",
    start_date: "",
    salary: "",
  })

  const handleChange = (e) => {
    const { name, value } = e.target
    setForm({ ...form, [name]: value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!form.title || !form.description || !form.sector || !form.city) {
      toast.error("Veuillez remplir tous les champs obligatoires")
      return
    }
    setLoading(true)
    try {
      await api.post("/offers", form)
      toast.success("Offre créée avec succès !")
      navigate("/dashboard/company")
    } catch (err) {
      toast.error("Erreur lors de la création de l'offre")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="create-offer-page">
      <Link to="/dashboard/company" className="back-link">
        ← Retour au tableau de bord
      </Link>

      <div className="create-offer-container">
        <div className="create-offer-header">
          <h1>Créer une nouvelle offre de stage</h1>
          <p>Remplissez les informations de votre offre de stage</p>
        </div>

        <form onSubmit={handleSubmit} className="create-offer-form">
          <div className="form-section">
            <h2>Informations de base</h2>

            <div className="form-group">
              <label>Titre du poste *</label>
              <input
                type="text"
                name="title"
                value={form.title}
                onChange={handleChange}
                placeholder="Ex: Développeur Frontend React"
                required
              />
            </div>

            <div className="form-group-grid">
              <div className="form-group">
                <label>Secteur *</label>
                <select name="sector" value={form.sector} onChange={handleChange} required>
                  <option value="">Choisir un secteur</option>
                  <option value="Informatique">Informatique</option>
                  <option value="Finance">Finance</option>
                  <option value="Marketing">Marketing</option>
                  <option value="Gestion">Gestion</option>
                  <option value="BTP">BTP</option>
                  <option value="Santé">Santé</option>
                  <option value="Autre">Autre</option>
                </select>
              </div>

              <div className="form-group">
                <label>Ville *</label>
                <select name="city" value={form.city} onChange={handleChange} required>
                  <option value="">Choisir une ville</option>
                  <option value="Cotonou">Cotonou</option>
                  <option value="Porto-Novo">Porto-Novo</option>
                  <option value="Abomey-Calavi">Abomey-Calavi</option>
                  <option value="Parakou">Parakou</option>
                  <option value="Autre">Autre</option>
                </select>
              </div>
            </div>
          </div>

          <div className="form-section">
            <h2>Détails du stage</h2>

            <div className="form-group-grid">
              <div className="form-group">
                <label>Durée (mois) *</label>
                <input
                  type="number"
                  name="duration"
                  value={form.duration}
                  onChange={handleChange}
                  min="1"
                  max="12"
                  required
                />
              </div>

              <div className="form-group">
                <label>Type de stage *</label>
                <select name="type" value={form.type} onChange={handleChange} required>
                  <option value="Stage académique">Stage académique</option>
                  <option value="Stage professionnel">Stage professionnel</option>
                  <option value="Stage d'alternance">Stage d'alternance</option>
                </select>
              </div>
            </div>

            <div className="form-group-grid">
              <div className="form-group">
                <label>Date de début</label>
                <input
                  type="date"
                  name="start_date"
                  value={form.start_date}
                  onChange={handleChange}
                />
              </div>

              <div className="form-group">
                <label>Rémunération</label>
                <input
                  type="text"
                  name="salary"
                  value={form.salary}
                  onChange={handleChange}
                  placeholder="Ex: 30 000 FCFA/mois"
                />
              </div>
            </div>
          </div>

          <div className="form-section">
            <h2>Description et missions</h2>

            <div className="form-group">
              <label>Description du poste *</label>
              <textarea
                name="description"
                value={form.description}
                onChange={handleChange}
                placeholder="Décrivez le poste et l'environnement de travail..."
                rows="6"
                required
              />
            </div>

            <div className="form-group">
              <label>Missions (une par ligne)</label>
              <textarea
                name="missions"
                value={form.missions}
                onChange={handleChange}
                placeholder="- Mission 1\n- Mission 2\n- Mission 3"
                rows="5"
              />
            </div>

            <div className="form-group">
              <label>Profil recherché (une par ligne)</label>
              <textarea
                name="profile"
                value={form.profile}
                onChange={handleChange}
                placeholder="- Compétence 1\n- Compétence 2\n- Compétence 3"
                rows="5"
              />
            </div>
          </div>

          <div className="form-actions">
            <button
              type="button"
              onClick={() => navigate("/dashboard/company")}
              className="btn-cancel"
            >
              Annuler
            </button>
            <button type="submit" className="btn-submit" disabled={loading}>
              {loading ? "Création en cours..." : "Créer l'offre"}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}