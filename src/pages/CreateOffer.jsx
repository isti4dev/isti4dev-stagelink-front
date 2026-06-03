import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import api from "../api/axios"
import toast from "react-hot-toast"
import "./CreateOffer.css"

export default function CreateOffer() {
  const navigate = useNavigate()
  const [form, setForm] = useState({
    title: "",
    description: "",
    profile: "",
    city: "",
    sector: "",
    duration: "",
    type: "",
    start_date: "",
  })
  const [loading, setLoading] = useState(false)

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    try {
      await api.post("/offers", form)
      toast.success("Offre publiée avec succès !")
      navigate("/dashboard/company")
    } catch (err) {
      toast.error("Erreur lors de la publication")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="create-page">

      <Link to="/dashboard/company" className="create-back">
        ← Retour au dashboard
      </Link>

      <h1 className="create-title">Publier une offre</h1>
      <p className="create-subtitle">Remplissez les informations du poste</p>

      <div className="create-card">
        <form onSubmit={handleSubmit}>

          <div className="create-group">
            <label>Titre du poste *</label>
            <input
              type="text"
              name="title"
              value={form.title}
              onChange={handleChange}
              placeholder="Ex: Stagiaire Développeur Web"
              required
            />
          </div>

          <div className="create-row">
            <div className="create-group">
              <label>Secteur *</label>
              <select name="sector" value={form.sector} onChange={handleChange} required>
                <option value="">Choisir...</option>
                <option value="Informatique">Informatique</option>
                <option value="Finance">Finance</option>
                <option value="Marketing">Marketing</option>
                <option value="BTP">BTP</option>
                <option value="Santé">Santé</option>
              </select>
            </div>
            <div className="create-group">
              <label>Ville *</label>
              <input
                type="text"
                name="city"
                value={form.city}
                onChange={handleChange}
                placeholder="Ex: Cotonou"
                required
              />
            </div>
          </div>

          <div className="create-row">
            <div className="create-group">
              <label>Durée (mois) *</label>
              <select name="duration" value={form.duration} onChange={handleChange} required>
                <option value="">Choisir...</option>
                <option value="1">1 mois</option>
                <option value="2">2 mois</option>
                <option value="3">3 mois</option>
                <option value="6">6 mois</option>
              </select>
            </div>
            <div className="create-group">
              <label>Type *</label>
              <select name="type" value={form.type} onChange={handleChange} required>
                <option value="">Choisir...</option>
                <option value="Stage académique">Stage académique</option>
                <option value="Stage professionnel">Stage professionnel</option>
              </select>
            </div>
          </div>

          <div className="create-group">
            <label>Date de début *</label>
            <input
              type="date"
              name="start_date"
              value={form.start_date}
              onChange={handleChange}
              required
            />
          </div>

          <div className="create-group">
            <label>Description du poste *</label>
            <textarea
              name="description"
              value={form.description}
              onChange={handleChange}
              rows={5}
              placeholder="Décrivez les missions du stagiaire..."
              required
            />
          </div>

          <div className="create-group">
            <label>Profil recherché</label>
            <textarea
              name="profile"
              value={form.profile}
              onChange={handleChange}
              rows={3}
              placeholder="Compétences et qualités attendues..."
            />
          </div>

          <button type="submit" className="btn-create" disabled={loading}>
            {loading ? "Publication en cours..." : "Publier l'offre"}
          </button>

        </form>
      </div>

    </div>
  )
}