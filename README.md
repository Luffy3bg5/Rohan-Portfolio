# Rohan Patil — Midnight Studio Developer Portfolio

> **"Building useful things at the intersection of software, AI, and security."**  
> Complete personal developer portfolio engineered with **React**, **Vite**, and **Vanilla CSS** under the **Midnight Studio** design system.

---

## 🎨 Visual Identity: Midnight Studio
- **Backgrounds:** Ultra-deep dark charcoal canvas (`#090A0D`, `#101217`, `#181B23`).
- **Accents:** Electric lime (`#B8F36B`) with subtle glowing ambient layers and clean divider lines.
- **Typography:** Large editorial headline typography pairing **Syne** (display), **Plus Jakarta Sans** (clean modern UI body), and **JetBrains Mono** (technical accents).
- **Structure:** Compact sticky navigation bar, fine studio grid lines, interactive project cards, filterable technical skills, leadership timeline, coursework metrics, and a printable modal resume.

---

## 🚀 Quick Start & Launch

### 1. Prerequisites
Ensure [Node.js](https://nodejs.org/) (v18+) is installed.

### 2. Install Dependencies
```bash
npm install
```

### 3. Run Development Server
```bash
npm run dev
```
The application will launch locally at `http://localhost:5173/`.

### 4. Build for Production
```bash
npm run build
```
Creates an optimized static bundle in the `dist/` directory ready for deployment on Vercel, Netlify, GitHub Pages, or Cloudflare Pages.

### 5. Preview Production Bundle
```bash
npm run preview
```

### 6. Lint Check
```bash
npm run lint
```

---

## 📁 Project Structure

```
Portfolio/
├── public/
│   ├── favicon.svg             # Custom branded RP / Midnight Studio SVG favicon
│   └── images/
│       ├── content-forge.jpg   # Content-Forge project interface banner
│       └── edukeeda.jpg        # Edukeeda student opportunities portal banner
├── src/
│   ├── components/
│   │   ├── Navbar.jsx          # Sticky glassmorphism nav with mobile drawer
│   │   ├── Hero.jsx            # Editorial headline, quick links, copyable contacts
│   │   ├── About.jsx           # Background at VJTI, engineering ethos, 3 core pillars
│   │   ├── Projects.jsx        # Featured projects (Content-Forge & Edukeeda)
│   │   ├── ProjectModal.jsx    # Architectural blueprint inspection modal
│   │   ├── Skills.jsx          # Categorized, filterable technical competencies
│   │   ├── Experience.jsx      # Leadership timeline (E-Cell & Enthusia at VJTI)
│   │   ├── Education.jsx       # VJTI B.Tech, Minor in Cyber, MHT-CET, Coursework
│   │   ├── BeyondCoding.jsx    # Kabaddi athletics, Reading, and Sketching
│   │   ├── Contact.jsx         # 1-click clipboard copy + interactive message form
│   │   ├── ResumeModal.jsx     # Printable CV view + plaintext copy
│   │   ├── Footer.jsx          # Studio footer with jump links and back-to-top
│   │   └── Icons.jsx           # Pristine SVG icons for GitHub and LinkedIn
│   ├── data/
│   │   └── portfolioData.js    # Single source of truth for all content & links
│   ├── App.css                 # Comprehensive Midnight Studio component styles
│   ├── index.css               # Core CSS design system, variables & tokens
│   ├── App.jsx                 # Root layout wire-up
│   └── main.jsx                # React root mount
├── index.html                  # SEO metadata, Google Fonts, theme color
├── package.json
└── vite.config.js
```

---

## ✏️ How to Edit Content

All portfolio information is centralized in [`src/data/portfolioData.js`](src/data/portfolioData.js):
- **LinkedIn Profile:** Replace the placeholder `https://linkedin.com/in/rohan-patil-placeholder` with your verified handle.
- **Projects:** Add or edit project descriptions, tags, highlights, and repository links.
- **Skills & Coursework:** Easily adjust categories, competencies, and coursework takeaways.
- **Contact Info:** Update email or phone number in one place.

---

## 🛡️ Content Integrity
- Sourced purely from verified academic and project credentials.
- B.Tech in Computer Engineering with Minor in Cybersecurity at VJTI Mumbai (2024–2028).
- MHT-CET: 99.81 percentile (Rank 437) | JEE-Mains: 92.82 percentile.
- No invented URLs, testimonials, or certifications.
