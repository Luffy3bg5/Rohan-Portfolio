import React from 'react';
import { Book, Palette, Flame, Sparkles, Target } from 'lucide-react';
import { beyondCoding } from '../data/portfolioData';
import ScrollReveal from './ScrollReveal';

export default function BeyondCoding() {
  return (
    <section className="section" id="beyond">
      <div className="container">
        <ScrollReveal>
          <div className="section-header">
            <div className="section-tag">Interests & Pursuits</div>
            <h2 className="section-title">Beyond Coding</h2>
            <p className="section-subtitle">
              Athletic discipline and creative outlets that shape how I think, collaborate, and approach engineering problems.
            </p>
          </div>
        </ScrollReveal>

        <div className="beyond-grid">
          {/* Sports Card: Kabaddi */}
          <ScrollReveal delay={100}>
            <div className="beyond-card">
              <div>
                <div className="beyond-card-header">
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <Flame size={22} color="#B8F36B" />
                    <h3 className="beyond-title">{beyondCoding.sports.title}</h3>
                  </div>
                  <span className="badge badge-lime">{beyondCoding.sports.badge}</span>
                </div>

                <p className="beyond-desc">
                  {beyondCoding.sports.description} Playing Kabaddi at the inter-college level demands extreme situational awareness, swift tactical reactions, and cohesive defensive timing.
                </p>

                <ul className="beyond-list">
                  {beyondCoding.sports.takeaways.map((point, idx) => (
                    <li className="beyond-list-item" key={idx}>
                      <Target size={16} color="#B8F36B" style={{ flexShrink: 0, marginTop: '3px' }} />
                      <span>{point}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div style={{ marginTop: '24px', paddingTop: '16px', borderTop: '1px solid var(--border-subtle)', fontSize: '0.82rem', color: 'var(--text-muted)' }}>
                "The court demands instantaneous decisions under high contact—a skill that translates directly to staying calm during production deadlines."
              </div>
            </div>
          </ScrollReveal>

          {/* Hobbies: Reading & Sketching */}
          <ScrollReveal delay={180}>
            <div className="beyond-card">
              <div>
                <div className="beyond-card-header">
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <Sparkles size={22} color="#B8F36B" />
                    <h3 className="beyond-title">Creative & Intellectual Hobbies</h3>
                  </div>
                  <span className="badge">Disciplined Curiosity</span>
                </div>

                <div className="beyond-hobbies-container">
                  {/* Reading */}
                  <div className="hobby-subcard">
                    <div className="hobby-header">
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <Book size={18} color="#B8F36B" />
                        <h4 className="hobby-title">{beyondCoding.hobbies[0].title}</h4>
                      </div>
                      <span className="badge">{beyondCoding.hobbies[0].badge}</span>
                    </div>
                    <p className="hobby-desc">{beyondCoding.hobbies[0].description}</p>
                    <div className="hobby-focus">
                      <strong>Insight:</strong> {beyondCoding.hobbies[0].focus}
                    </div>
                  </div>

                  {/* Sketching */}
                  <div className="hobby-subcard">
                    <div className="hobby-header">
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <Palette size={18} color="#B8F36B" />
                        <h4 className="hobby-title">{beyondCoding.hobbies[1].title}</h4>
                      </div>
                      <span className="badge">{beyondCoding.hobbies[1].badge}</span>
                    </div>
                    <p className="hobby-desc">{beyondCoding.hobbies[1].description}</p>
                    <div className="hobby-focus">
                      <strong>Insight:</strong> {beyondCoding.hobbies[1].focus}
                    </div>
                  </div>
                </div>
              </div>

              <div style={{ marginTop: '24px', paddingTop: '16px', borderTop: '1px solid var(--border-subtle)', fontSize: '0.82rem', color: 'var(--text-muted)' }}>
                "Sketching sharpens my eye for visual hierarchy and user interface layout, while reading provides long-range perspective."
              </div>
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}
