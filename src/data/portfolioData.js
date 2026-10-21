/**
 * Rohan Patil - Portfolio Data Configuration
 * Midnight Studio Theme
 * 
 * All details are sourced directly from Rohan's verified resume.
 * Easily update links, text, or projects below.
 */

export const personalInfo = {
  name: "Rohan Patil",
  brandName: "RP // MIDNIGHT STUDIO",
  headline: "Building useful things at the intersection of software, AI, and security.",
  role: "Computer Engineering Student, Full-Stack Developer & AI Enthusiast",
  subrole: "Undergraduate at VJTI Mumbai (Class of 2028)",
  college: "Veermata Jijabai Technological Institute (VJTI), Mumbai",
  degree: "B.Tech in Computer Engineering with Minor in Cybersecurity",
  graduationYear: "2028",
  duration: "2024 – 2028",
  location: "Mumbai, Maharashtra, India",
  email: "itzrohan7744@gmail.com",
  phone: "+91 7744804203",
  status: "VJTI '28 • Open to Summer Internships & Collaborations",
  
  // Social & professional links (clearly marked placeholders where applicable)
  links: {
    github: "https://github.com/Luffy3bg5",
    linkedin: "https://www.linkedin.com/in/rohan-patil-08b95431a", 
    linkedinIsPlaceholder: false,
    emailMailto: "mailto:itzrohan7744@gmail.com",
    phoneTel: "tel:+917744804203"
  },

  bio: [
    "I am a Computer Engineering undergraduate at Veermata Jijabai Technological Institute (VJTI), Mumbai, pursuing a Minor in Cybersecurity. My work is focused on building dependable full-stack applications, integrating intelligent AI workflows, and applying sound security fundamentals.",
    "From engineering automated content pipelines with Gemini AI and local Stable Diffusion setups to building protected REST API services with Node.js and MongoDB, I enjoy turning technical challenges into clean, well-architected software."
  ]
};

export const stats = [
  { label: "Institution", value: "VJTI Mumbai", detail: "Premier engineering college" },
  { label: "MHT-CET Percentile", value: "99.81%ile", detail: "State Rank 437" },
  { label: "Academic Focus", value: "Comp Eng + Cyber", detail: "Graduation Expected 2028" }
];

export const projects = [
  {
    id: "content-forge",
    title: "Content-Forge",
    tagline: "Full-Stack AI Content Creation & Scheduling Pipeline",
    shortDescription: "A full-stack application for creating, managing, and scheduling Instagram content with automated multi-modal AI generation.",
    fullDescription: "Content-Forge is an end-to-end platform engineered to streamline digital content workflows. It merges text intelligence via Google's Gemini AI with on-premise visual generation powered by ComfyUI and Stable Diffusion, providing a scheduled, media-ready queue for social media creators.",
    role: "Full-Stack Developer",
    featured: true,
    image: "/images/content-forge.jpg",
    tags: ["JavaScript", "Node.js", "Express.js", "MongoDB", "JWT Auth", "Gemini AI", "YouTube API", "ComfyUI", "Stable Diffusion"],
    highlights: [
      "Gemini AI Integration: Automated structured prompt engineering and engaging caption synthesis.",
      "Local Diffusion Pipeline: Interfaced with local ComfyUI and Stable Diffusion instances for high-fidelity asset generation without third-party API fees.",
      "YouTube API Sourcing: Automated retrieval of trending topics, metadata, and reference media.",
      "Secure Backend & State: Node.js/Express REST server with JWT token-based auth, guarded endpoints, and MongoDB post scheduling collections.",
      "Workflow Scheduling: Queue management for timed drafts, approvals, and media releases."
    ],
    architecture: {
      client: "Modern responsive web dashboard with interactive prompt nodes and calendar queue",
      server: "Node.js & Express RESTful API with route-level middleware and JWT verification",
      aiEngine: "Hybrid engine: Cloud LLM (Gemini API) + Local Neural Generation (ComfyUI / Stable Diffusion)",
      database: "MongoDB for post schemas, user profiles, and queued execution logs"
    },
    links: {
      githubProfile: "https://github.com/Luffy3bg5",
      repoUrl: null, // Set to repository URL when published publicly
      demoUrl: null, // Set to live deployment URL when hosted
      statusText: "Code available upon request"
    }
  },
  {
    id: "edukeeda",
    title: "Edukeeda",
    tagline: "Student Opportunities Portal — Backend Architecture",
    shortDescription: "A centralized platform curating hackathons, scholarships, internships, and cultural events with secured REST API endpoints.",
    fullDescription: "Edukeeda addresses the fragmentation students face when searching for growth opportunities. Rohan engineered the backend services that organize, validate, and serve listings across hackathons, scholarships, internships, and cultural fests with strict authentication and role guards.",
    role: "Backend Developer",
    featured: true,
    image: "/images/edukeeda.jpg",
    tags: ["Node.js", "Express.js", "MongoDB", "JWT Authentication", "REST APIs", "JavaScript"],
    highlights: [
      "RESTful API Design: Clean, resource-oriented endpoint architecture for multi-category opportunities.",
      "Robust Protected Routes: Custom JWT middleware verifying headers, protecting admin submissions, and enforcing user sessions.",
      "Data Modeling: Flexible MongoDB schemas handling diverse opportunity parameters, deadlines, and eligibility criteria.",
      "Middleware & Error Handling: Centralized request validation, graceful error pipelines, and sanitized responses."
    ],
    architecture: {
      server: "Express.js application modularized into routers, controllers, and services",
      security: "JWT header verification, input sanitization, and protected route handlers",
      database: "MongoDB with Mongoose schemas and compound indexing on deadlines & categories",
      apiDesign: "Standardized JSON envelopes with error codes and pagination support"
    },
    links: {
      githubProfile: "https://github.com/Luffy3bg5",
      repoUrl: null, // Set to repository URL when published publicly
      demoUrl: null, // Set to live deployment URL when hosted
      statusText: "Code available upon request"
    }
  }
];

export const skillCategories = [
  {
    category: "Languages",
    description: "Core programming languages for algorithmic problem solving and system development.",
    skills: [
      { name: "C++", level: "Core", note: "Data structures, algorithms & high-performance foundations" },
      { name: "Python", level: "Core", note: "Scripting, automation & AI workflows" },
      { name: "JavaScript", level: "Proficient", note: "Full-stack asynchronous modern JS (ES6+)" },
      { name: "HTML5", level: "Proficient", note: "Semantic structure & accessible markup" },
      { name: "CSS3", level: "Proficient", note: "Custom layouts, Flexbox, Grid & dark UI styling" }
    ]
  },
  {
    category: "Backend & Databases",
    description: "Server architectures, REST APIs, session management, and persistent data stores.",
    skills: [
      { name: "Node.js", level: "Backend", note: "Event-driven runtime for scalable server logic" },
      { name: "Express.js", level: "Backend", note: "RESTful API routing, middleware & handlers" },
      { name: "MongoDB", level: "Database", note: "NoSQL document storage & schema design" },
      { name: "MySQL", level: "Database", note: "Relational database schema design & SQL querying" }
    ]
  },
  {
    category: "Developer Tools & Workflows",
    description: "Version control, API testing, authorization mechanisms, and local environments.",
    skills: [
      { name: "Git", level: "Version Control", note: "Branch management, rebasing & commit history" },
      { name: "GitHub", level: "Collaboration", note: "Open-source tracking & remote repositories" },
      { name: "VS Code", level: "Editor", note: "Custom workspace, debugging & extension setups" },
      { name: "Postman", level: "API Testing", note: "Endpoint validation, auth testing & request suites" },
      { name: "JWT", level: "Security", note: "JSON Web Tokens, session payloads & bearer auth" }
    ]
  },
  {
    category: "Areas of Exploration & Study",
    description: "Key domains pursued through academic coursework and practical experiments without unverified certifications.",
    skills: [
      { name: "Cybersecurity Minor", level: "Academic", note: "Active minor at VJTI Mumbai covering modern cryptography & security concepts" },
      { name: "Modern Cryptography", level: "Coursework", note: "Ciphers, hashing, public-key primitives & data integrity" },
      { name: "AI & LLM Integration", level: "Practical", note: "Prompt engineering, Gemini API integrations & automated assistants" },
      { name: "Local Neural Generation", level: "Exploration", note: "ComfyUI node-based workflows and Stable Diffusion models" }
    ]
  }
];

export const experienceAndLeadership = [
  {
    organization: "E-Cell, VJTI",
    role: "Department Head",
    tenure: "2024 – 2025",
    type: "Leadership",
    location: "VJTI Mumbai",
    points: [
      "Led departmental operations at the Entrepreneurship Cell of VJTI Mumbai, promoting student-led innovation and startup culture.",
      "Coordinated campus entrepreneurship initiatives, structured workshops, and managed cross-functional student teams.",
      "Facilitated industry speaker sessions and startup bootcamps connecting students with experienced founders."
    ]
  },
  {
    organization: "Enthusia, VJTI",
    role: "Event Coordinator",
    tenure: "College Term",
    type: "Coordination",
    location: "VJTI Mumbai",
    points: [
      "Served as Event Coordinator for Enthusia, the annual sports and cultural festival of VJTI Mumbai.",
      "Organized tournament schedules, handled participant logistics, and coordinated ground operations.",
      "Collaborated across committees to execute large-scale student participation seamlessly."
    ]
  }
];

export const educationHistory = [
  {
    institution: "Veermata Jijabai Technological Institute (VJTI), Mumbai",
    degree: "B.Tech in Computer Engineering",
    minor: "Minor in Cybersecurity",
    period: "2024 – 2028",
    status: "Currently Pursuing (Expected Graduation: 2028)",
    description: "One of India's oldest and most prestigious engineering institutions. Rigorous curriculum blending theoretical computer science, systems engineering, and dedicated cybersecurity coursework.",
    metrics: [
      { label: "MHT-CET Percentile", value: "99.81%ile", detail: "State Rank 437" }
    ]
  },
  {
    institution: "Shraddha College",
    degree: "Higher Secondary Education / Pre-Engineering",
    period: "2024",
    status: "Completed",
    description: "Foundation in Mathematics, Physics, and Chemistry leading to competitive entrance exam accomplishments."
  }
];

export const courseworkList = [
  {
    code: "CS-01",
    name: "Data Structures",
    topics: "Arrays, Linked Lists, Trees, Heaps, Graphs, Hashing, Space-Time Complexity",
    application: "Core algorithmic optimization and memory-efficient data representation."
  },
  {
    code: "CS-02",
    name: "Database Management",
    topics: "Relational Models, SQL, Normalization, ACID Transactions, Indexing, NoSQL Concepts",
    application: "Designing reliable storage architectures in MySQL and MongoDB."
  },
  {
    code: "CS-03",
    name: "Operating Systems",
    topics: "Process Management, Threads, CPU Scheduling, Deadlocks, Virtual Memory, File Systems",
    application: "Understanding system calls, concurrency, and resource constraints."
  },
  {
    code: "CS-04",
    name: "Theory of Computation",
    topics: "Finite Automata, Regular Languages, Context-Free Grammars, Turing Machines, Decidability",
    application: "Formal limits of computation, automata parsing, and grammar designs."
  },
  {
    code: "CS-05",
    name: "Algorithm Analysis",
    topics: "Divide & Conquer, Greedy Paradigms, Dynamic Programming, Graph Traversal, NP-Completeness",
    application: "Evaluating worst-case bounds and designing performant solutions."
  },
  {
    code: "CS-06",
    name: "Artificial Intelligence",
    topics: "Heuristic Search, Knowledge Representation, Probability Models, Machine Learning Foundations",
    application: "Integrating intelligent reasoning and generative AI pipelines."
  },
  {
    code: "SEC-01",
    name: "Modern Cryptography",
    topics: "Symmetric Ciphers (AES), Asymmetric Key Crypto (RSA/ECC), Hash Functions (SHA), Digital Signatures",
    application: "Securing web endpoints, digital identity verification, and token protection."
  }
];

export const beyondCoding = {
  sports: {
    title: "Competitive Kabaddi",
    badge: "College Athlete",
    description: "Represented college in competitive Kabaddi tournaments.",
    takeaways: [
      "High-pressure split-second decision making under rapid game clocks.",
      "Team coordination, defensive synchronization, and unyielding discipline.",
      "Physical agility and mental stamina transferred into high-intensity engineering work."
    ]
  },
  hobbies: [
    {
      title: "Reading",
      badge: "Inquiry & Knowledge",
      description: "Exploring books and papers on computing history, technology architecture, systems design, and science.",
      focus: "Deepens contextual thinking and gives broader appreciation for technical evolution."
    },
    {
      title: "Sketching",
      badge: "Visual Composition",
      description: "Practicing pencil sketching and structural perspective drawings.",
      focus: "Nurtures attention to detail, symmetry, visual balance, and user interface sensitivity."
    }
  ]
};
