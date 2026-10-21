import React from 'react';
import { educationHistory, courseworkList } from '../data/portfolioData';

export default function Education() {
  return (
    <section className="section" id="education">
      <div className="container">
        <div className="section-header">
          <div className="section-tag">Academic Background</div>
          <h2 className="section-title">Education & Coursework</h2>
          <p className="section-subtitle">
            Formal training in theoretical computer science, systems engineering, and modern cryptography at VJTI Mumbai.
          </p>
        </div>

        {/* Education History Cards */}
        <div className="education-grid">
          {educationHistory.map((edu, idx) => (
            <div className={`edu-card ${idx === 0 ? 'edu-primary' : ''}`} key={edu.institution}>
              <div>
                <div className="edu-period">{edu.period}</div>
                <h3 className="edu-inst">{edu.institution}</h3>
                <div className="edu-degree">{edu.degree}</div>
                {edu.minor && (
                  <div className="edu-minor">{edu.minor}</div>
                )}
                <p className="edu-desc">{edu.description}</p>
              </div>

              {edu.metrics && (
                <div className="edu-metrics-row">
                  {edu.metrics.map((m) => (
                    <div className="metric-box" key={m.label}>
                      <div className="metric-num">{m.value}</div>
                      <div className="metric-label">{m.label} ({m.detail})</div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Coursework Section */}
        <div style={{ marginTop: '20px' }}>
          <div style={{ marginBottom: '24px' }}>
            <h3 style={{ fontSize: '1.45rem', fontWeight: 800, marginBottom: '6px' }}>
              Rigorous University Coursework
            </h3>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.92rem' }}>
              Core curricula mastered across computational theory, database internals, and systems security.
            </p>
          </div>

          <div className="coursework-cards-grid">
            {courseworkList.map((course) => (
              <div className="course-card" key={course.code}>
                <div className="course-card-top">
                  <span className="course-name">{course.name}</span>
                  <span className="course-code">{course.code}</span>
                </div>
                <p className="course-topics">
                  <strong style={{ color: 'var(--text-muted)' }}>Focus:</strong> {course.topics}
                </p>
                <div className="course-application">
                  <strong>Practical Impact:</strong> {course.application}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
