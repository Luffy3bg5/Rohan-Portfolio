import React, { useState, useRef, useEffect } from 'react';
import { Moon, Sun, Zap, Check, ChevronDown } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

const THEME_ICONS = {
  midnight: Moon,
  cyber: Zap,
  daylight: Sun,
};

export default function ThemeSwitcher({ mode = 'dropdown', className = '' }) {
  const { theme, setTheme, themes, currentThemeConfig } = useTheme();
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef(null);
  const triggerRef = useRef(null);

  // Close dropdown on outside click
  useEffect(() => {
    if (!isOpen) return;

    const handleClickOutside = (event) => {
      if (containerRef.current && !containerRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    const handleEscape = (event) => {
      if (event.key === 'Escape') {
        setIsOpen(false);
        triggerRef.current?.focus();
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('keydown', handleEscape);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleEscape);
    };
  }, [isOpen]);

  const CurrentIcon = THEME_ICONS[theme] || Moon;

  // Segmented mode (ideal for mobile menu or settings panels)
  if (mode === 'segmented') {
    return (
      <div 
        className={`theme-segmented-group ${className}`}
        role="radiogroup" 
        aria-label="Theme selector"
      >
        {themes.map((t) => {
          const Icon = THEME_ICONS[t.id] || Moon;
          const isSelected = theme === t.id;
          return (
            <button
              key={t.id}
              type="button"
              role="radio"
              aria-checked={isSelected}
              className={`theme-segment-btn ${isSelected ? 'active' : ''}`}
              onClick={() => setTheme(t.id)}
              aria-label={`${t.name}: ${t.description}`}
              title={`${t.name} (${t.description})`}
            >
              <span className="theme-segment-swatch" style={{ backgroundColor: t.accentColor }} aria-hidden="true" />
              <Icon size={14} className="theme-segment-icon" aria-hidden="true" />
              <span className="theme-segment-label">{t.shortName}</span>
              {isSelected && <Check size={12} className="theme-segment-check" aria-hidden="true" />}
            </button>
          );
        })}
      </div>
    );
  }

  // Dropdown mode (compact for desktop navbar)
  return (
    <div className={`theme-switcher-container ${className}`} ref={containerRef}>
      <button
        ref={triggerRef}
        type="button"
        className="theme-switcher-trigger"
        onClick={() => setIsOpen(!isOpen)}
        aria-haspopup="menu"
        aria-expanded={isOpen}
        aria-label={`Current theme: ${currentThemeConfig.name}. Click to change theme.`}
        title={`Theme: ${currentThemeConfig.name}`}
      >
        <span 
          className="theme-trigger-swatch" 
          style={{ backgroundColor: currentThemeConfig.accentColor }}
          aria-hidden="true" 
        />
        <CurrentIcon size={14} className="theme-trigger-icon" aria-hidden="true" />
        <span className="theme-trigger-label">{currentThemeConfig.shortName}</span>
        <ChevronDown 
          size={12} 
          className={`theme-trigger-chevron ${isOpen ? 'rotated' : ''}`} 
          aria-hidden="true" 
        />
      </button>

      {isOpen && (
        <div 
          className="theme-dropdown-menu" 
          role="menu" 
          aria-label="Theme options"
        >
          <div className="theme-dropdown-header">
            <span>Color Theme</span>
          </div>

          <div className="theme-dropdown-list">
            {themes.map((t) => {
              const Icon = THEME_ICONS[t.id] || Moon;
              const isSelected = theme === t.id;
              return (
                <button
                  key={t.id}
                  type="button"
                  role="menuitemradio"
                  aria-checked={isSelected}
                  className={`theme-option-btn ${isSelected ? 'active' : ''}`}
                  onClick={() => {
                    setTheme(t.id);
                    setIsOpen(false);
                    triggerRef.current?.focus();
                  }}
                >
                  <div className="theme-option-left">
                    <span 
                      className="theme-option-swatch" 
                      style={{ backgroundColor: t.accentColor }} 
                      aria-hidden="true" 
                    />
                    <div className="theme-option-icon-box">
                      <Icon size={14} aria-hidden="true" />
                    </div>
                    <div className="theme-option-text">
                      <span className="theme-option-name">{t.name}</span>
                      <span className="theme-option-desc">{t.description}</span>
                    </div>
                  </div>
                  {isSelected && (
                    <span className="theme-option-check">
                      <Check size={14} aria-hidden="true" />
                    </span>
                  )}
                </button>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
