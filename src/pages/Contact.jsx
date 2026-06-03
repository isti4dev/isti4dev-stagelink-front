import { useState } from "react"
import { Link } from "react-router-dom"
import toast from "react-hot-toast"
import "./Contact.css"
import api from "../api/axios"

export default function Contact() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    message: "",
  })
  const [loading, setLoading] = useState(false)

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
  e.preventDefault()
  setLoading(true)
  try {
    await api.post("/contact", form)
    toast.success("Message envoyé avec succès !")
    setForm({ name: "", email: "", message: "" })
  } catch {
    toast.error("Erreur lors de l'envoi")
  } finally {
    setLoading(false)
  }
}

  

  return (
    <div className="contact-page">

      {/* NAVBAR */}
      <nav className="contact-navbar">
        <Link to="/" className="contact-navbar-logo">
           StageLink
        </Link>
        <div className="contact-navbar-links">
          <Link to="/">Accueil</Link>
          <Link to="/offers">Offres de stage</Link>
          <Link to="/about">À propos</Link>
          <Link to="/contact" className="active">Contact</Link>
        </div>
        <div className="contact-navbar-buttons">
          <Link to="/login" className="contact-btn-login">Se connecter</Link>
          <Link to="/register/student" className="contact-btn-register">S'inscrire</Link>
        </div>
      </nav>

      {/* HERO */}
      <div className="contact-hero">
        <h1>Contactez-nous</h1>
        <p>Une question ? Nous sommes là pour vous aider</p>
      </div>

      {/* CONTENU */}
      <div className="contact-content">

        {/* INFOS */}
        <div className="contact-info">
          <h2>Nos coordonnées</h2>

          <div className="contact-info-item">
            <div className="contact-info-icon">📍</div>
            <div className="contact-info-text">
              <h3>Adresse</h3>
              <p>Bd de l'Ouémé Jérico, Cotonou — Bénin</p>
            </div>
          </div>

          <div className="contact-info-item">
            <div className="contact-info-icon">📧</div>
            <div className="contact-info-text">
              <h3>Email</h3>
              <p>contact@stagelink.bj</p>
            </div>
          </div>

          <div className="contact-info-item">
            <div className="contact-info-icon">📞</div>
            <div className="contact-info-text">
              <h3>Téléphone</h3>
              <p>+229 21 32 47 73 / +229 21 32 78 71</p>
            </div>
          </div>

          <div className="contact-info-item">
            <div className="contact-info-icon">🕐</div>
            <div className="contact-info-text">
              <h3>Horaires</h3>
              <p>Lundi - Vendredi : 8h - 17h</p>
            </div>
          </div>
        </div>

        {/* FORMULAIRE */}
        <div className="contact-form-box">
          <h2>Envoyer un message</h2>
          <form onSubmit={handleSubmit}>

            <div className="contact-group">
              <label>Nom complet</label>
              <input
                type="text"
                name="name"
                value={form.name}
                onChange={handleChange}
                placeholder="Votre nom complet"
                required
              />
            </div>

            <div className="contact-group">
              <label>Email</label>
              <input
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                placeholder="Votre email"
                required
              />
            </div>

            <div className="contact-group">
              <label>Message</label>
              <textarea
                name="message"
                value={form.message}
                onChange={handleChange}
                rows={6}
                placeholder="Écrivez votre message ici..."
                required
              />
            </div>

            <button type="submit" className="btn-send" disabled={loading}>
              {loading ? "Envoi en cours..." : "Envoyer le message"}
            </button>

          </form>
        </div>

      </div>
    </div>
  )
}