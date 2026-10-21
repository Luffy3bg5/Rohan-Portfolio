import React from 'react';
import { Calendar, MapPin, CheckCircle2 } from 'lucide-react';
import { experienceAndLeadership } from '../data/portfolioData';

export default function Experience() {
  return (
    <section className="section" id="leadership">
      <div className="container">
        <div className="section-header">
          <div className="section-tag">Campus Involvement</div>
          <h2 className="section-title">Experience & Leadership</h2>
          <p className="section-subtitle">
            Leading initiatives, driving campus entrepreneurship, and coordinating university-scale events at VJTI Mumbai.
          </p>
        </div>

        <div className="leadership-timeline">
          {experienceAndLeadership.map((item, index) => (
            <div className="leadership-card" key={index}>
              <div className="leadership-header">
                <div>
                  <h3 className="leadership-org">{item.organization}</h3>
                  <div className="leadership-role">{item.role}</div>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <span className="leadership-tenure">
                    <Calendar size={13} style={{ display: 'inline', marginRight: '5px' }} />
                    {item.tenure}
                  </span>
                  <span className="badge">
                    <MapPin size={12} style={{ display: 'inline', marginRight: '4px' }} />
                    {item.location}
                  </span>
                </div>
              </div>

              <ul className="leadership-points">
                {item.points.map((pt, pIdx) => (
                  <li className="leadership-point-item" key={pIdx}>
                    <CheckCircle2 size={16} color="#B8F36B" style={{ flexShrink: 0, marginTop: '3px' }} />
                    <span>{pt}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
