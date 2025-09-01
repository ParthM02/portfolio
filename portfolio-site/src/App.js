import React, { useRef, useState, useEffect } from "react";
import "./App.css";

const sections = [
  { id: "about", label: "About" },
  { id: "experience", label: "Experience" },
  { id: "projects", label: "Projects" },
  { id: "contact", label: "Contact" },
];

function App() {
  const sectionRefs = {
    about: useRef(null),
    experience: useRef(null),
    projects: useRef(null),
    contact: useRef(null),
  };

  const [activeSection, setActiveSection] = useState("about");

  // Refs for the horizontal scroll effect
  const experienceCardsRef = useRef(null);
  const experienceContentRef = useRef(null); // Ref for the new content wrapper

  useEffect(() => {
    const handleScroll = () => {
      // --- 1. Active Section Highlighting Logic ---
      const scrollPosition = window.scrollY + window.innerHeight / 2;
      let currentActive = "about";
      for (const sec of sections) {
        const ref = sectionRefs[sec.id].current;
        if (ref && ref.offsetTop <= scrollPosition) {
          currentActive = sec.id;
        }
      }
      setActiveSection(currentActive);

      // --- 2. Horizontal Scroll Effect Logic (no pinning) ---
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    // Run once on load to set initial state
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, [sectionRefs]); // Dependency array is correct as refs are stable

  const scrollToSection = (id) => {
    sectionRefs[id].current.scrollIntoView({ behavior: "smooth" });
  };

  // Helper for greeting
  function getGreeting() {
    const hour = new Date().getHours();
    if (hour < 12) return "Good morning";
    if (hour < 18) return "Good afternoon";
    return "Good evening";
  }

  return (
    <div className="portfolio-bg">
      {/* Navbar */}
      <nav className="navbar">
        <div className="navbar-left">Parth Mehta</div>
        <div className="navbar-right">
          <a
            href="/resume.pdf"
            className="resume-btn"
            download
            target="_blank"
            rel="noopener noreferrer"
          >
            Resume
          </a>
          <a
            href="https://github.com/ParthM02"
            className="github-link"
            target="_blank"
            rel="noopener noreferrer"
          >
            GitHub
          </a>
        </div>
      </nav>

      {/* Floating Nav */}
      <ul className="floating-nav">
        {sections.map((sec) => (
          <li
            key={sec.id}
            className={`floating-nav-item ${
              activeSection === sec.id ? "active" : ""
            }`}
            onClick={() => scrollToSection(sec.id)}
          >
            {sec.label}
          </li>
        ))}
      </ul>

      {/* Sections */}
      <section
        id="about"
        ref={sectionRefs.about}
        className="page-section about-section"
        tabIndex={-1}
      >
        <div className="about-main-row">
          <div className="about-main-left">
            <div className="about-greeting-headline">
              <div>
                <h2>{getGreeting()}, I'm Parth!</h2>
                <h3>Aspiring Software Engineer & Tech Enthusiast</h3>
              </div>
              <img
                src="/headshot.jpeg"
                alt="Profile"
                className="about-profile-pic"
              />
            </div>
            <div className="about-bio-box">
              <div className="about-bio">
                <p>
                  I am a Sophomore Computer Science student with a strong foundation in Python, Java, and web development technologies. My professional experience includes an internship at State Farm, where I honed my skills in AWS, front-end development, and data scripting. I am also an AWS Scholar with experience in machine learning, utilizing tools like PyTorch and SageMaker to build and deploy models. I am actively seeking internships to leverage my skills in a challenging and collaborative environment.
                </p>
              </div>
              <div className="about-skills-hobbies">
                <h4>Languages</h4>
                <ul className="skills-list">
                  <li>Python</li>
                  <li>Java</li>
                  <li>C</li>
                  <li>Swift</li>
                  <li>AngularJS</li>
                  <li>HTML/CSS</li>
                  <li>TypeScript</li>
                  <li>JavaScript</li>
                  <li>Terraform</li>
                </ul>
                <h4>Amazon Web Services</h4>
                <ul className="skills-list">
                  <li>S3</li>
                  <li>Lambda</li>
                  <li>DynamoDB</li>
                  <li>Kinesis</li>
                  <li>Athena</li>
                  <li>Glue</li>
                  <li>SageMaker</li>
                  <li>Step Functions</li>
                </ul>
                <h4>Hobbies</h4>
                <ul className="hobbies-list">
                  <li>Finance</li>
                  <li>Hiking</li>
                  <li>Cricket</li>
                  <li>Traveling</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
        <div className="about-education-box">
          <div className="about-education-header">
            <img
              src="/utlogo.png"
              alt="UT Austin Logo"
              className="about-education-logo"
            />
            <div>
              <strong>Bachelor of Science in Computer Science</strong>
              <br />
              The University of Texas at Austin
            </div>
          </div>
          <p>
            Expected Graduation: May 2028
          </p>
          <p>
            <strong>Relevant Coursework:</strong> Data Structures, Algorithms,
            Computer Architecture, Computer Operating Systems, Neural Networks,
            Discrete Mathematics, Statistics, Linear Algebra
          </p>
          <p>
            <strong>Organizations:</strong> Association for Computing Machinery (ACM), 
            University Finance Association (UFA)
          </p>
        </div>
      </section>

      {/* Experience section with the new inner wrapper */}
      <section
        id="experience"
        ref={sectionRefs.experience}
        className="page-section"
        tabIndex={-1}
      >
        <h1>Experience</h1>
        <div
          className="experience-cards-container"
          ref={experienceCardsRef}
        >
          {/* Example Experience Card */}
          <div className="experience-card">
            <div className="experience-card-header">
              <div className="experience-logo">
                <img src="/statefarmlogo.png" alt="Company Logo" />
              </div>
              <div className="experience-title-company">
                <div className="experience-position">Information Security Intern</div>
                <div className="experience-company">State Farm</div>
              </div>
              <div className="experience-timeframe">May 2025 - Aug 2025</div>
            </div>
            <ul className="experience-details">
              <li>Designed and developed a dashboard for use by Executives using AWS Lambda, DynamoDB, S3, Kinesis, Athena, Glue, and Terraform.</li>
              <li>Contributed to the front-end development of a business-critical internal Web Application built in AngularJS, HTML/CSS, and TypeScript.</li>
              <li>Developed scripts using Python and Node.js to create custom datasets for data exploration within internal tools and services.</li>
              <li>Rewarded with the Good Act Award by management for my adaptability, willingness to learn, and innovation.</li>
            </ul>
          </div>
          {/* Add more experience-card divs as needed */}
          <div className="experience-card">
            <div className="experience-card-header">
              <div className="experience-logo">
                <img src="/awslogo.png" alt="Company Logo" />
              </div>
              <div className="experience-title-company">
                <div className="experience-position">Student/Mentee</div>
                <div className="experience-company">Udacity/Amazon Web Services</div>
              </div>
              <div className="experience-timeframe">April 2024 - Aug 2024</div>
            </div>
            <ul className="experience-details">
              <li>Used Python and AutoGluon to generate models that predict bike sharing demand using data from Kaggle.</li>
              <li>Designed and trained a Multi-layer Perceptron Neural Network to classify handwritten digits from the MNIST dataset using Python and Pytorch.</li>
              <li>Designed and trained a Convolutional Neural Network that classified landmarks and deployed it to an application.</li>
              <li>Used AWS services such as Sagemaker, Lambda, S3, and Step Functions to build and deploy an image classification model for a fictional client.</li>
              <li>Gained in-depth career and technical knowledge from a mentor at AWS.</li>
            </ul>
          </div>
          <div className="experience-card">
            <div className="experience-card-header">
              <div className="experience-logo">
                <img src="/awslogo.png" alt="Company Logo" />
              </div>
              <div className="experience-title-company">
                <div className="experience-position">Student</div>
                <div className="experience-company">Udacity/Amazon Web Services</div>
              </div>
              <div className="experience-timeframe">June 2023 - October 2023</div>
            </div>
            <ul className="experience-details">
              <li>Designed and trained a Multi-layer Perceptron Neural Network using Python and PyTorch to classify plants and flowers.</li>
              <li>Obtained vast amounts of knowledge through the use of lectures curated by industry professionals as well as peer meetings.</li>
            </ul>
          </div>
        </div>
      </section>

      <section
        id="projects"
        ref={sectionRefs.projects}
        className="page-section"
        tabIndex={-1}
      >
        <h1>Projects</h1>
        <div className="project-list">
          <div className="project-card">
            <h3>FinMe (In Progress)</h3>
            <img
              src="/finmedemo.png"
              alt="FinMe preview"
              className="project-image"
            />
            <p>A website that provides institutional level financial analysis for stocks and funds.</p>
            <a href="https://github.com/ParthM02/FinMe" target="_blank" rel="noopener noreferrer">
              View Project
            </a>
          </div>
          <div className="project-card">
            <h3>My World</h3>
            <img
              src="/myworlddemo.jpg"
              alt="My World app preview"
              className="project-image"
            />
            <p>A developed but not published iOS app using Swift called My World, where users can place text and images in a 3D space in Augmented Reality using ARKit and other Apple libraries.</p>
            <a href="https://github.com/ParthM02/My-World" target="_blank" rel="noopener noreferrer">
              View Project
            </a>
          </div>
          <div className="project-card">
            <h3>Bubble Busters</h3>
            <img
              src="/bubblebusterdemo.jpeg"
              alt="Bubble Busters game preview"
              className="project-image"
            />
            <p>A game similar to Toon Blast but with a bubbly twist using Python.</p>
            <a href="https://github.com/ParthM02/Bubble-Busters" target="_blank" rel="noopener noreferrer">
              View Project
            </a>
          </div>
          <div className="project-card">
            <h3>Flower Classifier</h3>
            <img
              src="/flowerdemo.png"
              alt="Flower Classifier preview"
              className="project-image"
            />
            <p>A machine learning model built with PyTorch to classify different types of flowers.</p>
            <a href="https://github.com/ParthM02/Flower-Classifier" target="_blank" rel="noopener noreferrer">
              View Project
            </a>
          </div>
        </div>
      </section>

      <section
        id="contact"
        ref={sectionRefs.contact}
        className="page-section"
        tabIndex={-1}
      >
        <h1>Contact</h1>
        <p>
          Email:{" "}
          <a href="mailto:parthmehta24@utexas.edu">parthmehta24@utexas.edu</a>
        </p>
        <p>
          LinkedIn:{" "}
          <a href="https://www.linkedin.com/in/parthmehta0210/">parthmehta0210</a>
        </p>
        <p>
          GitHub:{" "}
          <a href="https://github.com/ParthM02">ParthM02</a>
        </p>
      </section>
    </div>
  );
}

export default App;