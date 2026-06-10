import { useState, useEffect } from "react"
import { Link, useNavigate } from "react-router-dom"
import api from "../api/axios"
import { useAuth } from "../context/AuthContext"
import toast from "react-hot-toast"
import "./AdminDashboard.css"

export default function AdminDashboard() {
  const { user, logout } = useAuth()
  const navigate = useNavigate()
  const [stats, setStats] = useState({ users: 0, offers: 0, applications: 0 })
  const [users, setUsers] = useState([])
  const [loading, setLoading] = useState(true)
  const [filter, setFilter] = useState("all")

  useEffect(() => {
    Promise.all([
      api.get("/admin/stats"),
      api.get("/admin/users"),
    ])
      .then(([statsRes, usersRes]) => {
        setStats(statsRes.data)
        setUsers(usersRes.data)
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

  const updateUserStatus = async (userId, status) => {
    try {
      await api.put(`/admin/users/${userId}`, { status })
      setUsers(prev =>
        prev.map(u => u.id === userId ? { ...u, status } : u)
      )
      toast.success("Statut utilisateur mis à jour")
    } catch {
      toast.error("Erreur lors de la mise à jour")
    }
  }

  const deleteUser = async (userId) => {
    if (!window.confirm("Êtes-vous sûr de vouloir supprimer cet utilisateur ?")) return
    try {
      await api.delete(`/admin/users/${userId}`)
      setUsers(prev => prev.filter(u => u.id !== userId))
      toast.success("Utilisateur supprimé")
    } catch {
      toast.error("Erreur lors de la suppression")
    }
  }

  const filteredUsers = filter === "all" ? users : users.filter(u => u.role === filter)
  const initial = user?.name?.charAt(0).toUpperCase() || "A"

  return (
    <div className="admin-page">
      <aside className="admin-sidebar">
        <div className="admin-sidebar-logo">StageLink Admin</div>
        <nav className="admin-sidebar-menu">
          <a className="admin-sidebar-item active">
            <span>📊</span> Tableau de bord
          </a>
          <a className="admin-sidebar-item">
            <span>👥</span> Utilisateurs
          </a>
          <a className="admin-sidebar-item">
            <span>📋</span> Offres
          </a>
          <a className="admin-sidebar-item">
            <span>📊</span> Rapports
          </a>
          <a className="admin-sidebar-item">
            <span>⚙️</span> Paramétrer
          </a>
        </nav>
        <div className="admin-sidebar-logout">
          <button className="admin-sidebar-item" onClick={handleLogout}>
            <span>🚪</span> Déconnexion
          </button>
        </div>
      </aside>

      <main className="admin-main">
        <div className="admin-topbar">
          <div></div>
          <div className="admin-user-info">
            <button style={{ background: "none", border: "none", fontSize: "20px", cursor: "pointer" }}>🔔</button>
            <div className="admin-avatar">{initial}</div>
            <div>
              <div className="admin-user-name">{user?.name}</div>
              <div className="admin-user-role">Administrateur</div>
            </div>
          </div>
        </div>

        <div className="admin-greeting">
          <h1>Bienvenue, {user?.name} ! 👋</h1>
          <p>Gérez le contenu et les utilisateurs de la plateforme</p>
        </div>

        <div className="admin-stats-row">
          <div className="admin-stat-card">
            <div className="admin-stat-icon">👥</div>
            <div className="admin-stat-content">
              <div className="admin-stat-number">{stats.users}</div>
              <div className="admin-stat-label">Utilisateurs</div>
            </div>
          </div>
          <div className="admin-stat-card">
            <div className="admin-stat-icon">📋</div>
            <div className="admin-stat-content">
              <div className="admin-stat-number">{stats.offers}</div>
              <div className="admin-stat-label">Offres</div>
            </div>
          </div>
          <div className="admin-stat-card">
            <div className="admin-stat-icon">📮</div>
            <div className="admin-stat-content">
              <div className="admin-stat-number">{stats.applications}</div>
              <div className="admin-stat-label">Candidatures</div>
            </div>
          </div>
        </div>

        <div className="admin-section">
          <div className="admin-section-header">
            <h2>Gestion des utilisateurs</h2>
            <div className="filter-buttons">
              <button
                className={`filter-btn ${filter === "all" ? "active" : ""}`}
                onClick={() => setFilter("all")}
              >
                Tous
              </button>
              <button
                className={`filter-btn ${filter === "student" ? "active" : ""}`}
                onClick={() => setFilter("student")}
              >
                Étudiants
              </button>
              <button
                className={`filter-btn ${filter === "company" ? "active" : ""}`}
                onClick={() => setFilter("company")}
              >
                Entreprises
              </button>
            </div>
          </div>

          {loading ? (
            <p>Chargement...</p>
          ) : (
            <div className="users-table">
              <div className="table-header">
                <span>Nom</span>
                <span>Email</span>
                <span>Rôle</span>
                <span>Statut</span>
                <span>Actions</span>
              </div>
              {filteredUsers.map(u => (
                <div key={u.id} className="table-row">
                  <span className="row-name">{u.name}</span>
                  <span className="row-email">{u.email}</span>
                  <span className="row-role">
                    {u.role === "student" ? "Étudiant" : u.role === "company" ? "Entreprise" : "Admin"}
                  </span>
                  <span className={`status-badge status-${u.status || "active"}`}>
                    {u.status === "active" || !u.status ? "Actif" : "Inactif"}
                  </span>
                  <div className="row-actions">
                    <button
                      className="btn-status"
                      onClick={() => updateUserStatus(u.id, u.status === "active" ? "inactive" : "active")}
                    >
                      {u.status === "active" ? "Désactiver" : "Activer"}
                    </button>
                    <button
                      className="btn-delete"
                      onClick={() => deleteUser(u.id)}
                    >
                      Supprimer
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </main>
    </div>
  )
}