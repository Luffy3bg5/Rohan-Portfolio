import React, { useState } from 'react';
import { 
  ArrowDown, 
  FileText, 
  Mail, 
  Phone, 
  Check, 
  Copy,
  ExternalLink,
  Layers,
  Terminal,
  Activity
} from 'lucide-react';
import { Github, Linkedin } from './Icons';
import { personalInfo, stats } from '../data/portfolioData';
import { useTheme } from '../context/ThemeContext';

export default function Hero({ onOpenResume }) {
  const { currentThemeConfig } = useTheme();
  const [copiedEmail, setCopiedEmail] = useState(false);
  const [copiedPhone, setCopiedPhone] = useState(false);
  const [activeTelemetryTab, setActiveTelemetryTab] = useState('pipeline');

  const copyToClipboard = (text, type) => {
    navigator.clipboard.writeText(text);
    if (type === 'email') {
      setCopiedEmail(true);
      setTimeout(() => setCopiedEmail(false), 2000);
    } else {
      setCopiedPhone(true);
      setTimeout(() => setCopiedPhone(false), 2000);
    }
  };

  const handleScrollToProjects = (e) => {
    e.preventDefault();
    const target = document.getElementById('projects');
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
    <section className="hero-section" id="hero">
      <div className="container">
        <div className="hero-grid">
          {/* Left Column: Oversized Editorial Typography & Narrative */}
          <div className="hero-left-col">
            <div className="hero-eyebrow">
              <span className="status-dot"></span>
              <span className="eyebrow-text">VJTI '28 • FULL-STACK, PRACTICAL AI & SECURITY</span>
            </div>

            <h1 className="hero-title">
              Building useful things at the intersection of{' '}
              <span className="accent-text">software</span>,{' '}
              <span className="accent-text">AI</span>, and{' '}
              <span className="accent-text">security</span>.
            </h1>

            <p className="hero-description">
              I'm <strong style={{ color: '#FFFFFF' }}>{personalInfo.name}</strong>, an undergraduate at{' '}
              <span style={{ color: '#FFFFFF', fontWeight: 600 }}>{personalInfo.college}</span> pursuing a B.Tech in Computer Engineering with a Minor in Cybersecurity. 
              I design dependable full-stack applications, automate multi-modal workflows with practical AI, and apply cryptographic rigor to modern systems.
            </p>

            {/* Action Buttons */}
            <div className="hero-actions">
              <a 
                href="#projects" 
                className="btn btn-primary"
                onClick={handleScrollToProjects}
              >
                <span>View Projects</span>
                <ArrowDown size={17} />
              </a>

              <button 
                type="button" 
                className="btn btn-secondary"
                onClick={onOpenResume}
              >
                <FileText size={17} />
                <span>Download Resume</span>
              </button>
            </div>

            {/* Connect Strip with 1-Click Clipboard Copies */}
            <div className="hero-social-strip">
              <a 
                href={personalInfo.links.github} 
                target="_blank" 
                rel="noopener noreferrer" 
                className="social-link"
                aria-label="GitHub Profile"
              >
                <Github size={17} />
                <span>GitHub</span>
                <ExternalLink size={12} style={{ opacity: 0.6 }} />
              </a>

              <a 
                href={personalInfo.links.linkedin} 
                target="_blank" 
                rel="noopener noreferrer" 
                className="social-link"
                aria-label="LinkedIn Profile"
              >
                <Linkedin size={17} />
                <span>LinkedIn</span>
                {personalInfo.links.linkedinIsPlaceholder && (
                  <span className="social-link-tag">Editable</span>
                )}
                <ExternalLink size={12} style={{ opacity: 0.6 }} />
              </a>

              <div className="clipboard-chip">
                <a 
                  href={personalInfo.links.emailMailto} 
                  className="social-link"
                  aria-label="Send Email"
                >
                  <Mail size={16} />
                  <span>{personalInfo.email}</span>
                </a>
                <button 
                  type="button"
                  onClick={() => copyToClipboard(personalInfo.email, 'email')}
                  title="Copy Email"
                  className="copy-mini-btn"
                  aria-label="Copy email address"
                >
                  {copiedEmail ? <Check size={12} color="#B8F36B" /> : <Copy size={12} />}
                  <span>{copiedEmail ? 'Copied' : 'Copy'}</span>
                </button>
              </div>

              <div className="clipboard-chip">
                <a 
                  href={personalInfo.links.phoneTel} 
                  className="social-link"
                  aria-label="Call Phone"
                >
                  <Phone size={16} />
                  <span>{personalInfo.phone}</span>
                </a>
                <button 
                  type="button"
                  onClick={() => copyToClipboard(personalInfo.phone, 'phone')}
                  title="Copy Phone Number"
                  className="copy-mini-btn"
                  aria-label="Copy phone number"
                >
                  {copiedPhone ? <Check size={12} color="#B8F36B" /> : <Copy size={12} />}
                  <span>{copiedPhone ? 'Copied' : 'Copy'}</span>
                </button>
              </div>
            </div>
          </div>

          {/* Right Column: Subtle Animated Technical Studio Visual */}
          <div className="hero-right-col">
            <div className="studio-console-panel">
              {/* Console Header Bar */}
              <div className="console-header-bar">
                <div className="console-status-indicator">
                  <span className="pulse-beacon" />
                  <span className="console-title">SYSTEM INSPECTOR // {currentThemeConfig.shortName.toUpperCase()}</span>
                </div>
                <div className="console-telemetry-tag">
                  VJTI-NODE :: ACTIVE
                </div>
              </div>

              {/* Animated Geometric Vector Canvas */}
              <div className="console-visual-viewport">
                <svg 
                  className="geometric-orbit-svg" 
                  viewBox="0 0 400 240" 
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <defs>
                    <linearGradient id="limeGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="var(--accent-lime)" stopOpacity="0.8" />
                      <stop offset="100%" stopColor="var(--accent-lime-muted)" stopOpacity="0.2" />
                    </linearGradient>
                    <radialGradient id="centerGlow" cx="50%" cy="50%" r="50%">
                      <stop offset="0%" stopColor="var(--accent-lime)" stopOpacity="0.25" />
                      <stop offset="100%" stopColor="var(--accent-lime)" stopOpacity="0" />
                    </radialGradient>
                  </defs>

                  {/* Studio Grid Lines */}
                  <g stroke="var(--border-subtle)" strokeWidth="0.75" strokeDasharray="3 3">
                    <line x1="40" y1="0" x2="40" y2="240" />
                    <line x1="120" y1="0" x2="120" y2="240" />
                    <line x1="200" y1="0" x2="200" y2="240" />
                    <line x1="280" y1="0" x2="280" y2="240" />
                    <line x1="360" y1="0" x2="360" y2="240" />
                    <line x1="0" y1="60" x2="400" y2="60" />
                    <line x1="0" y1="120" x2="400" y2="120" />
                    <line x1="0" y1="180" x2="400" y2="180" />
                  </g>

                  {/* Central Node Glow */}
                  <circle cx="200" cy="120" r="50" fill="url(#centerGlow)" />

                  {/* Concentric Technical Rings with Restrained Dash */}
                  <circle 
                    cx="200" 
                    cy="120" 
                    r="82" 
                    fill="none" 
                    stroke="var(--border-medium)" 
                    strokeWidth="1" 
                    strokeDasharray="4 6" 
                    className="orbit-ring-outer"
                  />
                  <circle 
                    cx="200" 
                    cy="120" 
                    r="52" 
                    fill="none" 
                    stroke="var(--accent-lime-border)" 
                    strokeWidth="1.2" 
                    strokeDasharray="6 8" 
                    className="orbit-ring-inner"
                  />

                  {/* Tripartite System Vectors: Software, AI, Security */}
                  <g stroke="var(--accent-lime)" strokeWidth="1.2" strokeOpacity="0.6">
                    <line x1="200" y1="120" x2="125" y2="65" />
                    <line x1="200" y1="120" x2="275" y2="65" />
                    <line x1="200" y1="120" x2="200" y2="190" />
                  </g>

                  {/* Intersecting Orbit Nodes */}
                  {/* Top-Left: Software */}
                  <circle cx="125" cy="65" r="5" fill="var(--bg-surface-elevated)" stroke="var(--accent-lime)" strokeWidth="2" />
                  <text x="75" y="55" fill="var(--text-primary)" fontSize="10" fontFamily="var(--font-mono)" letterSpacing="1">
                    01 // SOFTWARE
                  </text>

                  {/* Top-Right: AI */}
                  <circle cx="275" cy="65" r="5" fill="var(--bg-surface-elevated)" stroke="var(--accent-lime)" strokeWidth="2" />
                  <text x="250" y="55" fill="var(--text-primary)" fontSize="10" fontFamily="var(--font-mono)" letterSpacing="1">
                    02 // APPLIED AI
                  </text>

                  {/* Bottom: Security */}
                  <circle cx="200" cy="190" r="5" fill="var(--bg-surface-elevated)" stroke="var(--accent-lime)" strokeWidth="2" />
                  <text x="165" y="212" fill="var(--text-primary)" fontSize="10" fontFamily="var(--font-mono)" letterSpacing="1">
                    03 // SECURITY
                  </text>

                  {/* Central Core RP Node */}
                  <circle cx="200" cy="120" r="10" fill="var(--accent-lime)" />
                  <circle cx="200" cy="120" r="16" fill="none" stroke="var(--accent-lime)" strokeWidth="1" strokeOpacity="0.4" />
                </svg>
              </div>

              {/* Interactive Telemetry Tabs */}
              <div className="console-tab-selector">
                <button
                  type="button"
                  className={`console-tab-btn ${activeTelemetryTab === 'pipeline' ? 'active' : ''}`}
                  onClick={() => setActiveTelemetryTab('pipeline')}
                >
                  <Activity size={13} />
                  <span>Pipeline</span>
                </button>

                <button
                  type="button"
                  className={`console-tab-btn ${activeTelemetryTab === 'stack' ? 'active' : ''}`}
                  onClick={() => setActiveTelemetryTab('stack')}
                >
                  <Layers size={13} />
                  <span>Stack</span>
                </button>

                <button
                  type="button"
                  className={`console-tab-btn ${activeTelemetryTab === 'academics' ? 'active' : ''}`}
                  onClick={() => setActiveTelemetryTab('academics')}
                >
                  <Terminal size={13} />
                  <span>Credentials</span>
                </button>
              </div>

              {/* Dynamic Telemetry Display View */}
              <div className="console-content-box">
                {activeTelemetryTab === 'pipeline' && (
                  <div className="telemetry-stream">
                    <div className="stream-line">
                      <span className="stream-key">CONTENT-FORGE:</span>
                      <span className="stream-val">Gemini 1.5 + ComfyUI/SD worker [OK]</span>
                    </div>
                    <div className="stream-line">
                      <span className="stream-key">EDUKEEDA API:</span>
                      <span className="stream-val">Express Router + JWT Protected Routes [OK]</span>
                    </div>
                    <div className="stream-line">
                      <span className="stream-key">CYBER MINOR:</span>
                      <span className="stream-val">Modern Cryptography Primitives [ACTIVE]</span>
                    </div>
                  </div>
                )}

                {activeTelemetryTab === 'stack' && (
                  <div className="telemetry-stream">
                    <div className="stream-line">
                      <span className="stream-key">LANGUAGES:</span>
                      <span className="stream-val">C++, Python, JavaScript (ES6+), HTML5/CSS3</span>
                    </div>
                    <div className="stream-line">
                      <span className="stream-key">SERVICES:</span>
                      <span className="stream-val">Node.js, Express.js, MongoDB, MySQL, Postman</span>
                    </div>
                    <div className="stream-line">
                      <span className="stream-key">DEV TOOLS:</span>
                      <span className="stream-val">Git, GitHub, VS Code, JWT Auth Middleware</span>
                    </div>
                  </div>
                )}

                {activeTelemetryTab === 'academics' && (
                  <div className="telemetry-stream">
                    <div className="stream-line">
                      <span className="stream-key">INSTITUTION:</span>
                      <span className="stream-val">VJTI Mumbai (B.Tech Computer Engineering)</span>
                    </div>
                    <div className="stream-line">
                      <span className="stream-key">MHT-CET:</span>
                      <span className="stream-val">99.81%ile (State Rank 437)</span>
                    </div>
                    <div className="stream-line">
                      <span className="stream-key">ACADEMIC TRACK:</span>
                      <span className="stream-val">Minor in Cybersecurity • Graduation: 2028</span>
                    </div>
                  </div>
                )}
              </div>

              {/* Footer Coordinate Stamp */}
              <div className="console-footer-stamp">
                <span>MATUNGA, MUMBAI • 19.0222° N, 72.8561° E</span>
                <span className="badge badge-lime" style={{ fontSize: '0.68rem', padding: '2px 6px' }}>
                  VERIFIED
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Spec Cards Grid */}
        <div className="hero-specs-grid">
          {stats.map((item, index) => (
            <div className="spec-card" key={index}>
              <div className="spec-label">{item.label}</div>
              <div className="spec-value">{item.value}</div>
              <div className="spec-detail">{item.detail}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
