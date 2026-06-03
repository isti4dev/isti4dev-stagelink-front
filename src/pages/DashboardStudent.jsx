import { useState, useEffect } from "react"
import { Link, useNavigate } from "react-router-dom"
import api from "../api/axios"
import { useAuth } from "../context/AuthContext"
import toast from "react-hot-toast"
import "./DashboardStudent.css"

const STATUS_CLASS = {
  pending: "status-pending",
  accepted: "status-accepted",
  rejected: "status-rejected",
  interview: "status-interview",
}

const STATUS_LABEL = {
  pending: "En attente",
  accepted: "Accepté",
  rejected: "Refusé",
  interview: "Entretien",
}

export default function DashboardStudent() {
  const { user, logout } = useAuth()
  const navigate = useNavigate()
  const [applications, setApplications] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    api.get("/applications/my")
      .then(res => setApplications(res.data))
      .catch(console.error)
      .finally(() => setLoading(false))
  }, [])

  const handleLogout = async () => {
    try { await api.post("/logout") } catch {}
    logout()
    navigate("/")
    toast.success("Déconnecté")
  }

  const initial = user?.name?.charAt(0).toUpperCase() || "U"

  const stats = [
    { icon: "📋", number: 12, label: "Offres consultées" },
    { icon: "👁", number: applications.length, label: "Candidatures envoyées" },
    { icon: "⏳", number: applications.filter(a => a.status === "pending").length, label: "En attente" },
    { icon: "✅", number: applications.filter(a => a.status === "accepted").length, label: "Acceptée" },
  ]

  return (
    <div className="dashboard-page">

      {/* SIDEBAR */}
      <aside className="sidebar">
        <div className="sidebar-logo"> StageLink</div>
        <nav className="sidebar-menu">
          <a className="sidebar-item active">
            <span className="icon">📊</span> Tableau de bord
          </a>
          <Link to="/offers" className="sidebar-item">
            <span className="icon">💼</span> Offres de stage
          </Link>
          <a className="sidebar-item">
            <span className="icon">📄</span> Mes candidatures
          </a>
          <a className="sidebar-item">
            <span className="icon">📁</span> Mes documents
          </a>
          <a className="sidebar-item">
            <span className="icon">💬</span> Messages
          </a>
          <a className="sidebar-item">
            <span className="icon">👤</span> Profil
          </a>
          <a className="sidebar-item">
            <span className="icon">⚙️</span> Paramètres
          </a>
        </nav>
        <div className="sidebar-logout">
          <button className="sidebar-item" onClick={handleLogout}>
            <span className="icon">🚪</span> Déconnexion
          </button>
        </div>
      </aside>

      {/* CONTENU */}
      <main className="dashboard-main">

        {/* TOPBAR */}
        <div className="dashboard-topbar">
          <div></div>
          <div className="user-info">
            <button className="notif-btn">🔔</button>
            <div className="user-avatar">{initial}</div>
            <div>
              <div className="user-name">{user?.name}</div>
              <div className="user-role">Étudiant</div>
            </div>
          </div>
        </div>

        {/* GREETING */}
        <div className="greeting">
          <h1>Salut, {user?.name} ! 👋</h1>
          <p>Voici un aperçu de votre activité</p>
        </div>

        {/* STATS */}
        <div className="stats-row">
          {stats.map((s, i) => (
            <div key={i} className="stat-card">
              <div className="stat-icon">{s.icon}</div>
              <div className="stat-number">{s.number}</div>
              <div className="stat-label">{s.label}</div>
            </div>
          ))}
        </div>

        {/* CANDIDATURES */}
        <div className="section-header">
          <h2 className="section-title">Mes candidatures récentes</h2>
          <a className="see-all">Voir tout</a>
        </div>

        {loading ? (
          <p>Chargement...</p>
        ) : (
          <div className="applications-table">
            <div className="table-header">
              <span>Offre</span>
              <span>Entreprise</span>
              <span>Date</span>
              <span>Statut</span>
            </div>
            {applications.length === 0 ? (
              <div style={{ padding: "32px", textAlign: "center", color: "rgb(107, 114, 128)" }}>
                Aucune candidature pour instant.{" "}
                <Link to="/offers" style={{ color: "rgb(29, 78, 216)" }}>
                  Parcourir les offres
                </Link>
              </div>
            ) : applications.map(app => (
              <div key={app.id} className="table-row">
                <span className="row-offer">{app.offer_title}</span>
                <span className="row-company">{app.company_name}</span>
                <span className="row-date">
                  {new Date(app.created_at).toLocaleDateString("fr-FR")}
                </span>
                <span className={`status-badge ${STATUS_CLASS[app.status]}`}>
                  {STATUS_LABEL[app.status]}
                </span>
              </div>
            ))}
          </div>
        )}

        {/* CONSEIL DU JOUR */}
        <div className="conseil-card">
          <div className="conseil-title">Conseil du jour</div>
          <div className="conseil-text">
            Complétez votre profil à 100% pour augmenter vos chances.
          </div>
          <div className="progress-bar">
            <div className="progress-fill" style={{ width: "70%" }} />
          </div>
          <div className="progress-label">70%</div>
        </div>

      </main>
    </div>
  )
}