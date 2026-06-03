import { useState, useEffect } from "react"
import api from "../api/axios"
import toast from "react-hot-toast"
import "./AdminDashboard.css"

export default function AdminDashboard() {
  const [stats, setStats] = useState(null)
  const [companies, setCompanies] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    Promise.all([
      api.get("/admin/stats"),
      api.get("/admin/companies"),
    ])
      .then(([statsRes, companiesRes]) => {
        setStats(statsRes.data)
        setCompanies(companiesRes.data)
      })
      .catch(console.error)
      .finally(() => setLoading(false))
  }, [])

  const validateCompany = async (id) => {
    try {
      await api.put(`/admin/companies/${id}/validate`)
      setCompanies(prev =>
        prev.map(c => c.id === id ? { ...c, validated: true } : c)
      )
      toast.success("Entreprise validée")
    } catch {
      toast.error("Erreur lors de la validation")
    }
  }

  if (loading) return (
    <div style={{ textAlign: "center", padding: "80px", color: "rgb(107, 114, 128)" }}>
      Chargement...
    </div>
  )

  return (
    <div className="admin-page">

      <h1 className="admin-title">Administration StageLink</h1>

      {/* STATS */}
      {stats && (
        <div className="admin-stats">
          {[
            { number: stats.students, label: "Étudiants" },
            { number: stats.companies, label: "Entreprises" },
            { number: stats.offers, label: "Offres actives" },
            { number: stats.applications, label: "Candidatures" },
          ].map((s, i) => (
            <div key={i} className="admin-stat-card">
              <div className="admin-stat-number">{s.number}</div>
              <div className="admin-stat-label">{s.label}</div>
            </div>
          ))}
        </div>
      )}

      {/* ENTREPRISES */}
      <h2 className="admin-section-title">
        Entreprises en attente de validation
      </h2>
      <div className="admin-table">
        <div className="admin-table-header">
          <span>Entreprise</span>
          <span>Email</span>
          <span>Ville</span>
          <span>Action</span>
        </div>
        {companies.length === 0 ? (
          <div style={{ padding: "24px", textAlign: "center", color: "rgb(107, 114, 128)" }}>
            Toutes les entreprises sont validées ✓
          </div>
        ) : companies.map(company => (
          <div key={company.id} className="admin-table-row">
            <span className="admin-row-name">{company.company_name}</span>
            <span className="admin-row-email">{company.email}</span>
            <span className="admin-row-city">{company.city}</span>
            {company.validated ? (
              <span className="validated-badge">Validée ✓</span>
            ) : (
              <button
                className="btn-validate"
                onClick={() => validateCompany(company.id)}
              >
                Valider
              </button>
            )}
          </div>
        ))}
      </div>

    </div>
  )
}