import React, { useState, useEffect, useRef } from 'react';
import { ChevronRight } from 'lucide-react';
import './CinematicIntro.css';

export default function CinematicIntro({ onStartExit, onComplete }) {
  const [isExiting, setIsExiting] = useState(false);
  const exitTriggeredRef = useRef(false);

  const handleSkipOrComplete = () => {
    if (exitTriggeredRef.current) return;
    exitTriggeredRef.current = true;
    setIsExiting(true);
    onStartExit?.();

    // Allow 550ms for the upward float + fade-out before removing overlay
    setTimeout(() => {
      onComplete?.();
    }, 550);
  };

  useEffect(() => {
    // Lock body scrolling while intro is active
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    // Automatic transition after ~2.3 seconds (or hold if ?pause=true for testing)
    const isPaused = new URLSearchParams(window.location.search).get('pause') === 'true';
    let timer;
    if (!isPaused) {
      timer = setTimeout(() => {
        handleSkipOrComplete();
      }, 2350);
    }

    // Escape key instantly skips intro
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        handleSkipOrComplete();
      }
    };
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      clearTimeout(timer);
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = originalOverflow;
    };
  }, []);

  return (
    <div 
      className={`cinematic-intro-overlay ${isExiting ? 'intro-exiting' : ''}`}
      role="dialog"
      aria-modal="true"
      aria-label="Introduction Screen"
    >
      {/* Background Atmosphere & Dual Glows (Cyan & Amber) */}
      <div className="intro-atmosphere" aria-hidden="true">
        <div className="intro-glow-blue" />
        <div className="intro-glow-amber" />
        <div className="intro-grid" />

        {/* Ambient Orbital SVG Vector */}
        <svg className="intro-orbit-svg" viewBox="0 0 800 800" xmlns="http://www.w3.org/2000/svg">
          <ellipse 
            cx="400" 
            cy="400" 
            rx="360" 
            ry="240" 
            fill="none" 
            stroke="rgba(0, 195, 255, 0.16)" 
            strokeWidth="1.2" 
            transform="rotate(-15 400 400)" 
            className="intro-orbit-ring"
          />
          <ellipse 
            cx="400" 
            cy="400" 
            rx="340" 
            ry="220" 
            fill="none" 
            stroke="rgba(255, 170, 50, 0.14)" 
            strokeWidth="1.2" 
            transform="rotate(25 400 400)" 
            className="intro-orbit-ring"
            style={{ animationDirection: 'reverse', animationDuration: '45s' }}
          />
        </svg>

        {/* Subtle Programming Glyphs */}
        <span className="intro-floating-symbol intro-symbol-1">&lt;/&gt;</span>
        <span className="intro-floating-symbol intro-symbol-2">&#123; &#125;</span>
        <span className="intro-floating-symbol intro-symbol-3">//</span>
        <span className="intro-floating-symbol intro-symbol-4">const</span>
      </div>

      {/* Accessible Skip Button */}
      <button
        type="button"
        className="intro-skip-btn"
        onClick={handleSkipOrComplete}
        aria-label="Skip introduction"
      >
        <span>Skip intro</span>
        <ChevronRight size={13} aria-hidden="true" />
      </button>

      {/* Main Content: Split Portrait & Identity */}
      <div className="intro-content-container">
        {/* Left: Portrait Frame with Dual Rim-Light Accents */}
        <div className="intro-portrait-column">
          <div className="intro-portrait-frame">
            <span className="intro-portrait-rim-blue" aria-hidden="true" />
            <span className="intro-portrait-rim-amber" aria-hidden="true" />
            <img 
              src="/images/rohan-portrait.png" 
              alt="Rohan Patil"
              className="intro-portrait-img"
              loading="eager"
            />
          </div>
        </div>

        {/* Right: Identity & Tagline */}
        <div className="intro-text-column">
          <div className="intro-eyebrow-badge">
            <span className="intro-status-beacon" aria-hidden="true" />
            <span>MIDNIGHT STUDIO // 2028</span>
          </div>

          <div className="intro-greeting">
            HELLO, WORLD — I'M
          </div>

          <h1 className="intro-name-title">
            <span>ROHAN</span>
            <span className="intro-name-highlight">PATIL</span>
          </h1>

          <p className="intro-tagline">
            Building useful things at the intersection of software, AI, and security.
          </p>

          <div className="intro-pills-row" aria-label="Core Competencies">
            <span className="intro-pill intro-pill-cyan">Full-Stack</span>
            <span className="intro-pill intro-pill-amber">Applied AI</span>
            <span className="intro-pill">Cybersecurity Minor</span>
            <span className="intro-pill">VJTI Mumbai</span>
          </div>

          {/* Thin Restrained Progress Indicator */}
          <div className="intro-progress-bar-wrap" aria-hidden="true">
            <div className="intro-progress-line" />
          </div>
        </div>
      </div>
    </div>
  );
}
