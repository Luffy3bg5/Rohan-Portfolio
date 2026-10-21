import React from 'react';
import { ArrowUp } from 'lucide-react';
import { personalInfo } from '../data/portfolioData';

export default function Footer({ onOpenResume }) {
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-top-grid">
          <div>
            <div className="nav-logo" style={{ marginBottom: '12px' }}>
              <div className="nav-logo-mark">RP</div>
              <div className="nav-logo-text">
                <span className="nav-logo-title">{personalInfo.name}</span>
                <span className="nav-logo-sub">MIDNIGHT STUDIO</span>
              </div>
            </div>
            <p className="footer-brand-desc">
              Computer Engineering student at Veermata Jijabai Technological Institute (VJTI), Mumbai with a Minor in Cybersecurity. Building practical full-stack applications, intelligent AI pipelines, and secure software systems.
            </p>
          </div>

          <div className="footer-links-grid">
            <div>
              <div className="footer-nav-col-title">Navigation</div>
              <ul className="footer-nav-list">
                <li><a href="#about" className="footer-nav-link">About</a></li>
                <li><a href="#projects" className="footer-nav-link">Featured Projects</a></li>
                <li><a href="#skills" className="footer-nav-link">Technical Skills</a></li>
                <li><a href="#leadership" className="footer-nav-link">Leadership</a></li>
                <li><a href="#education" className="footer-nav-link">Education</a></li>
                <li><a href="#beyond" className="footer-nav-link">Beyond Coding</a></li>
                <li><a href="#contact" className="footer-nav-link">Contact</a></li>
              </ul>
            </div>

            <div>
              <div className="footer-nav-col-title">Connect & Source</div>
              <ul className="footer-nav-list">
                <li>
                  <a href={personalInfo.links.github} target="_blank" rel="noopener noreferrer" className="footer-nav-link">
                    GitHub
                  </a>
                </li>
                <li>
                  <a href={personalInfo.links.linkedin} target="_blank" rel="noopener noreferrer" className="footer-nav-link">
                    LinkedIn
                  </a>
                </li>
                <li>
                  <a href={personalInfo.links.emailMailto} className="footer-nav-link">
                    {personalInfo.email}
                  </a>
                </li>
                <li>
                  <a href={personalInfo.links.phoneTel} className="footer-nav-link">
                    {personalInfo.phone}
                  </a>
                </li>
                <li>
                  <button 
                    type="button" 
                    onClick={onOpenResume} 
                    className="footer-nav-link" 
                    style={{ background: 'none', border: 'none', padding: 0, cursor: 'pointer', textAlign: 'left' }}
                  >
                    View Resume (PDF/Print)
                  </button>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div className="footer-bottom">
          <div>
            © 2026 Rohan Patil. Designed &amp; Built in the Midnight Studio identity.
          </div>

          <button
            type="button"
            className="back-to-top-btn"
            onClick={scrollToTop}
            aria-label="Scroll back to top"
          >
            <span>Back to top</span>
            <ArrowUp size={14} />
          </button>
        </div>
      </div>
    </footer>
  );
}
