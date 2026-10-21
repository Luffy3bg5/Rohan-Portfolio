import React, { useState, useMemo } from 'react';
import { 
  ShieldCheck, 
  Code, 
  Server, 
  Database, 
  Wrench, 
  Cpu, 
  Lock, 
  Search, 
  X
} from 'lucide-react';
import { skillCategories } from '../data/portfolioData';
import ScrollReveal from './ScrollReveal';

// Dynamic icon resolution
const getSkillIcon = (category, name) => {
  if (category === 'Languages') return <Code size={22} color="#B8F36B" />;
  if (category === 'Backend & Databases') {
    if (name.includes('Mongo') || name.includes('SQL')) return <Database size={22} color="#B8F36B" />;
    return <Server size={22} color="#B8F36B" />;
  }
  if (category === 'Developer Tools & Workflows') return <Wrench size={22} color="#B8F36B" />;
  if (name.includes('Crypto') || name.includes('Cyber')) return <Lock size={22} color="#B8F36B" />;
  return <Cpu size={22} color="#B8F36B" />;
};

export default function Skills() {
  const [activeCategory, setActiveCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');

  const filterTabs = [
    { id: 'All', label: 'All Technologies' },
    { id: 'Languages', label: 'Languages' },
    { id: 'Backend & Databases', label: 'Backend & Databases' },
    { id: 'Developer Tools & Workflows', label: 'Developer Tools' },
    { id: 'Areas of Exploration & Study', label: 'Cyber & AI Focus' }
  ];

  // Flatten skills with category info for robust search and filter
  const allSkills = useMemo(() => {
    return skillCategories.flatMap(cat => 
      cat.skills.map(s => ({
        ...s,
        category: cat.category,
        categoryShort: cat.category === 'Areas of Exploration & Study' 
          ? 'Cyber & AI Focus' 
          : cat.category === 'Developer Tools & Workflows' 
            ? 'Tools' 
            : cat.category
      }))
    );
  }, []);

  // Filter skills based on both selected category and search query
  const filteredSkills = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();
    return allSkills.filter((skill) => {
      const matchesCategory = activeCategory === 'All' || skill.category === activeCategory;
      const matchesQuery = !q || 
        skill.name.toLowerCase().includes(q) || 
        skill.note.toLowerCase().includes(q) || 
        skill.category.toLowerCase().includes(q) ||
        skill.level.toLowerCase().includes(q);
      return matchesCategory && matchesQuery;
    });
  }, [allSkills, activeCategory, searchQuery]);

  return (
    <section className="section" id="skills">
      <div className="container">
        <ScrollReveal>
          <div className="section-header">
            <div className="section-tag">Engineering Arsenal</div>
            <h2 className="section-title">Technical Skills & Tooling</h2>
            <p className="section-subtitle">
              Responsive technology tiles detailing hands-on capabilities across languages, server frameworks, persistent stores, and cybersecurity coursework at VJTI Mumbai.
            </p>
          </div>
        </ScrollReveal>

        {/* Filter Bar & Search Input Row */}
        <ScrollReveal delay={100}>
          <div className="skills-controls-row">
            {/* Category Filter Tabs */}
            <div className="skills-filter-tabs" role="tablist" aria-label="Technology Categories">
              {filterTabs.map((tab) => {
                const count = tab.id === 'All' 
                  ? allSkills.length 
                  : allSkills.filter(s => s.category === tab.id).length;
                return (
                  <button
                    key={tab.id}
                    type="button"
                    role="tab"
                    aria-selected={activeCategory === tab.id}
                    className={`filter-tab-pill ${activeCategory === tab.id ? 'active' : ''}`}
                    onClick={() => setActiveCategory(tab.id)}
                  >
                    <span>{tab.label}</span>
                    <span className="tab-count-badge">{count}</span>
                  </button>
                );
              })}
            </div>

            {/* Live Search Input */}
            <div className="skills-search-wrapper">
              <Search size={16} className="search-icon" />
              <input
                type="text"
                className="skills-search-input"
                placeholder="Search tech, tools, or topics..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                aria-label="Search technologies"
              />
              {searchQuery && (
                <button
                  type="button"
                  className="search-clear-btn"
                  onClick={() => setSearchQuery('')}
                  aria-label="Clear search query"
                >
                  <X size={14} />
                </button>
              )}
            </div>
          </div>
        </ScrollReveal>

        {/* Results Counter / Status */}
        <div className="skills-results-status">
          <span>Showing {filteredSkills.length} of {allSkills.length} technologies</span>
          {(activeCategory !== 'All' || searchQuery) && (
            <button
              type="button"
              className="reset-filters-btn"
              onClick={() => {
                setActiveCategory('All');
                setSearchQuery('');
              }}
            >
              Reset Filters
            </button>
          )}
        </div>

        {/* Large Technology Cards Grid with Staggered Scroll Reveals */}
        {filteredSkills.length > 0 ? (
          <div className="large-tech-tiles-grid" role="list">
            {filteredSkills.map((skill, index) => (
              <ScrollReveal 
                key={`${skill.category}-${skill.name}`}
                delay={Math.min((index % 6) * 50, 300)}
              >
                <div 
                  className="large-tech-tile" 
                  role="listitem"
                  tabIndex={0}
                  aria-label={`${skill.name}, ${skill.level} in ${skill.category}`}
                >
                  <div className="tile-top-row">
                    <div className="tile-icon-bubble">
                      {getSkillIcon(skill.category, skill.name)}
                    </div>
                    <div className="tile-badge-group">
                      <span className="tile-category-label">
                        {skill.categoryShort}
                      </span>
                      <span className="tile-level-badge">
                        {skill.level}
                      </span>
                    </div>
                  </div>

                  <div className="tile-body">
                    <h3 className="tile-tech-name">{skill.name}</h3>
                    <p className="tile-context-note">
                      {skill.note}
                    </p>
                  </div>

                  <div className="tile-footer-accent">
                    <span className="tile-accent-indicator" />
                    <span className="tile-verified-tag">Hands-on VJTI Project / Coursework</span>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        ) : (
          /* Empty Search Results State */
          <div className="skills-empty-state">
            <Search size={32} color="#646A77" style={{ marginBottom: '12px' }} />
            <h4 style={{ fontSize: '1.2rem', marginBottom: '8px', color: '#FFFFFF' }}>No matching technologies found</h4>
            <p style={{ color: 'var(--text-secondary)', marginBottom: '18px' }}>
              No skills match "{searchQuery}" under the selected category.
            </p>
            <button
              type="button"
              className="btn btn-secondary btn-sm"
              onClick={() => {
                setActiveCategory('All');
                setSearchQuery('');
              }}
            >
              Clear Search & Reset Filters
            </button>
          </div>
        )}

        {/* Integrity Notice Banner */}
        <ScrollReveal delay={200}>
          <div className="skills-integrity-banner">
            <ShieldCheck size={24} color="#B8F36B" style={{ flexShrink: 0 }} />
            <p className="integrity-text">
              <strong>Honest Representation:</strong> All skills and technologies listed reflect hands-on coursework, labs, and practical project implementations at VJTI. Cybersecurity and AI capabilities reflect active academic study and local experimentation without claiming unverified certifications or inflated ratings.
            </p>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
