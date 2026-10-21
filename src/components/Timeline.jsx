import React, { useState } from 'react';
import { 
  Calendar, 
  MapPin, 
  CheckCircle2
} from 'lucide-react';
import { 
  courseworkList 
} from '../data/portfolioData';
import ScrollReveal from './ScrollReveal';

export default function Timeline() {
  const [activeFilter, setActiveFilter] = useState('all');

  // Unified timeline milestones sorted chronologically
  const milestones = [
    {
      id: 'vjti-btech',
      type: 'education',
      period: '2024 – 2028',
      title: 'Veermata Jijabai Technological Institute (VJTI), Mumbai',
      subtitle: 'B.Tech in Computer Engineering with Minor in Cybersecurity',
      badge: 'Current Degree',
      location: 'Matunga, Mumbai',
      description: 'Undergraduate engineering at one of India’s premier technical institutions. Comprehensive curriculum blending algorithmic foundations, operating systems, and dedicated cybersecurity coursework.',
      metrics: [
        { label: 'MHT-CET Percentile', value: '99.81%ile', detail: 'State Rank 437' }
      ],
      points: [
        'Pursuing formal Minor in Cybersecurity covering modern cryptography, security architectures, and secure auth.',
        'Actively implementing full-stack systems and local AI neural pipelines alongside academic studies.'
      ]
    },
    {
      id: 'ecell-vjti',
      type: 'leadership',
      period: '2024 – 2025',
      title: 'E-Cell, VJTI Mumbai',
      subtitle: 'Department Head',
      badge: 'Leadership Role',
      location: 'VJTI Campus',
      description: 'Heading departmental operations at the Entrepreneurship Cell of VJTI, driving student innovation culture and startup awareness.',
      points: [
        'Spearheaded departmental initiatives and structured entrepreneurship workshops for student innovators.',
        'Managed cross-functional student teams and coordinated industry speaker sessions with experienced founders.',
        'Facilitated student startup incubation awareness and campus-wide pitch competitions.'
      ]
    },
    {
      id: 'enthusia-vjti',
      type: 'leadership',
      period: 'College Term',
      title: 'Enthusia, VJTI Mumbai',
      subtitle: 'Event Coordinator',
      badge: 'Event Management',
      location: 'VJTI Campus',
      description: 'Coordinated large-scale activities for Enthusia, the prominent annual sports and cultural festival of VJTI.',
      points: [
        'Organized tournament schedules, participant logistics, and venue setups.',
        'Ensured smooth ground operations, dispute resolution, and cross-committee collaboration under tight timelines.'
      ]
    },
    {
      id: 'shraddha-college',
      type: 'education',
      period: '2024',
      title: 'Shraddha College',
      subtitle: 'Higher Secondary Certificate (HSC) / Pre-Engineering',
      badge: 'Academic Milestone',
      location: 'Maharashtra',
      description: 'Foundational coursework in Mathematics, Physics, and Chemistry, graduating with entrance exam ranks earning admission to VJTI Computer Engineering.',
      points: [
        'Achieved 99.81 percentile in MHT-CET (Rank 437 state-wide), securing admission to VJTI Computer Engineering.'
      ]
    }
  ];

  const filteredMilestones = activeFilter === 'all'
    ? milestones
    : milestones.filter(m => m.type === activeFilter);

  return (
    <section className="section" id="timeline">
      {/* Anchor targets so legacy #leadership and #education links work smoothly */}
      <div id="leadership" style={{ position: 'relative', top: '-100px' }} />
      <div id="education" style={{ position: 'relative', top: '-100px' }} />

      <div className="container">
        <ScrollReveal>
          <div className="section-header">
            <div className="section-tag">Academic & Leadership Track</div>
            <h2 className="section-title">Timeline & Milestones</h2>
            <p className="section-subtitle">
              An elegant chronicle of formal engineering education at VJTI Mumbai, entrance exam achievements, and student leadership roles.
            </p>
          </div>
        </ScrollReveal>

        {/* Timeline Filter Controls */}
        <ScrollReveal delay={100}>
          <div className="timeline-filter-bar">
            <button
              type="button"
              className={`filter-tab ${activeFilter === 'all' ? 'active' : ''}`}
              onClick={() => setActiveFilter('all')}
            >
              All Milestones ({milestones.length})
            </button>
            <button
              type="button"
              className={`filter-tab ${activeFilter === 'education' ? 'active' : ''}`}
              onClick={() => setActiveFilter('education')}
            >
              Education & Academics
            </button>
            <button
              type="button"
              className={`filter-tab ${activeFilter === 'leadership' ? 'active' : ''}`}
              onClick={() => setActiveFilter('leadership')}
            >
              Campus Leadership
            </button>
          </div>
        </ScrollReveal>

        {/* Vertical Studio Timeline */}
        <div className="studio-vertical-timeline">
          <div className="timeline-spine-track" />

          {filteredMilestones.map((item, idx) => {
            const isEducation = item.type === 'education';
            return (
              <ScrollReveal key={item.id} delay={idx * 90}>
                <div className="timeline-milestone-entry">
                  {/* Milestone Node on Spine */}
                  <div className="timeline-node-marker">
                    <div className={`node-dot ${isEducation ? 'node-lime' : 'node-secondary'}`} />
                  </div>

                  {/* Milestone Card Content */}
                  <div className="timeline-card-content">
                    <div className="milestone-header">
                      <div className="milestone-title-group">
                        <div className="milestone-meta-strip">
                          <span className="milestone-period-badge">
                            <Calendar size={12} />
                            <span>{item.period}</span>
                          </span>
                          <span className={`badge ${isEducation ? 'badge-lime' : 'badge-dim'}`}>
                            {item.badge}
                          </span>
                          <span className="milestone-location-chip">
                            <MapPin size={11} />
                            <span>{item.location}</span>
                          </span>
                        </div>

                        <h3 className="milestone-main-title">{item.title}</h3>
                        <div className="milestone-subtitle-role">{item.subtitle}</div>
                      </div>
                    </div>

                    <p className="milestone-desc-text">
                      {item.description}
                    </p>

                    {/* Metrics if present */}
                    {item.metrics && (
                      <div className="milestone-metrics-grid">
                        {item.metrics.map(m => (
                          <div className="metric-pill-box" key={m.label}>
                            <span className="metric-pill-num">{m.value}</span>
                            <span className="metric-pill-label">{m.label} <span className="metric-pill-sub">({m.detail})</span></span>
                          </div>
                        ))}
                      </div>
                    )}

                    {/* Bullet points */}
                    <div className="milestone-bullets-list">
                      {item.points.map((pt, pIdx) => (
                        <div className="milestone-bullet-row" key={pIdx}>
                          <CheckCircle2 size={15} color="var(--accent-lime)" className="bullet-icon" />
                          <span className="bullet-text">{pt}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </ScrollReveal>
            );
          })}
        </div>

        {/* Coursework Cards Grid Section */}
        <div className="coursework-section-block">
          <ScrollReveal>
            <div className="coursework-header-wrap">
              <div>
                <div className="section-tag" style={{ marginBottom: '10px' }}>Curriculum Rigor</div>
                <h3 className="coursework-heading">University Coursework</h3>
                <p className="coursework-subtext">
                  Theoretical foundations and direct practical software impacts evaluated in exams and laboratory projects at VJTI.
                </p>
              </div>
              <span className="badge badge-lime">
                7 Core Courses
              </span>
            </div>
          </ScrollReveal>

          <div className="coursework-cards-grid">
            {courseworkList.map((course, cIdx) => (
              <ScrollReveal key={course.code} delay={Math.min((cIdx % 4) * 60, 240)}>
                <div className="course-card">
                  <div className="course-card-top">
                    <span className="course-name">{course.name}</span>
                    <span className="course-code">{course.code}</span>
                  </div>
                  <p className="course-topics">
                    <strong style={{ color: 'var(--text-muted)' }}>Focus:</strong> {course.topics}
                  </p>
                  <div className="course-application">
                    <strong>Impact:</strong> {course.application}
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
