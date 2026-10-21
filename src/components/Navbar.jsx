import React, { useState, useEffect } from 'react';
import { FileText, Menu, X, ArrowUpRight } from 'lucide-react';
import { personalInfo } from '../data/portfolioData';
import ThemeSwitcher from './ThemeSwitcher';
import { useTheme } from '../context/ThemeContext';

const navItems = [
  { label: 'About', href: '#about' },
  { label: 'Projects', href: '#projects' },
  { label: 'Skills', href: '#skills' },
  { label: 'Timeline', href: '#timeline' },
  { label: 'Beyond', href: '#beyond' },
  { label: 'Contact', href: '#contact' },
];

export default function Navbar({ onOpenResume }) {
  const { currentThemeConfig } = useTheme();
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('about');
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const winScroll = window.scrollY;
      const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
      const scrolledRatio = height > 0 ? (winScroll / height) * 100 : 0;
      setScrollProgress(scrolledRatio);
      setScrolled(winScroll > 20);

      const sections = navItems.map(item => item.href.substring(1));
      const scrollPosition = winScroll + 140;

      for (let i = sections.length - 1; i >= 0; i--) {
        const section = document.getElementById(sections[i]);
        if (section && section.offsetTop <= scrollPosition) {
          setActiveSection(sections[i]);
          break;
        }
      }
    };

    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && mobileMenuOpen) {
        setMobileMenuOpen(false);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('keydown', handleKeyDown);
    handleScroll();
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [mobileMenuOpen]);

  const handleNavClick = (e, href) => {
    e.preventDefault();
    setMobileMenuOpen(false);
    const target = document.querySelector(href);
    if (target) {
      const topOffset = 80;
      const elementPosition = target.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - topOffset;
      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  return (
    <>
      {/* Skip to Main Content Link for Keyboard Accessibility */}
      <a href="#main-content" className="skip-link">
        Skip to main content
      </a>

      <nav className={`navbar ${scrolled ? 'scrolled' : ''}`} aria-label="Main Navigation">
        <div className="container nav-container">
          <a 
            href="#" 
            className="nav-logo"
            onClick={(e) => {
              e.preventDefault();
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
          >
            <div className="nav-logo-mark">RP</div>
            <div className="nav-logo-text">
              <span className="nav-logo-title">{personalInfo.name}</span>
              <span className="nav-logo-sub">{currentThemeConfig.name.toUpperCase()}</span>
            </div>
          </a>

          {/* Desktop Nav Links with Clear Active State */}
          <ul className="nav-links">
            {navItems.map((item) => {
              const isActive = activeSection === item.href.substring(1);
              return (
                <li key={item.label}>
                  <a
                    href={item.href}
                    className={`nav-link ${isActive ? 'active' : ''}`}
                    onClick={(e) => handleNavClick(e, item.href)}
                  >
                    {isActive && <span className="nav-active-dot" />}
                    <span>{item.label}</span>
                  </a>
                </li>
              );
            })}
          </ul>

          <div className="nav-actions">
            {/* Desktop Compact Theme Switcher */}
            <ThemeSwitcher mode="dropdown" />

            <button
              type="button"
              className="btn btn-secondary btn-sm nav-btn-resume"
              onClick={onOpenResume}
              aria-label="View Resume"
            >
              <FileText size={15} />
              <span>Resume</span>
            </button>

            <a
              href="#contact"
              className="btn btn-primary btn-sm"
              onClick={(e) => handleNavClick(e, '#contact')}
            >
              <span>Get in Touch</span>
            </a>

            <button
              type="button"
              className="mobile-toggle"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-expanded={mobileMenuOpen}
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>

        {/* Slim Scroll Progress Indicator */}
        <div 
          className="nav-scroll-progress" 
          style={{ width: `${scrollProgress}%` }} 
          aria-hidden="true" 
        />
      </nav>

      {/* Mobile Drawer Overlay */}
      {mobileMenuOpen && (
        <div 
          className="mobile-backdrop-overlay" 
          onClick={() => setMobileMenuOpen(false)} 
          aria-hidden="true" 
        />
      )}

      {/* Mobile Drawer */}
      <div 
        className={`mobile-drawer ${mobileMenuOpen ? 'open' : ''}`} 
        role="dialog" 
        aria-modal="true"
        aria-label="Mobile Navigation Menu"
        aria-hidden={!mobileMenuOpen}
      >
        <ul className="mobile-nav-links">
          {navItems.map((item) => (
            <li key={item.label}>
              <a
                href={item.href}
                className={`mobile-nav-link ${activeSection === item.href.substring(1) ? 'active' : ''}`}
                onClick={(e) => handleNavClick(e, item.href)}
              >
                <span>{item.label}</span>
                <ArrowUpRight size={18} />
              </a>
            </li>
          ))}
        </ul>

        <div className="mobile-drawer-footer">
          <div className="mobile-drawer-theme-box">
            <div className="mobile-drawer-theme-label">
              <span>Theme Mode</span>
              <span className="mobile-drawer-theme-current">{currentThemeConfig.name}</span>
            </div>
            <ThemeSwitcher mode="segmented" />
          </div>

          <button
            type="button"
            className="btn btn-secondary"
            style={{ width: '100%' }}
            onClick={() => {
              setMobileMenuOpen(false);
              onOpenResume();
            }}
          >
            <FileText size={18} />
            <span>View Full Resume</span>
          </button>

          <a
            href={personalInfo.links.emailMailto}
            className="btn btn-primary"
            style={{ width: '100%' }}
          >
            <span>Email Rohan</span>
          </a>
        </div>
      </div>
    </>
  );
}
