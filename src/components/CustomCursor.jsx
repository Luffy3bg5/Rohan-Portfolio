import React, { useEffect, useRef } from 'react';

/**
 * CustomCursor Component
 * Midnight Studio aesthetic: Small lime-green dot with soft glow + translucent outer ring.
 * - Hardware-accelerated with requestAnimationFrame (0 React re-renders on pointer movement).
 * - Subtle magnetic attraction on primary buttons and project action links.
 * - Smooth contextual scaling on cards, tiles, and navigation links.
 * - Full accessibility: strictly fine-pointer only (no touch/mobile), respects prefers-reduced-motion,
 *   pointer-events: none, text inputs retain native text caret.
 */
export default function CustomCursor() {
  const dotRef = useRef(null);
  const ringRef = useRef(null);
  const containerRef = useRef(null);

  useEffect(() => {
    // Only enable on devices with hover and fine pointer (mouse/trackpad)
    if (typeof window === 'undefined') return;

    const finePointerQuery = window.matchMedia('(hover: hover) and (pointer: fine)');
    const reducedMotionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');

    if (!finePointerQuery.matches || reducedMotionQuery.matches) {
      return;
    }

    const dotEl = dotRef.current;
    const ringEl = ringRef.current;
    const containerEl = containerRef.current;
    if (!dotEl || !ringEl || !containerEl) return;

    // Animation & Position state held in mutable refs (zero re-renders)
    let animationFrameId = null;
    let isVisible = false;
    let mouseX = -100;
    let mouseY = -100;
    let ringX = -100;
    let ringY = -100;
    let currentMagneticEl = null;

    // Cursor interaction modes: 'default' | 'hover' | 'magnetic' | 'card' | 'text'
    let currentMode = 'default';

    const LERP_FACTOR = 0.18;

    const handlePointerMove = (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;

      if (!isVisible) {
        isVisible = true;
        ringX = mouseX;
        ringY = mouseY;
        containerEl.style.opacity = '1';
        document.body.classList.add('has-custom-cursor');
      }

      // Check hovered element hierarchy
      const target = e.target;
      if (!target) return;

      // 1. Text inputs: suppress custom cursor and let native text caret show
      const isTextInput = target.closest('input, textarea, [contenteditable="true"]');
      if (isTextInput) {
        if (currentMode !== 'text') {
          currentMode = 'text';
          ringEl.className = 'cursor-ring cursor-ring-hidden';
          dotEl.className = 'cursor-dot cursor-dot-hidden';
        }
        return;
      }

      // 2. Magnetic Interactive Targets: Primary buttons, Project actions, Modals
      const magneticTarget = target.closest(
        '.btn-primary, .btn-secondary, .project-card-actions a, .project-card-actions button, .modal-close-btn'
      );

      if (magneticTarget) {
        currentMode = 'magnetic';
        ringEl.className = 'cursor-ring cursor-magnetic';
        dotEl.className = 'cursor-dot';

        if (currentMagneticEl && currentMagneticEl !== magneticTarget) {
          currentMagneticEl.style.transform = '';
        }
        currentMagneticEl = magneticTarget;

        const rect = magneticTarget.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;
        const deltaX = mouseX - centerX;
        const deltaY = mouseY - centerY;

        // Subtle tactile pull on button (max ~4px)
        magneticTarget.style.transform = `translate3d(${deltaX * 0.12}px, ${deltaY * 0.12}px, 0)`;
        return;
      }

      // Release previous magnetic element if any
      if (currentMagneticEl) {
        currentMagneticEl.style.transform = '';
        currentMagneticEl = null;
      }

      // 3. Project Cards: Tasteful larger overview hover state
      const cardTarget = target.closest('.distinct-project-card, .timeline-card-content, .pillar-card');
      if (cardTarget) {
        currentMode = 'card';
        ringEl.className = 'cursor-ring cursor-card';
        dotEl.className = 'cursor-dot';
        return;
      }

      // 4. Standard Interactive Targets: Nav links, Skill tiles, Tags, Buttons
      const interactiveTarget = target.closest(
        'a, button, [role="button"], .nav-link, .mobile-nav-link, .tech-card, .tech-tile-tag, .filter-tab-pill, .filter-tab, .console-tab-btn, .social-link, .copy-mini-btn, .interest-chip'
      );

      if (interactiveTarget) {
        currentMode = 'hover';
        ringEl.className = 'cursor-ring cursor-hover';
        dotEl.className = 'cursor-dot cursor-dot-hover';
        return;
      }

      // 5. Default State
      if (currentMode !== 'default') {
        currentMode = 'default';
        ringEl.className = 'cursor-ring';
        dotEl.className = 'cursor-dot';
      }
    };

    const handlePointerLeave = () => {
      isVisible = false;
      containerEl.style.opacity = '0';
      if (currentMagneticEl) {
        currentMagneticEl.style.transform = '';
        currentMagneticEl = null;
      }
    };

    const handlePointerEnter = () => {
      if (mouseX > 0 && mouseY > 0) {
        isVisible = true;
        containerEl.style.opacity = '1';
      }
    };

    // Main 60fps/120fps Animation Loop with linear interpolation
    const render = () => {
      if (isVisible) {
        let targetRingX = mouseX;
        let targetRingY = mouseY;

        // In magnetic mode, pull ring towards the center of the magnetic button
        if (currentMode === 'magnetic' && currentMagneticEl) {
          const rect = currentMagneticEl.getBoundingClientRect();
          const centerX = rect.left + rect.width / 2;
          const centerY = rect.top + rect.height / 2;
          const deltaX = mouseX - centerX;
          const deltaY = mouseY - centerY;

          targetRingX = centerX + deltaX * 0.3;
          targetRingY = centerY + deltaY * 0.3;
        }

        // Smooth easing lerp for outer ring
        ringX += (targetRingX - ringX) * LERP_FACTOR;
        ringY += (targetRingY - ringY) * LERP_FACTOR;

        // Apply hardware-accelerated transforms
        dotEl.style.transform = `translate3d(${mouseX}px, ${mouseY}px, 0) translate(-50%, -50%)`;
        ringEl.style.transform = `translate3d(${ringX.toFixed(2)}px, ${ringY.toFixed(2)}px, 0) translate(-50%, -50%)`;
      }

      animationFrameId = requestAnimationFrame(render);
    };

    animationFrameId = requestAnimationFrame(render);

    window.addEventListener('pointermove', handlePointerMove, { passive: true });
    document.documentElement.addEventListener('mouseleave', handlePointerLeave);
    document.documentElement.addEventListener('mouseenter', handlePointerEnter);

    // Dynamic listeners for media queries
    const handleDeviceChange = (e) => {
      if (!e.matches) {
        document.body.classList.remove('has-custom-cursor');
        if (containerEl) containerEl.style.opacity = '0';
      }
    };

    const handleReducedMotionChange = (e) => {
      if (e.matches) {
        document.body.classList.remove('has-custom-cursor');
        if (containerEl) containerEl.style.opacity = '0';
      }
    };

    finePointerQuery.addEventListener('change', handleDeviceChange);
    reducedMotionQuery.addEventListener('change', handleReducedMotionChange);

    return () => {
      if (animationFrameId) cancelAnimationFrame(animationFrameId);
      window.removeEventListener('pointermove', handlePointerMove);
      document.documentElement.removeEventListener('mouseleave', handlePointerLeave);
      document.documentElement.removeEventListener('mouseenter', handlePointerEnter);
      finePointerQuery.removeEventListener('change', handleDeviceChange);
      reducedMotionQuery.removeEventListener('change', handleReducedMotionChange);
      document.body.classList.remove('has-custom-cursor');
      if (currentMagneticEl) {
        currentMagneticEl.style.transform = '';
      }
    };
  }, []);

  return (
    <div 
      ref={containerRef} 
      className="custom-cursor-container" 
      aria-hidden="true"
      style={{ opacity: 0 }}
    >
      <div ref={ringRef} className="cursor-ring" />
      <div ref={dotRef} className="cursor-dot" />
    </div>
  );
}
