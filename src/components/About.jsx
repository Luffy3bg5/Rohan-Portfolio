import React from 'react';
import { Layers, Cpu, ShieldCheck } from 'lucide-react';
import ScrollReveal from './ScrollReveal';

const corePillars = [
  {
    num: "01",
    title: "Full-Stack Web Engineering",
    icon: <Layers size={22} color="#B8F36B" />,
    desc: "Architecting reliable web platforms with modern JavaScript, Node.js, Express.js, and MongoDB. Focusing on structured REST APIs, guarded endpoints with JWT, and high data consistency."
  },
  {
    num: "02",
    title: "Applied AI & Generation Workflows",
    icon: <Cpu size={22} color="#B8F36B" />,
    desc: "Bridging the gap between software and AI. Integrating Google Gemini for automated drafting and context synthesis, paired with local neural synthesis pipelines using ComfyUI and Stable Diffusion."
  },
  {
    num: "03",
    title: "Cybersecurity & Systems Rigor",
    icon: <ShieldCheck size={22} color="#B8F36B" />,
    desc: "Pursuing a dedicated Minor in Cybersecurity at VJTI. Deepening understanding in Modern Cryptography, secure authentication schemes, threat mitigations, and resilient distributed architectures."
  }
];

export default function About() {
  return (
    <section className="section" id="about">
      <div className="container">
        <ScrollReveal>
          <div className="section-header">
            <div className="section-tag">About The Developer</div>
            <h2 className="section-title about-section-title">Rooted in engineering principles. Driven by curiosity.</h2>
            <p className="section-subtitle about-section-subtitle">
              A look into my academic journey at VJTI Mumbai, technical ethos, and how I bridge theoretical computer science with real-world software products.
            </p>
          </div>
        </ScrollReveal>

        <div className="about-grid">
          {/* Bio Column */}
          <ScrollReveal delay={100} className="about-bio-col">
            <div>
              <div className="about-bio-text">
                <p className="about-lead-para">
                  Hello, I'm <strong style={{ color: 'var(--text-primary)' }}>Rohan Patil</strong>. Currently, I am pursuing my Bachelor of Technology in Computer Engineering at <strong style={{ color: 'var(--text-primary)' }}>Veermata Jijabai Technological Institute (VJTI)</strong> in Mumbai, alongside an academic Minor in Cybersecurity (Class of 2028).
                </p>
                <p>
                  My passion lies in crafting applications that solve practical everyday problems. Whether that means building high-performance backends with Node.js and MongoDB, designing automated social media engines with Gemini AI and local Stable Diffusion nodes, or studying cryptographic primitives, I prioritize clean abstractions and maintainable code.
                </p>
                <p>
                  Outside of raw code, I actively engage in campus leadership through the VJTI Entrepreneurship Cell (E-Cell) as Department Head, contribute to university festival operations, and bring the mental focus learned on the Kabaddi court straight to problem solving.
                </p>
              </div>

              <div className="about-quote-box">
                “Building useful software isn't just about syntax—it's about resilient system design, safe data boundaries, and pragmatic intelligence.”
              </div>
            </div>
          </ScrollReveal>

          {/* Core Pillars Column with Staggered Delays */}
          <div className="pillars-column">
            {corePillars.map((pillar, idx) => (
              <ScrollReveal key={pillar.num} delay={150 + idx * 80}>
                <div className="pillar-card">
                  <div className="pillar-header">
                    <span className="pillar-num">{pillar.num}</span>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      {pillar.icon}
                      <h3 className="pillar-title">{pillar.title}</h3>
                    </div>
                  </div>
                  <p className="pillar-desc">{pillar.desc}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
