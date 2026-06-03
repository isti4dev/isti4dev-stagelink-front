import { useState, useEffect } from "react"
import { Link, useNavigate } from "react-router-dom"
import api from "../api/axios"
import { useAuth } from "../context/AuthContext"
import toast from "react-hot-toast"
import "./DashboardCompany.css"

export default function DashboardCompany() {
  const { user, logout } = useAuth()
  const navigate = useNavigate()
  const [offers, setOffers] = useState([])
  const [applications, setApplications] = useState([])
  const [loading, setLoading] = useState(true)



  useEffect(() => {
    Promise.all([
      api.get("/offers?my=true"),
      api.get("/applications/received"),
    ])
      .then(([offersRes, appsRes]) => {
        setOffers(offersRes.data)
      setApplications(appsRes.data)
      })
      .catch(console.error)
      .finally(() => setLoading(false))
  }, [])



  const handleLogout = async () => {
    try { await api.post("/logout") } catch {}
    logout()
    navigate("/")
    toast.success("Déconnecté")
  }



  const updateStatus = async (appId, status) => {
    try {
      await api.put(`/applications/${appId}/status`, { status })
      setApplications(prev =>
        prev.map(a => a.id === appId ? { ...a, status } : a)
      )
      toast.success("Statut mis à jour")
    } catch {
      toast.error("Erreur lors de la mise à jour")
    }
  }


  const pauseOffer = async (offerId) => {
    try {
      await api.put(`/offers/${offerId}/pause`)
      setOffers(prev =>
        prev.map(o => o.id === offerId ? { ...o, status: "paused" } : o)
      )
      toast.success("Offre mise en pause")
    } catch {
      toast.error("Erreur")
    }
  }


  const initial = user?.name?.charAt(0).toUpperCase() || "R"

  return (
    <div className="company-page">

      {/* SIDEBAR */}
      <aside className="company-sidebar">
        <div className="company-sidebar-logo"> StageLink</div>
        <nav className="company-sidebar-menu">
          <a className="company-sidebar-item active">
            <span>📊</span> Tableau de bord
          </a>
          <Link to="/offers/create" className="company-sidebar-item">
            <span>➕</span> Publier une offre
          </Link>
          <a className="company-sidebar-item">
            <span>💼</span> Mes offres
          </a>
          <a className="company-sidebar-item">
            <span>📄</span> Candidatures
          </a>
          <a className="company-sidebar-item">
            <span>👤</span> Profil
          </a>
          <a className="company-sidebar-item">
            <span>⚙️</span> Paramètres
          </a>
        </nav>
        <div className="company-sidebar-logout">
          <button className="company-sidebar-item" onClick={handleLogout}>
            <span>🚪</span> Déconnexion
          </button>
        </div>
      </aside>




      <main className="company-main">

  
        <div className="company-topbar">
          <div></div>
          <div className="company-user-info">
            <button style={{ background: "none", border: "none", fontSize: "20px", cursor: "pointer" }}>🔔</button>
            <div className="company-avatar">{initial}</div>
            <div>
              <div className="company-user-name">{user?.name}</div>
              <div className="company-user-role">Recruteur</div>
            </div>
          </div>
        </div>


        <div className="company-greeting">
          <h1>Bonjour, {user?.name} ! 👋</h1>
          <Link to="/offers/create" className="btn-new-offer">
            + Nouvelle offre
          </Link>
        </div>

        {/* STATS */}
        <div className="company-stats-row">
          {[
            { number: offers.length, label: "Offres publiées" },
            { number: applications.length, label: "Candidatures reçues" },
            { number: applications.filter(a => a.status === "pending").length, label: "En attente" },
          ].map((s, i) => (
            <div key={i} className="company-stat-card">
              <div className="company-stat-number">{s.number}</div>
              <div className="company-stat-label">{s.label}</div>
            </div>
          ))}
        </div>

        {/* MES OFFRES */}
        <h2 className="company-section-title">Mes offres</h2>
        <div className="offers-table">
          <div className="offers-table-header">
            <span>Titre</span>
            <span>Ville</span>
            <span>Durée</span>
            <span>Statut</span>
            <span>Action</span>
          </div>
          {loading ? (
            <div style={{ padding: "24px", textAlign: "center", color: "rgb(107, 114, 128)" }}>
              Chargement...
            </div>
          ) : offers.length === 0 ? (
            <div style={{ padding: "24px", textAlign: "center", color: "rgb(107, 114, 128)" }}>
              Aucune offre publiée.{" "}
              <Link to="/offers/create" style={{ color: "rgb(29, 78, 216)" }}>
                Publier une offre
              </Link>
            </div>
          ) : offers.map(offer => (
            <div key={offer.id} className="offers-table-row">
              <span className="row-title">{offer.title}</span>
              <span className="row-city">{offer.city}</span>
              <span className="row-duration">{offer.duration} mois</span>
              <span className={offer.status === "active" ? "offer-status-active" : "offer-status-paused"}>
                {offer.status === "active" ? "Active" : "En pause"}
              </span>
              {offer.status === "active" && (
                <button className="btn-pause" onClick={() => pauseOffer(offer.id)}>
                  Pause
                </button>
              )}
            </div>
          ))}
        </div>



  
        <h2 className="company-section-title">Candidatures reçues</h2>
        <div className="applications-section">
          <div className="applications-header">
            <span>Étudiant</span>
            <span>Offre</span>
            <span>Statut</span>
            <span>Actions</span>
          </div>
          {applications.length === 0 ? (
            <div style={{ padding: "24px", textAlign: "center", color: "rgb(107, 114, 128)" }}>
              Aucune candidature reçue pour l'instant
            </div>
          ) : applications.map(app => (
            <div key={app.id} className="applications-row">
              <span className="app-student">{app.student_name}</span>
              <span className="app-offer">{app.offer_title}</span>
              <span>{app.status}</span>
              <div className="app-actions">
            <button className="btn-accept" onClick={() => updateStatus(app.id, "accepted")}>
                  Accepter
                </button>
                <button className="btn-interview" onClick={() => updateStatus(app.id, "interview")}>
                  Entretien
                </button>
                <button className="btn-reject" onClick={() => updateStatus(app.id, "rejected")}>
                  Refuser
                </button>
              </div>
            </div>
          ))}
        </div>

      </main>
    </div>
  )
}