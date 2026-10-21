import React, { useState } from 'react';
import { ArrowUpRight, Layers, ExternalLink, Lock, CheckCircle2 } from 'lucide-react';
import { Github } from './Icons';
import { projects } from '../data/portfolioData';
import ProjectModal from './ProjectModal';
import ScrollReveal from './ScrollReveal';

export default function Projects() {
  const [activeModalProject, setActiveModalProject] = useState(null);

  return (
    <section className="section" id="projects">
      <div className="container">
        <ScrollReveal>
          <div className="section-header">
            <div className="section-tag">Featured Engineering</div>
            <h2 className="section-title">Selected Projects</h2>
            <p className="section-subtitle">
              Real software systems engineered at VJTI spanning full-stack architectures, automated generative AI pipelines, and protected REST services.
            </p>
          </div>
        </ScrollReveal>

        <div className="projects-grid">
          {projects.map((project, index) => (
            <ScrollReveal key={project.id} delay={index * 120}>
              <article className="distinct-project-card">
                {/* Media Preview Column */}
                <div className="project-frame-col">
                  {/* Studio Mockup Titlebar with Role Badge OUTSIDE screenshot */}
                  <div className="project-frame-topbar">
                    <div className="project-window-dots">
                      <span className="window-dot dot-red"></span>
                      <span className="window-dot dot-yellow"></span>
                      <span className="window-dot dot-green"></span>
                      <span className="window-address-bar">{project.id}.vjti.internal</span>
                    </div>
                    <span className="badge badge-lime project-role-badge">
                      {project.role}
                    </span>
                  </div>

                  <div className="project-image-wrapper">
                    <img 
                      src={project.image} 
                      alt={`${project.title} - Full System Architecture & Dashboard UI`} 
                      className="project-display-image"
                      loading="lazy"
                    />
                  </div>

                  {/* Sub-strip with architectural stats */}
                  <div className="project-sub-strip">
                    <div className="strip-item">
                      <span className="strip-label">STATUS</span>
                      <span className="strip-val">{project.links.statusText || 'Active Development'}</span>
                    </div>
                    <div className="strip-item">
                      <span className="strip-label">SECURITY</span>
                      <span className="strip-val">JWT Protected</span>
                    </div>
                    <div className="strip-item">
                      <span className="strip-label">DATABASE</span>
                      <span className="strip-val">MongoDB</span>
                    </div>
                  </div>
                </div>

                {/* Content Specification Column */}
                <div className="project-details-col">
                  <div className="project-header-meta">
                    <span className="project-index-num">0{index + 1} // CASE STUDY</span>
                    <span className="badge badge-dim">VJTI ACADEMIC & PRACTICAL</span>
                  </div>

                  <h3 className="project-heading">{project.title}</h3>
                  <div className="project-lead-tagline">{project.tagline}</div>
                  
                  <p className="project-narrative-desc">
                    {project.shortDescription}
                  </p>

                  {/* Technical Highlights with Checkmarks */}
                  <div className="project-bullet-highlights">
                    {project.highlights.slice(0, 3).map((item, idx) => (
                      <div className="bullet-row" key={idx}>
                        <CheckCircle2 size={15} color="#B8F36B" className="bullet-icon" />
                        <span className="bullet-text">{item}</span>
                      </div>
                    ))}
                  </div>

                  {/* Large, Distinct Technology Tags */}
                  <div className="project-tech-tags-wrapper">
                    <span className="tech-tags-label">STACK:</span>
                    <div className="tech-tags-group">
                      {project.tags.map((tag) => (
                        <span className="tech-tile-tag" key={tag}>
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Real Links & Architecture Inspector Actions */}
                  <div className="project-card-actions">
                    <button
                      type="button"
                      className="btn btn-primary btn-sm"
                      onClick={() => setActiveModalProject(project)}
                      aria-label={`Inspect Architecture for ${project.title}`}
                    >
                      <Layers size={15} />
                      <span>Inspect Architecture</span>
                    </button>

                    {/* Render verified repo link ONLY if provided */}
                    {project.links.repoUrl ? (
                      <a
                        href={project.links.repoUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="btn btn-secondary btn-sm"
                      >
                        <Github size={15} />
                        <span>Repository</span>
                        <ArrowUpRight size={13} />
                      </a>
                    ) : (
                      <a
                        href={project.links.githubProfile}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="btn btn-secondary btn-sm"
                        title="View Rohan's verified GitHub profile (repository available upon request)"
                      >
                        <Github size={15} />
                        <span>GitHub (Profile)</span>
                        <ArrowUpRight size={13} />
                      </a>
                    )}

                    {/* Live demo if provided */}
                    {project.links.demoUrl && (
                      <a
                        href={project.links.demoUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="btn btn-secondary btn-sm"
                      >
                        <ExternalLink size={14} />
                        <span>Live Demo</span>
                      </a>
                    )}

                    <span className="status-note-tag">
                      <Lock size={12} style={{ display: 'inline', marginRight: '4px' }} />
                      {project.links.statusText}
                    </span>
                  </div>
                </div>
              </article>
            </ScrollReveal>
          ))}
        </div>
      </div>

      {/* Deep Architecture Blueprint Modal */}
      {activeModalProject && (
        <ProjectModal 
          project={activeModalProject} 
          onClose={() => setActiveModalProject(null)} 
        />
      )}
    </section>
  );
}
