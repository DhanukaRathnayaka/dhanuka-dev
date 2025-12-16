import HeroSection from "@/components/sections/hero-section"
import About from "@/components/sections/about-section"
import ServicesSection from "@/components/sections/services-section"
import SkillsSection from "@/components/sections/skills-section"
import ContactSection from "@/components/sections/contact-section"
import ProjectsSection from "@/components/sections/projects-section"

export default function HomePage() {
  return (
    <main className="min-h-screen">
      <HeroSection />
      <ProjectsSection/>
      <About />
      {/* <ServicesSection /> */}
      <SkillsSection />
      <ContactSection />
    </main>
  )
}

