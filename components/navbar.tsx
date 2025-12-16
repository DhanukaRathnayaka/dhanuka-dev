"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";

export default function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isNavbarPinned, setIsNavbarPinned] = useState(false);
  const [activeSection, setActiveSection] = useState("home");

  // Update navbar height and handle scroll effects
  useEffect(() => {
    const updateNavbarHeightVar = () => {
      const navbar = document.querySelector('.navbar') as HTMLElement;
      if (navbar) {
        document.documentElement.style.setProperty('--navbar-height', `${navbar.offsetHeight}px`);
      }
    };

    const handleScroll = () => {
      if (window.innerWidth < 1024) {
        setIsNavbarPinned(false);
      } else {
        setIsNavbarPinned(window.scrollY > 100);
      }

      // Update active section based on scroll position
      const sections = ["home", "about", "service", "projects", "contact"];
      const scrollPosition = window.scrollY + 100;

      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const offsetTop = element.offsetTop;
          const offsetBottom = offsetTop + element.offsetHeight;
          
          if (scrollPosition >= offsetTop && scrollPosition < offsetBottom) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    updateNavbarHeightVar();
    window.addEventListener("resize", updateNavbarHeightVar);
    window.addEventListener("scroll", handleScroll);

    handleScroll();

    return () => {
      window.removeEventListener("resize", updateNavbarHeightVar);
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      if (sectionId === "home") {
        window.scrollTo({ top: 0, behavior: "smooth" });
      } else {
        const navbar = document.querySelector(".navbar") as HTMLElement;
        const navbarHeight = navbar ? navbar.offsetHeight : 72;
        const targetTop = element.offsetTop - navbarHeight;
        window.scrollTo({ top: targetTop, behavior: "smooth" });
      }
      setActiveSection(sectionId);
    }
    setIsMobileMenuOpen(false);
  };

  const navItems = [
    { id: "home", label: "Home" },
    { id: "about", label: "About" },
    { id: "service", label: "Services" },
    { id: "projects", label: "Projects" },
    { id: "contact", label: "Contact" },
  ];

  return (
    <nav 
      className={`navbar ${isNavbarPinned ? 'navbar-pinned' : ''} ${isMobileMenuOpen ? 'mobile-open' : ''}`}
      role="navigation" 
      aria-label="Main navigation"
    >
      <div className="nav-container">
        {/* Logo */}
        <div 
          className="nav-logo" 
          onClick={() => scrollToSection("home")}
          tabIndex={0} 
          role="button" 
          aria-label="Home"
        >
        </div>

        {/* Desktop Navigation */}
        <div className="nav-links-wrapper">
          <div className="nav-links">
            {navItems.map((item) => (
              <button
                key={item.id}
                className={`nav-link ${activeSection === item.id ? 'active' : ''}`}
                onClick={() => scrollToSection(item.id)}
                aria-current={activeSection === item.id ? "page" : undefined}
                tabIndex={0}
              >
                <span className="nav-link-text">{item.label}</span>
                <span className="nav-link-underline"></span>
              </button>
            ))}
          </div>
        </div>

        {/* Mobile Menu Button */}
        <button
          className="mobile-menu-button"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          aria-label="Toggle mobile menu"
          aria-expanded={isMobileMenuOpen}
        >
          <span className={`hamburger ${isMobileMenuOpen ? 'open' : ''}`}>
            <span className="hamburger-line"></span>
            <span className="hamburger-line"></span>
            <span className="hamburger-line"></span>
          </span>
        </button>
      </div>

      {/* Mobile Menu Overlay */}
      <div className={`mobile-menu-overlay ${isMobileMenuOpen ? 'open' : ''}`}>
        <div className="mobile-menu-content">
          {navItems.map((item) => (
            <button
              key={item.id}
              className={`mobile-nav-link ${activeSection === item.id ? 'active' : ''}`}
              onClick={() => scrollToSection(item.id)}
              aria-current={activeSection === item.id ? "page" : undefined}
              tabIndex={0}
            >
              {item.label}
            </button>
          ))}
        </div>
      </div>
    </nav>
  );
}