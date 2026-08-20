import React, { useRef, useState, useEffect } from "react";
import "./App.css";
import TickerBar from "./components/TickerBar";
import Terminal from "./components/Terminal";
import CandlestickBackground from "./components/CandlestickBackground";

const sections = [
  { id: "about", label: "About", num: "01" },
  { id: "experience", label: "Experience", num: "02" },
  { id: "projects", label: "Projects", num: "03" },
  { id: "contact", label: "Contact", num: "04" },
];

const experiences = [
  {
    logo: "/ally.jpg",
    position: "Software Engineering Intern",
    company: "Ally Financial · Charlotte, NC",
    timeframe: "Summer 2026",
    details: [
      "Developed and integrated a custom, lightweight telemetry package into Ally's auto platform across React-based web and mobile applications, capturing and transmitting real-time user interaction data to drive informed product enhancements.",
      "Architected an end-to-end AWS data pipeline to establish reliable ingestion endpoints, ingesting and analyzing over 3,500 telemetry events a minute, using Kong, S3, Lambda, API Gateway, EventBridge, RDS (Postgres), Snowflake, and Terraform.",
      "Engineered a secure backend routing system featuring automated PII redaction to process ingested user data and generate personalized campaigns to reduce financial overhead and improve the financial state of its customers.",
    ],
  },
  {
    logo: "/statefarmlogo.png",
    position: "Information Security Intern",
    company: "State Farm · Richardson, TX",
    timeframe: "Summer 2025",
    details: [
      "Designed and developed multi-level employee review software for use by Executives using AWS Lambda, DynamoDB, S3, Kinesis, Athena, Glue, and Terraform to streamline and enhance security protocols within the enterprise.",
      "Contributed to the front-end development of a business-critical internal Web Application built in AngularJS, HTML/CSS, and TypeScript to enhance user experience and deliver new functionality that facilitated improvement in business operations.",
      "Developed robust Python and Node.js scripts to generate custom datasets, facilitating data exploration and analysis within internal tools and services.",
      "Rewarded with the Good Act Award by management for my adaptability, willingness to learn, and innovation.",
    ],
  },
];

const extracurriculars = [
  {
    logo: "/awslogo.png",
    position: "AWS Machine Learning Fundamentals Nanodegree",
    company: "Amazon Web Services / Udacity · Remote",
    timeframe: "Apr 2024 – Aug 2024",
    details: [
      "Used Python and AutoGluon to preprocess tabular data and generate models that predict bike sharing demand.",
      "Designed and trained a Multi-layer Perceptron Neural Network to classify handwritten digits from the MNIST dataset using Python and PyTorch.",
      "Constructed a Convolutional Neural Network that classified landmarks and packaged the model for a sample application.",
      "Orchestrated a serverless machine learning pipeline using AWS Step Functions to trigger Lambda for data preprocessing, trained image classification models with SageMaker, and stored artifacts in an S3 bucket.",
      "Designed and trained a Multi-layer Perceptron Neural Network using Python and PyTorch to classify plants and flowers.",
      "Gained in-depth career and technical knowledge from a mentor at AWS.",
    ],
  },
  {
    logo: "/longhorndevlopers.jpeg",
    position: "UT Registration Plus Developer",
    company: "Longhorn Developers · UT Austin",
    timeframe: "Oct 2024 – Present",
    details: [
      "Improving and developing new features for UT's registration tool, used by over 60,000 students every year.",
    ],
  },
  {
    logo: "/acm.png",
    position: "Member",
    company: "Association for Computing Machinery · UT Austin",
    timeframe: "Aug 2024 – Present",
    details: [
      "Attended workshops and events that deepened my understanding of the field and broadened my interests.",
    ],
  },
];

const projects = [
  {
    title: "Predictive Market Bots",
    status: "Live",
    image: "/webull.png",
    description:
      "Designed and deployed prediction market bots that trade crypto, sports, and weather on Kalshi using arbitrage and straddle strategies — delivering an 87% win rate since going live. Self-hosted on a Raspberry Pi running 24/7 to scan markets for profitable opportunities.",
    link: null,
    tags: ["Python", "Kalshi", "Trading", "Raspberry Pi"],
  },
  {
    title: "FinMe",
    status: "Live",
    image: "/finmedemo.png",
    description:
      "Company analysis and reporting website hosted on Vercel. Built with React and REST APIs, backed by Supabase with PostgreSQL row-level security, a custom queuing system, and automated scripting.",
    link: "https://github.com/ParthM02/FinMe",
    tags: ["React", "Supabase", "PostgreSQL", "Vercel"],
  },
  {
    title: "Pintos",
    status: "Complete",
    image: "/virtualmemory.png",
    description:
      "Expanded a simple operating system to include priority scheduling, argument passing, system calls, virtual memory, and a multi-threaded multi-level indexed file system — all in C.",
    link: null,
    tags: ["C", "Operating Systems", "Systems"],
  },
];

const skills = {
  AWS: ["S3", "Lambda", "DynamoDB", "Kinesis", "Athena", "Glue", "SageMaker", "Step Functions"],
  Languages: ["Python", "Java", "C", "Swift", "React", "AngularJS", "TypeScript", "JavaScript", "HTML/CSS", "Terraform", "SQL", "R"],
  Additional: ["Git", "REST APIs", "Linux", "Agile", "CI/CD", "Data Analytics", "Information Security"],
};

function App() {
  const aboutRef = useRef(null);
  const experienceRef = useRef(null);
  const projectsRef = useRef(null);
  const contactRef = useRef(null);

  const sectionRefMap = {
    about: aboutRef,
    experience: experienceRef,
    projects: projectsRef,
    contact: contactRef,
  };

  const [activeSection, setActiveSection] = useState("about");
  const [navScrolled, setNavScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setNavScrolled(window.scrollY > 40);
      const scrollPosition = window.scrollY + window.innerHeight / 3;
      let currentActive = "about";
      for (const sec of sections) {
        const ref = sectionRefMap[sec.id].current;
        if (ref && ref.offsetTop <= scrollPosition) {
          currentActive = sec.id;
        }
      }
      setActiveSection(currentActive);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const scrollToSection = (id) => {
    sectionRefMap[id].current?.scrollIntoView({ behavior: "smooth" });
  };

  function getGreeting() {
    const hour = new Date().getHours();
    if (hour < 12) return "Good morning";
    if (hour < 18) return "Good afternoon";
    return "Good evening";
  }

  return (
    <div className="site">
      <CandlestickBackground />
      <div className="grid-bg" aria-hidden="true" />
      <TickerBar />

      <nav className={`navbar ${navScrolled ? "scrolled" : ""}`}>
        <div className="navbar-brand" onClick={() => scrollToSection("about")}>
          <span className="brand-symbol">⟨⟩</span>
          <span className="brand-name">Parth Mehta</span>
        </div>
        <div className="navbar-links">
          {sections.map((sec) => (
            <button
              key={sec.id}
              className={`nav-link ${activeSection === sec.id ? "active" : ""}`}
              onClick={() => scrollToSection(sec.id)}
            >
              <span className="nav-num">{sec.num}</span>
              {sec.label}
            </button>
          ))}
        </div>
        <div className="navbar-actions">
          <a
            href="/resume.pdf"
            className="btn-outline"
            download
            target="_blank"
            rel="noopener noreferrer"
          >
            Resume
          </a>
          <a
            href="https://github.com/ParthM02"
            className="btn-ghost"
            target="_blank"
            rel="noopener noreferrer"
          >
            GitHub
          </a>
        </div>
      </nav>

      {/* Hero / About */}
      <section
        id="about"
        ref={aboutRef}
        className="section hero-section"
      >
        <div className="hero-content">
          <div className="hero-left">
            <div className="hero-badge">
              <span className="pulse-dot" />
              MARKET OPEN — SWE INTERN @ ALLY FINANCIAL '26
            </div>
            <h1 className="hero-title">
              {getGreeting()},<br />
              I'm <span className="gradient-text">Parth</span>
            </h1>
            <p className="hero-subtitle">
              CS @ UT Austin · SWE Intern @ Ally Financial · Austin, TX
            </p>
            <p className="hero-bio">
              Computer Science student with a minor in Statistics and Data Science.
              I build production systems on AWS, ship React applications at scale, and
              develop quantitative trading strategies — from telemetry pipelines ingesting
              thousands of events per minute to prediction market bots running 24/7.
            </p>
            <div className="hero-actions">
              <button className="btn-primary" onClick={() => scrollToSection("projects")}>
                View Projects →
              </button>
              <button className="btn-outline" onClick={() => scrollToSection("contact")}>
                Get in Touch
              </button>
            </div>
            <div className="hero-profile">
              <img src="/headshot.jpeg" alt="Parth Mehta" className="profile-img" />
              <div className="profile-meta">
                <span className="profile-name">Parth Mehta</span>
                <span className="profile-role">Software Engineer · Quant &amp; ML</span>
              </div>
            </div>
          </div>

          <div className="hero-right">
            <Terminal />
          </div>
        </div>

        <div className="about-grid">
          <div className="panel skills-panel">
            <div className="panel-header">
              <span className="panel-label">{'// SKILLS'}</span>
            </div>
            {Object.entries(skills).map(([category, items]) => (
              <div key={category} className="skill-group">
                <h4>{category}</h4>
                <div className="skill-tags">
                  {items.map((skill) => (
                    <span key={skill} className="skill-tag">{skill}</span>
                  ))}
                </div>
              </div>
            ))}
          </div>

          <div className="panel education-panel">
            <div className="panel-header">
              <span className="panel-label">{'// EDUCATION'}</span>
            </div>
            <div className="edu-header">
              <img src="/utlogo.png" alt="UT Austin" className="edu-logo" />
              <div>
                <div className="edu-degree">B.S. Computer Science</div>
                <div className="edu-school">The University of Texas at Austin</div>
                <div className="edu-minor">Minor in Statistics and Data Science</div>
              </div>
            </div>
            <div className="edu-details">
              <div className="edu-row">
                <span className="edu-key">Graduation</span>
                <span className="edu-val">May 2028</span>
              </div>
              <div className="edu-row">
                <span className="edu-key">Coursework</span>
                <span className="edu-val">
                  Algorithms, Data Structures, Computer Architecture, Operating Systems, Discrete Math, Statistics, Statistical Machine Learning, Linear Algebra, Data Science, Algorithms and Complexity, Neural Networks, Artificial Intelligence
                </span>
              </div>
              <div className="edu-row">
                <span className="edu-key">Organizations</span>
                <span className="edu-val">Longhorn Developers, Association for Computing Machinery (ACM)</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Experience */}
      <section
        id="experience"
        ref={experienceRef}
        className="section"
      >
        <div className="section-header">
          <span className="section-num">02</span>
          <h2 className="section-title">Experience</h2>
          <div className="section-line" />
        </div>
        <div className="experience-timeline">
          {experiences.map((exp, i) => (
            <div key={i} className="exp-card">
              <div className="exp-card-glow" />
              <div className="exp-header">
                {exp.logo ? (
                  <img src={exp.logo} alt={exp.company} className="exp-logo" />
                ) : (
                  <div className="exp-logo exp-logo-fallback">{exp.initials}</div>
                )}
                <div className="exp-title-block">
                  <h3>{exp.position}</h3>
                  <span className="exp-company">{exp.company}</span>
                </div>
                <span className="exp-date">{exp.timeframe}</span>
              </div>
              <ul className="exp-details">
                {exp.details.map((detail, j) => (
                  <li key={j}>{detail}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="subsection-header">
          <h3 className="subsection-title">Extracurriculars</h3>
        </div>
        <div className="experience-timeline">
          {extracurriculars.map((exp, i) => (
            <div key={i} className="exp-card">
              <div className="exp-card-glow" />
              <div className="exp-header">
                {exp.logo ? (
                  <img src={exp.logo} alt={exp.company} className="exp-logo" />
                ) : (
                  <div className="exp-logo exp-logo-fallback">{exp.initials}</div>
                )}
                <div className="exp-title-block">
                  <h3>{exp.position}</h3>
                  <span className="exp-company">{exp.company}</span>
                </div>
                <span className="exp-date">{exp.timeframe}</span>
              </div>
              <ul className="exp-details">
                {exp.details.map((detail, j) => (
                  <li key={j}>{detail}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      {/* Projects */}
      <section
        id="projects"
        ref={projectsRef}
        className="section"
      >
        <div className="section-header">
          <span className="section-num">03</span>
          <h2 className="section-title">Projects</h2>
          <div className="section-line" />
        </div>
        <div className="projects-grid">
          {projects.map((project, i) => {
            const cardContent = (
              <>
                <div className="project-image-wrap">
                  {project.image ? (
                    <img src={project.image} alt={project.title} className="project-img" />
                  ) : (
                    <div className="project-img-placeholder">
                      <span>{project.title}</span>
                    </div>
                  )}
                  {project.link && (
                    <div className="project-overlay">
                      <span>View on GitHub →</span>
                    </div>
                  )}
                </div>
                <div className="project-body">
                  <div className="project-title-row">
                    <h3>{project.title}</h3>
                    <span className={`project-status ${project.status === "Live" ? "live" : ""}`}>
                      {project.status}
                    </span>
                  </div>
                  <p>{project.description}</p>
                  <div className="project-tags">
                    {project.tags.map((tag) => (
                      <span key={tag} className="project-tag">{tag}</span>
                    ))}
                  </div>
                </div>
              </>
            );

            return project.link ? (
              <a
                key={i}
                href={project.link}
                target="_blank"
                rel="noopener noreferrer"
                className="project-card"
              >
                {cardContent}
              </a>
            ) : (
              <div key={i} className="project-card project-card-static">
                {cardContent}
              </div>
            );
          })}
        </div>
      </section>

      {/* Contact */}
      <section
        id="contact"
        ref={contactRef}
        className="section contact-section"
      >
        <div className="section-header">
          <span className="section-num">04</span>
          <h2 className="section-title">Contact</h2>
          <div className="section-line" />
        </div>
        <div className="contact-panel">
          <p className="contact-lead">
            Based in Austin, TX. Open to connecting on software engineering, quantitative finance, machine learning, and data systems.
          </p>
          <div className="contact-links">
            <a href="mailto:parthmehta24@utexas.edu" className="contact-card">
              <span className="contact-icon">✉</span>
              <span className="contact-label">Email</span>
              <span className="contact-value">parthmehta24@utexas.edu</span>
            </a>
            <a
              href="https://www.linkedin.com/in/parthmehta0210/"
              target="_blank"
              rel="noopener noreferrer"
              className="contact-card"
            >
              <span className="contact-icon">in</span>
              <span className="contact-label">LinkedIn</span>
              <span className="contact-value">parthmehta0210</span>
            </a>
            <a
              href="https://github.com/ParthM02"
              target="_blank"
              rel="noopener noreferrer"
              className="contact-card"
            >
              <span className="contact-icon">⌥</span>
              <span className="contact-label">GitHub</span>
              <span className="contact-value">ParthM02</span>
            </a>
          </div>
        </div>
        <footer className="site-footer">
          <span>© 2026 Parth Mehta</span>
          <span className="footer-status">
            <span className="pulse-dot" />
            Systems operational
          </span>
        </footer>
      </section>
    </div>
  );
}

export default App;
