import { useState, useEffect } from "react"
import { useParams, Link } from "react-router-dom"
import api from "../api/axios"
import "./OfferDetail.css"

export default function OfferDetail() {
  const { id } = useParams()
  const [offer, setOffer] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    api.get(`/offers/${id}`)
      .then(res => setOffer(res.data))
      .catch(console.error)
      .finally(() => setLoading(false))
  }, [id])

  if (loading) return (
    <div style={{ textAlign: "center", padding: "80px" }}>
      Chargement...
    </div>
  )

  if (!offer) return (
    <div style={{ textAlign: "center", padding: "80px" }}>
      Offre introuvable
    </div>
  )

  return (
    <div className="detail-page">

      <Link to="/offers" className="back-link">
        ← Retour aux offres
      </Link>

      <div className="detail-card">

        <div className="detail-header">
          <div className="detail-company-info">
            <div className="detail-logo">🏦</div>
            <div>
              <div className="detail-company-name">
                {offer.company_name}
                <span className="verified">✔</span>
              </div>
              <h1 className="detail-title">{offer.title}</h1>
              <p className="detail-published">Publié il y a 2 jours</p>
            </div>
          </div>
          <Link to={`/offers/${id}/apply`} className="btn-postuler">
            Postuler maintenant
          </Link>
        </div>

  
        <div className="detail-meta">
          <div className="meta-item">
            <div className="meta-label">Type de stage</div>
            <div className="meta-value">{offer.type || "Stage académique"}</div>
          </div>
     <div className="meta-item">
            <div className="meta-label">Durée</div>
            <div className="meta-value">{offer.duration} mois</div>
          </div>
          <div className="meta-item">
            <div className="meta-label">Début</div>
            <div className="meta-value">{offer.start_date || "Dès que possible"}</div>
          </div>
          <div className="meta-item">
            <div className="meta-label">Rémunération</div>
            <div className="meta-value">{offer.salary || "À discuter"}</div>
          </div>
        </div>

        <div className="detail-section">
          <h2>Description du poste</h2>
          <p>{offer.description}</p>
        </div>

        
        {offer.missions && (
          <div className="detail-section">
            <h2>Missions</h2>
            <ul>
              {offer.missions.split("\n").map((m, i) => (
                <li key={i}>{m}</li>
              ))}
            </ul>
          </div>
        )}

      
        {offer.profile && (
          <div className="detail-section">
            <h2>Profil recherché</h2>
            <ul>
              {offer.profile.split("\n").map((p, i) => (
                <li key={i}>{p}</li>
              ))}
            </ul>
          </div>
        )}

      </div>
    </div>
  )
}