import { useState } from "react"
import { useParams, useNavigate, Link } from "react-router-dom"
import api from "../api/axios"
import { useAuth } from "../context/AuthContext"
import toast from "react-hot-toast"
import "./Apply.css"

export default function Apply() {
  const { id } = useParams()
  const navigate = useNavigate()
  const { user } = useAuth()
  const [loading, setLoading] = useState(false)
  const [form, setForm] = useState({
    cover_letter: "",
    cv_url: "",
    portfolio_url: "",
    motivation: "",
  })

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    try {
      await api.post(`/applications`, {
        offer_id: id,
        ...form,
      })
      toast.success("Candidature envoyée avec succès !")
      navigate("/dashboard/student")
    } catch (err) {
      toast.error("Erreur lors de l'envoi de la candidature")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="apply-page">
      <Link to={`/offers/${id}`} className="back-link">
        ← Retour
      </Link>

      <div className="apply-container">
        <div className="apply-header">
          <h1>Postulez pour ce stage</h1>
          <p>Remplissez les informations ci-dessous pour soumettre votre candidature</p>
        </div>

        <form onSubmit={handleSubmit} className="apply-form">
          <div className="form-section">
            <h2>Informations personnelles</h2>
            <div className="info-display">
              <div className="info-item">
                <label>Nom complet</label>
                <p>{user?.name}</p>
              </div>
              <div className="info-item">
                <label>Email</label>
                <p>{user?.email}</p>
              </div>
            </div>
          </div>

          <div className="form-section">
            <h2>Documents</h2>
            <div className="form-group">
              <label>Lien vers votre CV</label>
              <input
                type="url"
                name="cv_url"
                value={form.cv_url}
                onChange={handleChange}
                placeholder="https://exemple.com/mon-cv.pdf"
                required
              />
            </div>

            <div className="form-group">
              <label>Lien vers votre portfolio (optionnel)</label>
              <input
                type="url"
                name="portfolio_url"
                value={form.portfolio_url}
                onChange={handleChange}
                placeholder="https://exemple.com/portfolio"
              />
            </div>
          </div>

          <div className="form-section">
            <h2>Lettre de motivation</h2>
            <div className="form-group">
              <label>Lettre de motivation</label>
              <textarea
                name="cover_letter"
                value={form.cover_letter}
                onChange={handleChange}
                placeholder="Expliquez pourquoi vous êtes intéressé par ce stage..."
                rows="6"
                required
              />
            </div>

            <div className="form-group">
              <label>Motivation supplémentaire</label>
              <textarea
                name="motivation"
                value={form.motivation}
                onChange={handleChange}
                placeholder="Ajoutez des informations supplémentaires si nécessaire..."
                rows="4"
              />
            </div>
          </div>

          <div className="form-actions">
            <button
              type="button"
              onClick={() => navigate(`/offers/${id}`)}
              className="btn-cancel"
            >
              Annuler
            </button>
            <button type="submit" className="btn-submit" disabled={loading}>
              {loading ? "Envoi en cours..." : "Soumettre ma candidature"}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}