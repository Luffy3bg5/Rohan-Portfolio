import React, { useState } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Projects from './components/Projects';
import Skills from './components/Skills';
import Timeline from './components/Timeline';
import BeyondCoding from './components/BeyondCoding';
import Contact from './components/Contact';
import Footer from './components/Footer';
import ResumeModal from './components/ResumeModal';
import CustomCursor from './components/CustomCursor';
import CinematicIntro from './components/CinematicIntro';
import { ThemeProvider } from './context/ThemeContext';
import './App.css';

export default function App() {
  const [isResumeOpen, setIsResumeOpen] = useState(false);
  const [introExiting, setIntroExiting] = useState(false);
  const [showIntro, setShowIntro] = useState(() => {
    if (typeof window === 'undefined') return false;
    try {
      const params = new URLSearchParams(window.location.search);
      if (params.get('intro') === 'true') return true;
      return !sessionStorage.getItem('rohan_portfolio_intro_seen');
    } catch (e) {
      return false;
    }
  });

  const handleIntroComplete = () => {
    setShowIntro(false);
    setIntroExiting(false);
    try {
      sessionStorage.setItem('rohan_portfolio_intro_seen', 'true');
    } catch (e) {}
  };

  return (
    <ThemeProvider>
      {/* Cinematic Animated Introduction Overlay */}
      {showIntro && (
        <CinematicIntro 
          onStartExit={() => setIntroExiting(true)} 
          onComplete={handleIntroComplete} 
        />
      )}

      <div className={`portfolio-app ${showIntro && !introExiting ? 'portfolio-behind-intro' : ''} ${introExiting ? 'portfolio-revealing' : ''}`}>
      {/* Subtle Studio Custom Cursor (Fine-Pointer Only) */}
      <CustomCursor />

      {/* Navigation with slim progress indicator */}
      <Navbar onOpenResume={() => setIsResumeOpen(true)} />

      {/* Main Content Sections */}
      <main id="main-content">
        <Hero onOpenResume={() => setIsResumeOpen(true)} />
        
        <hr className="studio-divider" />
        <About />

        <hr className="studio-divider" />
        <Projects />

        <hr className="studio-divider" />
        <Skills />

        <hr className="studio-divider" />
        <Timeline />

        <hr className="studio-divider" />
        <BeyondCoding />

        <hr className="studio-divider" />
        <Contact />
      </main>

      {/* Footer */}
      <Footer onOpenResume={() => setIsResumeOpen(true)} />

      {/* Resume Viewer / Print Modal */}
      {isResumeOpen && (
        <ResumeModal onClose={() => setIsResumeOpen(false)} />
      )}
      </div>
    </ThemeProvider>
  );
}
