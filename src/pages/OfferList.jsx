import { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import api from "../api/axios"
import { useAuth } from "../context/AuthContext"
import "./OfferList.css"

export default function OfferList() {
  const { user } = useAuth()
  const [offers, setOffers] = useState([])
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState("")
  const [domain, setDomain] = useState("")
  const [city, setCity] = useState("")
  const [type, setType] = useState("")

  useEffect(() => {
    api.get("/offers")
      .then(res => setOffers(res.data))
      .catch(console.error)
      .finally(() => setLoading(false))
  }, [])

  const filtered = offers.filter(o => {
    const matchSearch = o.title.toLowerCase().includes(search.toLowerCase()) ||
      o.company_name.toLowerCase().includes(search.toLowerCase())
    const matchDomain = !domain || o.sector === domain
    const matchCity = !city || o.city === city
    const matchType = !type || o.type === type
    return matchSearch && matchDomain && matchCity && matchType
  })

  const initial = user?.name?.charAt(0).toUpperCase() || "U"

  return (
    <div className="offers-page">

    
      <nav className="offers-navbar">
        <Link to="/" className="offers-navbar-logo">
          StageLink
        </Link>
       <div className="offers-navbar-links">
          <Link to="/">Accueil</Link>
          <Link to="/offers" className="active">Offres de stage</Link>
          <Link to="/about">À propos</Link>
          <Link to="/contact">Contact</Link>
        </div>
        <div className="offers-navbar-right">
          <button className="notif-btn">🔔</button>
          <div className="avatar">{initial}</div>
        </div>
      </nav>

      <div className="search-bar">
        <div className="search-input-wrap">
          <span className="search-icon">🔍</span>
          <input
            type="text"
            placeholder="Rechercher une offre, une entreprise..."
            value={search}
            onChange={e => setSearch(e.target.value)}
          />
        </div>
        <select
          className="search-select"
          value={domain}
          onChange={e => setDomain(e.target.value)}
        >
          <option value="">Domaine</option>
          <option value="Informatique">Informatique</option>
          <option value="Finance">Finance</option>
          <option value="Marketing">Marketing</option>
          <option value="Gestion">Gestion</option>
        </select>
        <select
          className="search-select"
          value={city}
          onChange={e => setCity(e.target.value)}
        >
          <option value="">Lieu</option>
          <option value="Cotonou">Cotonou</option>
          <option value="Porto-Novo">Porto-Novo</option>
          <option value="Abomey-Calavi">Abomey-Calavi</option>
        </select>
        <select
          className="search-select"
          value={type}
          onChange={e => setType(e.target.value)}
        >
          <option value="">Type de stage</option>
          <option value="Stage académique">Stage académique</option>
          <option value="Stage professionnel">Stage professionnel</option>
        </select>
        <button className="btn-search">Rechercher</button>
      </div>


      <div className="offers-content">

        <div className="filters-panel">
          <h3 className="filters-title">Filtres</h3>

          <div className="filter-section">
            <h4>Domaines</h4>
            {["Tous", "Informatique", "Gestion", "Marketing", "Comptabilité", "Autre"].map(d => (
              <div key={d} className="filter-option">
                <input type="checkbox" id={d} />
                <label htmlFor={d}>{d}</label>
              </div>
            ))}
          </div>

          <div className="filter-section">
            <h4>Lieu</h4>
            {["Tous", "Cotonou", "Abomey-Calavi", "Porto-Novo", "Autre"].map(l => (
              <div key={l} className="filter-option">
                <input type="checkbox" id={l} />
                <label htmlFor={l}>{l}</label>
              </div>
            ))}
          </div>

          <div className="filter-section">
            <h4>Type de stage</h4>
            {["Tous", "Stage académique", "Stage professionnel"].map(t => (
              <div key={t} className="filter-option">
                <input type="checkbox" id={t} />
                <label htmlFor={t}>{t}</label>
              </div>
            ))}
          </div>
        </div>


        <div className="offers-list">
          {loading ? (
            <div className="loading">Chargement des offres...</div>
          ) : (
            <>
              <p className="offers-count">{filtered.length} offre(s) trouvée(s)</p>
              {filtered.map(offer => (
                <Link to={`/offers/${offer.id}`} key={offer.id} className="offer-card">
                  <div className="offer-logo">🏢</div>
                  <div className="offer-info">
                    <div className="offer-header">
                      <span className="offer-title">{offer.title}</span>
                      <span className="offer-date">Il y a 2 jours</span>
                    </div>
             <div className="offer-company">
                      {offer.company_name}
                      <span className="verified">✔</span>
                    </div>
                    <div className="offer-location">📍 {offer.city}</div>
                    <span className="offer-badge">
                      {offer.type || "Stage académique"}
                    </span>
                    <p className="offer-desc">{offer.description}</p>
                  </div>
                  <button className="offer-bookmark">🔖</button>
                </Link>
              ))}
            </>
          )}
        </div>

      </div>
    </div>
  )
}