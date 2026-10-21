import React, { useEffect, useState } from 'react';
import { X, Printer, Copy, Check, Download } from 'lucide-react';
import { 
  personalInfo, 
  projects, 
  courseworkList
} from '../data/portfolioData';

export default function ResumeModal({ onClose }) {
  const [copied, setCopied] = useState(false);
  const [downloading, setDownloading] = useState(false);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
    };
    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      document.body.style.overflow = 'unset';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [onClose]);

  const handlePrint = () => {
    window.print();
  };

  const resumePlainText = `
ROHAN PATIL
Computer Engineering Student | Full-Stack Developer | AI Enthusiast
Veermata Jijabai Technological Institute (VJTI), Mumbai
B.Tech in Computer Engineering with Minor in Cybersecurity (2024 - 2028)
Email: ${personalInfo.email} | Phone: ${personalInfo.phone}
GitHub: ${personalInfo.links.github} | LinkedIn: ${personalInfo.links.linkedin}

--------------------------------------------------
ACADEMIC HIGHLIGHTS & EDUCATION
- Veermata Jijabai Technological Institute (VJTI), Mumbai (2024 - 2028)
  B.Tech in Computer Engineering with Minor in Cybersecurity
- Shraddha College (2024)
- MHT-CET: 99.81 Percentile (Rank 437)

COURSEWORK:
Data Structures, Database Management, Operating Systems, Theory of Computation, Algorithm Analysis, Artificial Intelligence, Modern Cryptography.

--------------------------------------------------
TECHNICAL SKILLS
- Languages: C++, Python, JavaScript, HTML, CSS
- Development & DB: Node.js, Express.js, MongoDB, MySQL
- Tools: Git, GitHub, VS Code, Postman, JWT
- Areas of Interest: Minor in Cybersecurity, Modern Cryptography, Practical Gemini AI Integration, Local ComfyUI + Stable Diffusion

--------------------------------------------------
FEATURED PROJECTS
1. Content-Forge
Full-stack application for creating, managing, and scheduling Instagram content.
- Integrated Gemini AI for automated script and caption synthesis.
- Interfaced with local ComfyUI and Stable Diffusion for image generation.
- Integrated YouTube API for topic inspiration and asset sourcing.
- Built Node.js/Express REST backend with JWT authentication and MongoDB scheduling queue.

2. Edukeeda
Student opportunities platform covering hackathons, scholarships, internships, and cultural events.
- Architected REST API backend using Node.js, Express.js, and MongoDB.
- Implemented JWT authentication and protected route middleware for secure access.
- Structured normalized data schemas with category, deadline, and eligibility filtering.

--------------------------------------------------
LEADERSHIP & EXPERIENCE
- Department Head, E-Cell VJTI (2024 - 2025): Led initiatives, organized entrepreneurship workshops and startup awareness programs.
- Event Coordinator, Enthusia VJTI: Managed logistics and coordinated inter-college festival operations.

--------------------------------------------------
BEYOND CODING
- Sports: College-level Kabaddi tournament competitor (tactical agility, teamwork, and quick decision making).
- Hobbies: Reading (computing systems, architecture & science) and Sketching (visual composition & perspective).
`.trim();

  const handleCopyText = () => {
    navigator.clipboard.writeText(resumePlainText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownloadTxt = () => {
    setDownloading(true);
    const blob = new Blob([resumePlainText], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'Rohan_Patil_Resume.txt';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
    setTimeout(() => setDownloading(false), 1500);
  };

  return (
    <div 
      className="modal-overlay" 
      onClick={onClose} 
      role="dialog" 
      aria-modal="true"
      aria-labelledby="resume-modal-title"
    >
      <div 
        className="modal-container" 
        onClick={(e) => e.stopPropagation()} 
        style={{ maxWidth: '860px' }}
      >
        {/* Header Bar */}
        <div className="modal-header">
          <div>
            <span className="badge badge-lime" style={{ marginBottom: '4px' }}>
              RESUME DOCUMENT
            </span>
            <h3 id="resume-modal-title" className="modal-title">Rohan Patil — Curriculum Vitae</h3>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap' }}>
            <button
              type="button"
              className="btn btn-primary btn-sm"
              onClick={handleDownloadTxt}
              title="Download Resume as Text File"
              aria-label="Download Plaintext Resume"
            >
              {downloading ? <Check size={14} /> : <Download size={14} />}
              <span>{downloading ? 'Downloaded!' : 'Download (.txt)'}</span>
            </button>

            <button
              type="button"
              className="btn btn-secondary btn-sm"
              onClick={handlePrint}
              title="Print or Save as PDF"
              aria-label="Print or Save as PDF"
            >
              <Printer size={14} />
              <span>Print / PDF</span>
            </button>

            <button
              type="button"
              className="btn btn-secondary btn-sm"
              onClick={handleCopyText}
              title="Copy Plaintext Resume"
              aria-label="Copy Resume Text to Clipboard"
            >
              {copied ? <Check size={14} color="#B8F36B" /> : <Copy size={14} />}
              <span>{copied ? 'Copied!' : 'Copy'}</span>
            </button>

            <button
              type="button"
              className="modal-close-btn"
              onClick={onClose}
              aria-label="Close resume modal"
            >
              <X size={20} />
            </button>
          </div>
        </div>

        {/* Modal Printable Sheet */}
        <div className="modal-body">
          <div className="resume-preview-sheet">
            {/* Resume Header */}
            <header className="resume-header">
              <div>
                <h1 className="resume-name">{personalInfo.name}</h1>
                <div className="resume-sub">
                  Computer Engineering Undergrad • Minor in Cybersecurity
                </div>
                <div style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', marginTop: '4px' }}>
                  {personalInfo.college}
                </div>
              </div>

              <div className="resume-contacts">
                <div>{personalInfo.email}</div>
                <div>{personalInfo.phone}</div>
                <div>{personalInfo.location}</div>
                <div><a href={personalInfo.links.github} target="_blank" rel="noopener noreferrer" style={{ color: 'inherit' }}>github.com/Luffy3bg5</a></div>
                <div><a href={personalInfo.links.linkedin} target="_blank" rel="noopener noreferrer" style={{ color: 'inherit' }}>linkedin.com/in/rohan-patil-08b95431a</a></div>
              </div>
            </header>

            {/* Education */}
            <section className="resume-section">
              <h2 className="resume-section-heading">Education & Entrance Examinations</h2>
              
              <div className="resume-item">
                <div className="resume-item-top">
                  <span className="resume-item-title">Veermata Jijabai Technological Institute (VJTI), Mumbai</span>
                  <span className="resume-item-date">2024 – 2028</span>
                </div>
                <div style={{ color: 'var(--accent-lime)', fontSize: '0.85rem', fontWeight: 600 }}>
                  B.Tech in Computer Engineering with Minor in Cybersecurity
                </div>
                <div style={{ fontSize: '0.82rem', color: 'var(--text-secondary)', marginTop: '4px' }}>
                  • MHT-CET Score: <strong>99.81 Percentile</strong> (State Rank 437)
                </div>
              </div>

              <div className="resume-item" style={{ marginTop: '10px' }}>
                <div className="resume-item-top">
                  <span className="resume-item-title">Shraddha College</span>
                  <span className="resume-item-date">2024</span>
                </div>
                <div style={{ fontSize: '0.82rem', color: 'var(--text-secondary)' }}>
                  Higher Secondary Certificate (HSC) / Pre-Engineering Foundation
                </div>
              </div>
            </section>

            {/* Coursework */}
            <section className="resume-section">
              <h2 className="resume-section-heading">Relevant Academic Coursework</h2>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px', fontSize: '0.82rem' }}>
                {courseworkList.map(c => (
                  <span key={c.name} className="badge">
                    {c.name}
                  </span>
                ))}
              </div>
            </section>

            {/* Projects */}
            <section className="resume-section">
              <h2 className="resume-section-heading">Key Technical Projects</h2>

              {projects.map((proj) => (
                <div className="resume-item" key={proj.id} style={{ marginBottom: '16px' }}>
                  <div className="resume-item-top">
                    <span className="resume-item-title">{proj.title}</span>
                    <span className="resume-item-date">{proj.role}</span>
                  </div>
                  <div style={{ fontSize: '0.8rem', color: 'var(--accent-lime)', marginBottom: '4px' }}>
                    {proj.tags.join(' • ')}
                  </div>
                  <ul style={{ paddingLeft: '18px', fontSize: '0.82rem', color: 'var(--text-secondary)' }}>
                    {proj.highlights.map((h, i) => (
                      <li key={i} style={{ marginBottom: '3px' }}>{h}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </section>

            {/* Skills */}
            <section className="resume-section">
              <h2 className="resume-section-heading">Technical Skills & Tooling</h2>
              <div style={{ fontSize: '0.85rem', lineHeight: '1.7', color: 'var(--text-secondary)' }}>
                <div>
                  <strong style={{ color: '#FFFFFF' }}>Programming Languages:</strong> C++, Python, JavaScript, HTML, CSS
                </div>
                <div>
                  <strong style={{ color: '#FFFFFF' }}>Backend & Databases:</strong> Node.js, Express.js, MongoDB, MySQL
                </div>
                <div>
                  <strong style={{ color: '#FFFFFF' }}>Developer Tools:</strong> Git, GitHub, VS Code, Postman, JWT
                </div>
                <div>
                  <strong style={{ color: '#FFFFFF' }}>Academic Focus:</strong> Cybersecurity Minor (Modern Cryptography), Applied Gemini AI, Local Diffusion (ComfyUI / Stable Diffusion)
                </div>
              </div>
            </section>

            {/* Leadership & Activities */}
            <section className="resume-section">
              <h2 className="resume-section-heading">Leadership & Activities</h2>

              <div className="resume-item">
                <div className="resume-item-top">
                  <span className="resume-item-title">E-Cell, VJTI — Department Head</span>
                  <span className="resume-item-date">2024 – 2025</span>
                </div>
                <div style={{ fontSize: '0.82rem', color: 'var(--text-secondary)' }}>
                  Led departmental operations, organized entrepreneurship bootcamps, and structured speaker sessions for student founders.
                </div>
              </div>

              <div className="resume-item" style={{ marginTop: '8px' }}>
                <div className="resume-item-top">
                  <span className="resume-item-title">Enthusia, VJTI — Event Coordinator</span>
                  <span className="resume-item-date">College Term</span>
                </div>
                <div style={{ fontSize: '0.82rem', color: 'var(--text-secondary)' }}>
                  Coordinated inter-college sporting events, scheduling, participant management, and ground logistics.
                </div>
              </div>

              <div className="resume-item" style={{ marginTop: '8px' }}>
                <div className="resume-item-top">
                  <span className="resume-item-title">Athletics & Hobbies</span>
                  <span className="resume-item-date">Extracurricular</span>
                </div>
                <div style={{ fontSize: '0.82rem', color: 'var(--text-secondary)' }}>
                  Competitor in college Kabaddi tournaments. Passionate reader of computing architecture and avid sketch artist.
                </div>
              </div>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}
