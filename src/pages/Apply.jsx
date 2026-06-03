import { useState } from "react"
import { Link, useParams, useNavigate } from "react-router-dom"
import api from "../api/axios"
import toast from "react-hot-toast"
import "./Apply.css"

export default function Apply() {
  const { id } = useParams()
  const navigate = useNavigate()
  const [cv, setCv] = useState(null)
  const [motivation, setMotivation] = useState("")
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!cv) {
      toast.error("Veuillez joindre votre CV")
      return
    }
    const formData = new FormData()
    formData.append("offer_id", id)
    formData.append("cv", cv)
    formData.append("motivation", motivation)

    setLoading(true)
    try {
      await api.post("/applications", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      })
      toast.success("Candidature envoyée avec succès !")
      navigate("/dashboard/student")
    } catch (err) {
      toast.error("Erreur lors de l'envoi")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="apply-page">

      <Link to={`/offers/${id}`} className="apply-back">
        ← Retour à l'offre
      </Link>

      <h1 className="apply-title">Postuler à l'offre</h1>
      <p className="apply-subtitle">Complétez votre candidature ci-dessous</p>

      <div className="apply-card">
        <form onSubmit={handleSubmit}>

          <div className="apply-group">
            <label>CV (PDF uniquement) *</label>
            <label className="upload-zone">
              <div className="upload-icon">📄</div>
              <div className="upload-text">
                {cv ? cv.name : <span>Cliquez pour choisir votre CV</span>}
              </div>
              <input
                type="file"
                accept=".pdf"
                onChange={e => setCv(e.target.files[0])}
                style={{ display: "none" }}
              />
            </label>
          </div>

          <div className="apply-group">
            <label>Lettre de motivation</label>
            <textarea
              rows={6}
              value={motivation}
              onChange={e => setMotivation(e.target.value)}
              placeholder="Expliquez pourquoi vous postulez à cette offre..."
            />
          </div>

          <button type="submit" className="btn-apply" disabled={loading}>
            {loading ? "Envoi en cours..." : "Envoyer ma candidature"}
          </button>

        </form>
      </div>

    </div>
  )
}