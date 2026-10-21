import React, { useEffect } from 'react';
import { X, CheckCircle, ExternalLink, Layers } from 'lucide-react';
import { Github } from './Icons';

export default function ProjectModal({ project, onClose }) {
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

  if (!project) return null;

  return (
    <div 
      className="modal-overlay" 
      onClick={onClose} 
      role="dialog" 
      aria-modal="true"
      aria-labelledby="project-modal-title"
    >
      <div className="modal-container" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <div>
            <div className="badge badge-lime" style={{ marginBottom: '6px' }}>
              {project.role}
            </div>
            <h3 id="project-modal-title" className="modal-title">{project.title}</h3>
          </div>
          <button 
            type="button" 
            className="modal-close-btn" 
            onClick={onClose}
            aria-label="Close modal"
          >
            <X size={20} />
          </button>
        </div>

        <div className="modal-body">
          {/* Media preview */}
          <div className="modal-preview-frame">
            <img 
              src={project.image} 
              alt={`${project.title} - Full Architecture and Dashboard Screenshot`} 
              className="modal-preview-image"
            />
          </div>

          {/* Project overview */}
          <div style={{ marginBottom: '24px' }}>
            <h4 style={{ fontSize: '1.1rem', marginBottom: '8px', color: '#FFFFFF' }}>Project Overview</h4>
            <p style={{ color: 'var(--text-secondary)', lineHeight: '1.65' }}>
              {project.fullDescription}
            </p>
          </div>

          {/* Key Feature Highlights */}
          <div style={{ marginBottom: '28px' }}>
            <h4 style={{ fontSize: '1.1rem', marginBottom: '14px', color: '#FFFFFF' }}>Engineered Highlights</h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              {project.highlights.map((item, idx) => (
                <div key={idx} style={{ display: 'flex', alignItems: 'flex-start', gap: '12px' }}>
                  <CheckCircle size={18} color="#B8F36B" style={{ flexShrink: 0, marginTop: '3px' }} />
                  <span style={{ fontSize: '0.92rem', color: 'var(--text-secondary)', lineHeight: '1.55' }}>
                    {item}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Architectural Breakdown */}
          {project.architecture && (
            <div style={{ marginBottom: '28px', background: 'var(--bg-canvas)', border: '1px solid var(--border-subtle)', borderRadius: '10px', padding: '20px' }}>
              <h4 style={{ fontSize: '1rem', marginBottom: '14px', color: 'var(--accent-lime)', display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Layers size={18} />
                <span>System Architecture Blueprint</span>
              </h4>
              
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '14px' }}>
                {project.architecture.client && (
                  <div style={{ background: 'var(--bg-surface)', padding: '12px', borderRadius: '6px' }}>
                    <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.72rem', color: 'var(--text-muted)', marginBottom: '4px' }}>
                      FRONTEND
                    </div>
                    <div style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
                      {project.architecture.client}
                    </div>
                  </div>
                )}

                {project.architecture.server && (
                  <div style={{ background: 'var(--bg-surface)', padding: '12px', borderRadius: '6px' }}>
                    <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.72rem', color: 'var(--text-muted)', marginBottom: '4px' }}>
                      BACKEND & LOGIC
                    </div>
                    <div style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
                      {project.architecture.server}
                    </div>
                  </div>
                )}

                {project.architecture.aiEngine && (
                  <div style={{ background: 'var(--bg-surface)', padding: '12px', borderRadius: '6px' }}>
                    <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.72rem', color: 'var(--text-muted)', marginBottom: '4px' }}>
                      AI PIPELINE
                    </div>
                    <div style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
                      {project.architecture.aiEngine}
                    </div>
                  </div>
                )}

                {project.architecture.database && (
                  <div style={{ background: 'var(--bg-surface)', padding: '12px', borderRadius: '6px' }}>
                    <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.72rem', color: 'var(--text-muted)', marginBottom: '4px' }}>
                      PERSISTENCE
                    </div>
                    <div style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
                      {project.architecture.database}
                    </div>
                  </div>
                )}

                {project.architecture.security && (
                  <div style={{ background: 'var(--bg-surface)', padding: '12px', borderRadius: '6px' }}>
                    <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.72rem', color: 'var(--text-muted)', marginBottom: '4px' }}>
                      SECURITY CONTROLS
                    </div>
                    <div style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
                      {project.architecture.security}
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Tech stack badges */}
          <div style={{ marginBottom: '28px' }}>
            <h4 style={{ fontFamily: 'var(--font-mono)', fontSize: '0.8rem', letterSpacing: '0.05em', textTransform: 'uppercase', color: 'var(--text-muted)', marginBottom: '10px' }}>
              Technologies Utilized
            </h4>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
              {project.tags.map((tag) => (
                <span key={tag} className="badge badge-lime">
                  {tag}
                </span>
              ))}
            </div>
          </div>

          {/* Modal Actions */}
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '14px', paddingTop: '18px', borderTop: '1px solid var(--border-subtle)' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              {project.links.repoUrl ? (
                <a 
                  href={project.links.repoUrl} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="btn btn-secondary btn-sm"
                >
                  <Github size={16} />
                  <span>View Repository</span>
                  <ExternalLink size={14} />
                </a>
              ) : (
                <a 
                  href={project.links.githubProfile} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="btn btn-secondary btn-sm"
                >
                  <Github size={16} />
                  <span>GitHub Profile</span>
                  <ExternalLink size={14} />
                </a>
              )}
              <span className="badge badge-dim">{project.links.statusText}</span>
            </div>

            <button 
              type="button" 
              className="btn btn-ghost btn-sm"
              onClick={onClose}
            >
              Close Blueprint
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
