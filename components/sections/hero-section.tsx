"use client"

import React, { useEffect, useRef, useState } from "react"
import Image from "next/image"
import { FaArrowDown } from "react-icons/fa"

export default function HeroSection() {
  const [isLoading, setIsLoading] = useState(true)
  const [isNavbarPinned, setIsNavbarPinned] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 2000)

    const handleScroll = () => {
      const scrollY = window.scrollY
      setIsNavbarPinned(scrollY > window.innerHeight - 80)
    }

    const updateNavbarHeightVar = () => {
      const navbar = document.querySelector('.navbar') as HTMLElement
      if (navbar) {
        document.documentElement.style.setProperty('--navbar-height', `${navbar.offsetHeight}px`)
      }
    }

    updateNavbarHeightVar();
    window.addEventListener("scroll", handleScroll)
    window.addEventListener("resize", updateNavbarHeightVar)

    return () => {
      clearTimeout(timer)
      window.removeEventListener("scroll", handleScroll)
      window.removeEventListener("resize", updateNavbarHeightVar)
    }
  }, [])

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId)
    if (element) {
      if (sectionId === 'home') {
        window.scrollTo({ top: 0, behavior: 'smooth' })
        setIsMobileMenuOpen(false)
        return
      }
      const navbar = document.querySelector('.navbar') as HTMLElement
      const navbarHeight = navbar ? navbar.offsetHeight : 64
      const targetTop = element.getBoundingClientRect().top + window.scrollY - navbarHeight
      window.scrollTo({ top: targetTop, behavior: 'smooth' })
    }
    setIsMobileMenuOpen(false)
  }

  const scrollToBottom = () => {
    const aboutSection = document.getElementById("about")
    if (aboutSection) {
      const navbar = document.querySelector('.navbar') as HTMLElement
      const navbarHeight = navbar ? navbar.offsetHeight : 64
      const aboutSectionBottom = aboutSection.offsetTop + aboutSection.offsetHeight
      const targetTop = aboutSectionBottom + 100 - navbarHeight
      window.scrollTo({ top: targetTop, behavior: "smooth" })
    }
  }

  if (isLoading) {
    return (
      <div className="loading-overlay">
        <div className="loading-spinner"></div>
      </div>
    )
  }

  return (
    <section id="home" className="hero-section">
      {/* Hero Content */}
      <div className="hero-content">
        <div className="glitch-text"><h1 className="hero-name">DHANUKA</h1></div>
        <div className="hero-image-container">
          <Image
            src="https://ncmttztvfuwnkyuekrvv.supabase.co/storage/v1/object/public/portfolio/yyy.png"
            alt="Dhanuka Rathnayaka Portrait"
            fill
            style={{ objectFit: "cover" }}
            priority
          />
        </div>
        
        {/* Scroll Down Indicator */}
        <button 
          className="scroll-down-btn" 
          onClick={scrollToBottom}
          aria-label="Scroll down"
        >
          <FaArrowDown className="animate-bounce" />
          <span>Scroll Down</span>
        </button>
      </div>
    </section>
  )
}