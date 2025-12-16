"use client"

import React, { useState } from "react"
import { FaGithub, FaLinkedin, FaInstagram, FaFacebook } from "react-icons/fa"

export default function SocialSidebar() {
  const [isHovered, setIsHovered] = useState(false)

  // Social media links configuration
  const socialLinks = [
    {
      icon: <FaGithub size={24} />,
      label: "GitHub",
      url: "https://github.com/DhanukaRathnayaka",
      color: "#333"
    },
    {
      icon: <FaLinkedin size={24} />,
      label: "LinkedIn",
      url: "https://www.linkedin.com/in/dhanuka-rathnayaka/",
      color: "#0077B5"
    },
    {
      icon: <FaInstagram size={24} />,
      label: "Instagram",
      url: "https://www.instagram.com/_dhanuka_rathnayaka_/?hl=en",
      color: "#E4405F"
    },
    {
      icon: <FaFacebook size={24} />,
      label: "Facebook",
      url: "https://www.facebook.com/dhanuka.rathnayaka.39",
      color: "#1877F2"
    }
  ]

  return (
    <div 
      className={`social-sidebar ${isHovered ? 'hovered' : ''}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="social-icons-container">
        {socialLinks.map((link, index) => (
          <a
            key={index}
            href={link.url}
            target="_blank"
            rel="noopener noreferrer"
            className="social-icon-link"
            aria-label={link.label}
            style={{ '--icon-color': link.color } as React.CSSProperties}
          >
            <div className="social-icon-wrapper">
              {link.icon}
              <span className="social-tooltip">{link.label}</span>
            </div>
          </a>
        ))}
      </div>
      
      {/* Vertical Line */}
      <div className="vertical-line"></div>
    </div>
  )
}