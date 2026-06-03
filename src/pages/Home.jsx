import { Link } from "react-router-dom"
import "./Home.css"
import etudiant from "../image/etudiant.png"
export default function Home() {
  return (
    <div>
      <nav className="navbar">
        <Link to="/" className="navbar-logo">
     StageLink
        </Link>
        <div className="navbar-links">
          <Link to="/"> Accueil</Link>
          <Link to="/offers">Offres de stage</Link>
          <Link to="/about">À propos</Link>
          <Link to="/contact">Contact</Link>
        </div>
        <div className="navbar-buttons">
          <Link to="/login" className="btn-login">Se connecter</Link>
          <Link to="/register/student" className="btn-register">S'inscrire</Link>
        </div>
      </nav>

    
      <div className="hero">
        <div className="hero-left">
          <h1 className="hero-title">
            Trouvez votre stage.<br />
            Sans se déplacer.<br />
            <span className="blue">Sans attendre.</span>
          </h1>
       <p className="hero-desc">
            StageLink est une plateforme de référence au Bénin qui met en relation
            les étudiants et les entreprises pour des stages de qualité.
          </p>
          <div className="hero-buttons">
            <Link to="/offers" className="btn-hero-primary">
              Voir les offres de stage
        </Link>
            <Link to="/register/student" className="btn-hero-secondary">
              Je suis une entreprise
            </Link>
          </div>
        </div>

        <div className="hero-right">
   <img src={etudiant} alt="étudiant" className="hero-img" />
        </div>
      </div>

    
      <div className="features">
        <div className="features-grid">
          <div className="feature-item">
            <div className="feature-icon">📋</div>
            <div>
              <h3>Des milliers d'offres</h3>
              <p>Accédez à de nombreuses offres de stage partout au Bénin.</p>
            </div>
          </div>
          <div className="feature-item">
            <div className="feature-icon">⚡</div>
            <div>
              <h3>Candidature simplifiée</h3>
              <p>Postulez en ligne en quelques clics et suivez vos candidatures.</p>
            </div>
          </div>
          <div className="feature-item">
            <div className="feature-icon">📊</div>
            <div>
              <h3>Suivi en temps réel</h3>
              <p>Suivez l'état de vos candidatures en temps réel.</p>
            </div>
          </div>
        </div>
      </div>

    </div>
  )
}