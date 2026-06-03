import { Link } from "react-router-dom"
import "./About.css"

export default function About() {
  return (
    <div className="about-page">

      {/* NAVBAR */}
      <nav className="about-navbar">
        <Link to="/" className="about-navbar-logo">
         StageLink
        </Link>
        <div className="about-navbar-links">
          <Link to="/">Accueil</Link>
          <Link to="/offers">Offres de stage</Link>
          <Link to="/about" className="active">À propos</Link>
          <Link to="/contact">Contact</Link>
        </div>
        <div className="about-navbar-buttons">
          <Link to="/login" className="about-btn-login">Se connecter</Link>
          <Link to="/register/student" className="about-btn-register">S'inscrire</Link>
        </div>
      </nav>

      {/* HERO */}
      <div className="about-hero">
        <h1>À propos de StageLink</h1>
        <p>
          StageLink est la plateforme de référence au Bénin qui connecte
          les étudiants avec les meilleures entreprises pour des stages
          de qualité.
        </p>
      </div>

      {/* CONTENU */}
      <div className="about-content">

        {/* MISSION */}
        <div className="about-section">
          <h2>Notre mission</h2>
          <p>
            StageLink a été créé pour faciliter la recherche de stage au Bénin.
            Nous mettons en relation les étudiants qui cherchent une expérience
            professionnelle avec les entreprises qui ont besoin de talents.
            Notre objectif est de simplifier le processus de candidature et de
            rendre le marché des stages plus accessible à tous.
          </p>
        </div>

        {/* ÉQUIPE */}
        <div className="about-section">
          <h2>Notre équipe</h2>
          <div className="about-team">
            <div className="team-card">
              <div className="team-avatar">H</div>
              <div className="team-name">ADJINAKOU Hermann</div>
              <div className="team-role">Développeur Backend</div>
              <div className="team-desc">
                Responsable de l'API Laravel, de la base de données
                et de la sécurité de la plateforme.
              </div>
            </div>
            <div className="team-card">
              <div className="team-avatar">I</div>
              <div className="team-name">DISSOU Istianath</div>
              <div className="team-role">Développeur Frontend</div>
              <div className="team-desc">
                Responsable de l'interface utilisateur, des pages
                et de l'expérience utilisateur de la plateforme.
              </div>
            </div>
          </div>
        </div>

        {/* VALEURS */}
        <div className="about-section">
          <h2>Nos valeurs</h2>
          <div className="about-values">
            <div className="value-card">
              <div className="value-icon">🎯</div>
              <div className="value-title">Simplicité</div>
              <div className="value-desc">
                Une interface simple et intuitive pour tous les utilisateurs.
              </div>
            </div>
            <div className="value-card">
              <div className="value-icon">🤝</div>
              <div className="value-title">Connexion</div>
              <div className="value-desc">
                Relier les étudiants aux entreprises de manière efficace.
              </div>
            </div>
            <div className="value-card">
              <div className="value-icon">🚀</div>
              <div className="value-title">Innovation</div>
              <div className="value-desc">
                Une plateforme moderne adaptée aux besoins du Bénin.
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  )
}