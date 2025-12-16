"use client"

import React, { useRef, useState } from "react"
import { motion, useInView, AnimatePresence } from "framer-motion"
import {
  Terminal,
  Cpu,
  Layout,
  Smartphone,
  GitBranch,
  Container,
  Zap,
  Code,
  Database,
  Cloud,
  Brain,
  Sparkles,
  ChevronRight,
  Puzzle,
  Server,
  Globe,
  Shield,
  BarChart,
  Palette,
  CpuIcon,
  Layers,
  GitPullRequest,
  Monitor,
  FileCode,
  TerminalSquare
} from "lucide-react"
import { cn } from "@/lib/utils"
import { Badge } from "@/components/ui/badge"

// Import SVG logos for tools
import { SiReact, SiNextdotjs, SiTypescript, SiTailwindcss, SiNodedotjs, SiPython, SiPostgresql, SiRedis, SiGraphql, SiDocker, SiAmazonaws, SiVercel, SiGit, SiGithub, SiVisualstudiocode, SiFigma, SiJest, SiCypress, SiPrisma, SiSupabase, SiTensorflow, SiPytorch, SiOpenai, SiFirebase, SiGooglecloud, SiFlutter, SiDart, SiHtml5 } from "react-icons/si"
import { TbBrandThreejs } from "react-icons/tb"

// --- Particle Background ---
const ParticleBackground = () => {
  const particles = Array.from({ length: 30 }).map((_, i) => ({
    id: i,
    x: Math.random() * 100,
    y: Math.random() * 100,
    size: Math.random() * 3 + 1,
    duration: Math.random() * 20 + 10,
  }))

  return (
    <div className="absolute inset-0 overflow-hidden -z-10">
      {particles.map((particle) => (
        <motion.div
          key={particle.id}
          className="absolute rounded-full bg-gradient-to-r from-purple-500/20 to-cyan-500/20"
          style={{
            left: `${particle.x}%`,
            top: `${particle.y}%`,
            width: particle.size,
            height: particle.size,
          }}
          animate={{
            y: [0, -30, 0],
            x: [0, Math.sin(particle.id) * 10, 0],
          }}
          transition={{
            duration: particle.duration,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      ))}
    </div>
  )
}

// --- Interactive Skill Card with Hover Effect ---
interface InteractiveCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  skills: string[];
  gradient: string;
  delay?: number;
  isVisible: boolean;
}

const InteractiveCard = ({ 
  icon, 
  title, 
  description, 
  skills, 
  gradient, 
  delay = 0,
  isVisible 
}: InteractiveCardProps) => {
  const [isHovered, setIsHovered] = useState(false)
  const [activeSkill, setActiveSkill] = useState<string | null>(null)

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
      transition={{ duration: 0.6, delay }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => {
        setIsHovered(false)
        setActiveSkill(null)
      }}
      className={cn(
        "group relative overflow-hidden rounded-2xl border border-white/10 backdrop-blur-sm",
        "bg-gradient-to-br from-white/5 to-transparent",
        "transition-all duration-500 hover:scale-[1.02] hover:border-white/20",
        "cursor-pointer"
      )}
    >
      {/* Animated gradient border */}
      <div className={cn(
        "absolute inset-0 rounded-2xl p-[1px] opacity-0 transition-opacity duration-500",
        "bg-gradient-to-r from-transparent via-white/20 to-transparent",
        isHovered && "opacity-100"
      )} />
      
      {/* Main content */}
      <div className="relative z-10 p-6 h-full">
        {/* Animated icon background */}
        <motion.div
          animate={isHovered ? { scale: 1.1, rotate: 5 } : { scale: 1, rotate: 0 }}
          transition={{ duration: 0.3 }}
          className={cn(
            "w-14 h-14 rounded-xl mb-6 flex items-center justify-center",
            "bg-gradient-to-br from-white/10 to-white/5",
            "border border-white/10"
          )}
        >
          <div className="relative">
            {icon}
            {isHovered && (
              <motion.div
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                className="absolute -top-1 -right-1"
              >
                <Sparkles className="w-4 h-4 text-yellow-400" fill="currentColor" />
              </motion.div>
            )}
          </div>
        </motion.div>

        <h3 className="text-xl font-bold text-white mb-2 flex items-center gap-2">
          {title}
          <motion.div
            animate={isHovered ? { x: 5 } : { x: 0 }}
            transition={{ duration: 0.2 }}
          >
            <ChevronRight className="w-4 h-4 text-purple-400" />
          </motion.div>
        </h3>
        
        <p className="text-zinc-400 text-sm mb-6">{description}</p>

        {/* Interactive skill chips */}
        <div className="flex flex-wrap gap-2">
          {skills.map((skill, index) => (
            <motion.div
              key={skill}
              initial={{ scale: 0.8, opacity: 0 }}
              animate={isVisible ? { scale: 1, opacity: 1 } : { scale: 0.8, opacity: 0 }}
              transition={{ duration: 0.3, delay: delay + index * 0.1 }}
              onMouseEnter={() => setActiveSkill(skill)}
              onMouseLeave={() => setActiveSkill(null)}
            >
              <Badge
                variant="secondary"
                className={cn(
                  "relative overflow-hidden transition-all duration-300",
                  "bg-gradient-to-r from-white/5 to-white/[0.02]",
                  "border border-white/10",
                  "hover:border-white/30 hover:shadow-lg hover:shadow-purple-500/20",
                  activeSkill === skill && "scale-110 border-purple-500/50"
                )}
              >
                <AnimatePresence>
                  {activeSkill === skill && (
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: "100%" }}
                      exit={{ width: 0 }}
                      className="absolute inset-0 bg-gradient-to-r from-purple-500/10 to-transparent"
                    />
                  )}
                </AnimatePresence>
                <span className="relative z-10">{skill}</span>
              </Badge>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Floating particles on hover */}
      {isHovered && (
        <div className="absolute inset-0 pointer-events-none">
          {Array.from({ length: 5 }).map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-1 h-1 bg-purple-400 rounded-full"
              initial={{ x: 0, y: 0, opacity: 0 }}
              animate={{
                x: Math.sin(i) * 100,
                y: Math.cos(i) * 100,
                opacity: [0, 1, 0],
              }}
              transition={{
                duration: 1,
                repeat: Infinity,
                delay: i * 0.2,
              }}
            />
          ))}
        </div>
      )}
    </motion.div>
  )
}

// --- Skill Level Meter ---
const SkillLevelMeter = ({ skill, level, icon }: { skill: string; level: number; icon?: React.ReactNode }) => {
  return (
    <div className="space-y-2 group">
      <div className="flex justify-between items-center text-sm">
        <div className="flex items-center gap-2">
          {icon && (
            <div className="text-lg opacity-60 group-hover:opacity-100 transition-opacity">
              {icon}
            </div>
          )}
          <span className="text-zinc-300 group-hover:text-white transition-colors">{skill}</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-purple-400 font-medium">{level}%</span>
          <div className="w-8 h-1.5 bg-white/5 rounded-full overflow-hidden">
            <motion.div
              initial={{ width: 0 }}
              whileInView={{ width: `${(level / 100) * 32}px` }}
              transition={{ duration: 1, delay: 0.2 }}
              className="h-full bg-gradient-to-r from-purple-500 to-cyan-500 rounded-full"
            />
          </div>
        </div>
      </div>
      <div className="h-1.5 bg-white/5 rounded-full overflow-hidden">
        <motion.div
          initial={{ width: 0 }}
          whileInView={{ width: `${level}%` }}
          transition={{ duration: 1, delay: 0.2 }}
          className="h-full bg-gradient-to-r from-purple-500 to-cyan-500 rounded-full"
        />
      </div>
    </div>
  )
}

// --- Tool Card Component ---
interface ToolCardProps {
  icon: React.ReactNode;
  name: string;
  category: string;
  color: string;
  index?: number;
}

const ToolCard = ({ icon, name, category, color, index }: ToolCardProps) => {
  const [isHovered, setIsHovered] = useState(false)

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      whileInView={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.3, delay: (index ?? 0) * 0.03 }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={cn(
        "group relative p-4 rounded-xl border border-white/5",
        "bg-gradient-to-br from-white/5 to-transparent",
        "transition-all duration-300 hover:scale-105 hover:border-white/20",
        "cursor-pointer"
      )}
    >
      {/* Glow effect on hover */}
      <div 
        className={cn(
          "absolute inset-0 rounded-xl opacity-0 transition-opacity duration-300",
          isHovered && "opacity-100"
        )}
        style={{
          background: `radial-gradient(circle at center, ${color}15, transparent 70%)`,
        }}
      />
      
      <div className="relative z-10">
        {/* Icon with background */}
        <div className="w-12 h-12 rounded-lg flex items-center justify-center mb-3 group-hover:scale-110 transition-transform duration-300">
          <div 
            className="w-10 h-10 rounded-lg flex items-center justify-center"
            style={{ backgroundColor: `${color}20` }}
          >
            <div className="text-2xl" style={{ color }}>
              {icon}
            </div>
          </div>
        </div>
        
        <h4 className="font-medium text-white text-sm mb-1">{name}</h4>
        <p className="text-xs text-zinc-500">{category}</p>
      </div>

      {/* Hover indicator */}
      <motion.div
        initial={{ width: 0 }}
        animate={isHovered ? { width: "100%" } : { width: 0 }}
        transition={{ duration: 0.3 }}
        className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-current to-transparent"
        style={{ color }}
      />
    </motion.div>
  )
}

// --- Category Section for Tools ---
const ToolCategory = ({ title, tools, gradient }: { title: string; tools: ToolCardProps[]; gradient: string }) => {
  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold text-white flex items-center gap-2">
        <div className={cn("w-2 h-2 rounded-full", gradient)} />
        {title}
      </h3>
      <div className="grid grid-cols-4 md:grid-cols-5 lg:grid-cols-6 gap-3">
        {tools.map((tool, index) => (
          <ToolCard key={tool.name} {...tool} index={index} />
        ))}
      </div>
    </div>
  )
}

// --- Main Component ---
export default function SkillsSection() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  const skillCategories = [
    {
      icon: <Layout className="w-6 h-6 text-blue-400" />,
      title: "Frontend Architecture",
      description: "Building performant, accessible interfaces with modern React ecosystems",
      skills: ["React", "Next.js", "TypeScript", "Tailwind", "Framer Motion", "Three.js"],
      gradient: "from-blue-500/20 to-cyan-500/20"
    },
    {
      icon: <Server className="w-6 h-6 text-green-400" />,
      title: "Backend Systems",
      description: "Scalable APIs and robust server-side architectures",
      skills: ["Node.js", "Python", "PostgreSQL", "Redis", "GraphQL", "REST"],
      gradient: "from-green-500/20 to-emerald-500/20"
    },
    {
      icon: <Brain className="w-6 h-6 text-purple-400" />,
      title: "AI Engineering",
      description: "LLM integration and intelligent data pipelines",
      skills: ["TensorFlow", "PyTorch", "LangChain", "OpenAI", "RAG", "Hugging Face"],
      gradient: "from-purple-500/20 to-pink-500/20"
    },
    {
      icon: <Database className="w-6 h-6 text-orange-400" />,
      title: "Data & Analytics",
      description: "Real-time analytics and data visualization",
      skills: ["BigQuery", "Supabase", "Prisma", "D3.js", "Chart.js", "Airflow"],
      gradient: "from-orange-500/20 to-yellow-500/20"
    },
    {
      icon: <Cloud className="w-6 h-6 text-cyan-400" />,
      title: "Cloud & DevOps",
      description: "Containerized deployments and cloud infrastructure",
      skills: ["AWS", "Docker", "Kubernetes", "Vercel", "CI/CD", "Monitoring"],
      gradient: "from-cyan-500/20 to-blue-500/20"
    },
    {
      icon: <Shield className="w-6 h-6 text-red-400" />,
      title: "Security & Testing",
      description: "Secure applications with comprehensive testing",
      skills: ["Jest", "Cypress", "Auth.js", "OWASP", "SSL/TLS", "Pen Testing"],
      gradient: "from-red-500/20 to-rose-500/20"
    }
  ]

  // Updated proficiency with Flutter, Dart, and HTML5 added
  const proficiency = [
    { skill: "React/Next.js", level: 95, icon: <SiReact /> },
    { skill: "TypeScript", level: 90, icon: <SiTypescript /> },
    { skill: "Flutter/Dart", level: 88, icon: <SiFlutter /> },
    { skill: "UI/UX Design", level: 85, icon: <Palette className="w-4 h-4" /> },
    { skill: "HTML5/CSS3", level: 92, icon: <SiHtml5 /> },
    { skill: "AI Integration", level: 80, icon: <Brain className="w-4 h-4" /> },
    { skill: "Node.js", level: 85, icon: <SiNodedotjs /> },
    { skill: "Python", level: 82, icon: <SiPython /> },
    { skill: "Cloud Architecture", level: 75, icon: <Cloud className="w-4 h-4" /> },
    { skill: "DevOps", level: 70, icon: <Container className="w-4 h-4" /> },
    { skill: "Mobile Development", level: 85, icon: <Smartphone className="w-4 h-4" /> },
    { skill: "Database Design", level: 78, icon: <Database className="w-4 h-4" /> },
  ]

  // Tool data organized by categories
  const frontendTools = [
    { icon: <SiReact />, name: "React", category: "Framework", color: "#61DAFB" },
    { icon: <SiNextdotjs />, name: "Next.js", category: "Framework", color: "#000000" },
    { icon: <SiTypescript />, name: "TypeScript", category: "Language", color: "#3178C6" },
    { icon: <SiTailwindcss />, name: "Tailwind", category: "CSS", color: "#06B6D4" },
    { icon: <SiHtml5 />, name: "HTML5", category: "Markup", color: "#E34F26" },
    { icon: <TbBrandThreejs />, name: "Three.js", category: "3D", color: "#000000" },
  ]

  const mobileTools = [
    { icon: <SiFlutter />, name: "Flutter", category: "Framework", color: "#02569B" },
    { icon: <SiDart />, name: "Dart", category: "Language", color: "#0175C2" },
    { icon: <Smartphone />, name: "React Native", category: "Framework", color: "#61DAFB" },
    { icon: <SiFirebase />, name: "Firebase", category: "BaaS", color: "#FFCA28" },
    { icon: <Globe />, name: "iOS/Android", category: "Platform", color: "#8B5CF6" },
    { icon: <Layers />, name: "Cross-Platform", category: "Development", color: "#10B981" },
  ]

  const backendTools = [
    { icon: <SiNodedotjs />, name: "Node.js", category: "Runtime", color: "#339933" },
    { icon: <SiPython />, name: "Python", category: "Language", color: "#3776AB" },
    { icon: <SiPostgresql />, name: "PostgreSQL", category: "Database", color: "#4169E1" },
    { icon: <SiRedis />, name: "Redis", category: "Cache", color: "#DC382D" },
    { icon: <SiGraphql />, name: "GraphQL", category: "API", color: "#E10098" },
    { icon: <SiPrisma />, name: "Prisma", category: "ORM", color: "#2D3748" },
  ]

  const cloudTools = [
    { icon: <SiAmazonaws />, name: "AWS", category: "Cloud", color: "#FF9900" },
    { icon: <SiDocker />, name: "Docker", category: "Container", color: "#2496ED" },
    { icon: <SiVercel />, name: "Vercel", category: "Hosting", color: "#000000" },
    { icon: <SiGooglecloud />, name: "GCP", category: "Cloud", color: "#4285F4" },
    { icon: <SiFirebase />, name: "Firebase", category: "BaaS", color: "#FFCA28" },
    { icon: <SiSupabase />, name: "Supabase", category: "Database", color: "#3ECF8E" },
  ]

  const aiTools = [
    { icon: <SiTensorflow />, name: "TensorFlow", category: "ML", color: "#FF6F00" },
    { icon: <SiPytorch />, name: "PyTorch", category: "ML", color: "#EE4C2C" },
    { icon: <SiOpenai />, name: "OpenAI", category: "AI", color: "#412991" },
    { icon: <Brain />, name: "LangChain", category: "Framework", color: "#10B981" },
    { icon: <Cpu />, name: "Hugging Face", category: "AI", color: "#FFD21E" },
    { icon: <Database />, name: "RAG", category: "Pattern", color: "#8B5CF6" },
  ]

  const devTools = [
    { icon: <SiGit />, name: "Git", category: "VCS", color: "#F05032" },
    { icon: <SiGithub />, name: "GitHub", category: "Platform", color: "#181717" },
    { icon: <SiFigma />, name: "Figma", category: "Design", color: "#F24E1E" },
    { icon: <SiJest />, name: "Jest", category: "Testing", color: "#C21325" },
    { icon: <SiCypress />, name: "Cypress", category: "Testing", color: "#17202C" },
    { icon: <TerminalSquare />, name: "Terminal", category: "Tool", color: "#4D4D4D" },
  ]

  return (
    <section id="skills" className="skills-section section relative overflow-hidden py-32">
      {/* Enhanced Background Effects */}
      <ParticleBackground />
      
      {/* Animated gradient orbs */}
      <div className="absolute top-1/4 -left-32 w-96 h-96 bg-gradient-to-r from-purple-600/10 to-transparent rounded-full blur-3xl" />
      <div className="absolute bottom-1/4 -right-32 w-96 h-96 bg-gradient-to-l from-cyan-600/10 to-transparent rounded-full blur-3xl" />
      
      {/* Grid overlay with animation */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:40px_40px] [mask-image:radial-gradient(ellipse_80%_80%_at_50%_50%,black_30%,transparent_50%)] pointer-events-none" />

      <div className="container relative z-10 mx-auto px-6 max-w-7xl">
        {/* Animated Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="mb-20 text-center"
        >
          <Badge 
            variant="outline" 
            className="mb-6 border-white/20 bg-white/5 backdrop-blur-sm hover:bg-white/10 transition-colors group"
          >
            <Zap className="w-3 h-3 mr-2 text-purple-400 group-hover:rotate-12 transition-transform" />
            <span className="bg-gradient-to-r from-purple-400 via-pink-400 to-cyan-400 bg-clip-text text-transparent">
              Technical Expertise
            </span>
          </Badge>
          
          <h2 className="text-5xl md:text-6xl font-bold tracking-tight mb-6">
            <span className="bg-gradient-to-r from-white via-white to-white/80 bg-clip-text text-transparent">
              Mastery in{" "}
            </span>
            <span className="relative inline-block">
              <span className="bg-gradient-to-r from-purple-400 via-pink-400 to-cyan-400 bg-clip-text text-transparent">
                Modern Stack
              </span>
              <motion.div
                animate={{ x: [0, 100, 0] }}
                transition={{ duration: 3, repeat: Infinity }}
                className="absolute -bottom-2 left-0 h-[2px] w-full bg-gradient-to-r from-transparent via-purple-500 to-transparent"
              />
            </span>
          </h2>
          
          <p className="text-xl text-zinc-400 max-w-3xl mx-auto leading-relaxed">
            Specializing in cutting-edge technologies to build scalable, performant, 
            and user-centric digital experiences that push boundaries
          </p>
        </motion.div>

        {/* Interactive Skill Grid */}
        <div ref={ref} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-24">
          {skillCategories.map((category, index) => (
            <InteractiveCard
              key={category.title}
              {...category}
              delay={index * 0.1}
              isVisible={isInView}
            />
          ))}
        </div>

        {/* Proficiency Meter Section */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="grid lg:grid-cols-2 gap-12 items-center bg-gradient-to-br from-white/5 to-transparent border border-white/10 rounded-3xl p-8 backdrop-blur-sm mb-24"
        >
          <div>
            <div className="flex items-center gap-3 mb-8">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-purple-500/20 to-pink-500/20 flex items-center justify-center">
                <BarChart className="w-6 h-6 text-purple-400" />
              </div>
              <div>
                <h3 className="text-2xl font-bold text-white">Skill Proficiency</h3>
                <p className="text-zinc-400">Expertise levels across technologies</p>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {proficiency.map((item) => (
                <SkillLevelMeter key={item.skill} {...item} />
              ))}
            </div>
          </div>

          {/* Skills Visualization */}
          <div className="relative h-64 lg:h-full rounded-2xl overflow-hidden border border-white/10 p-4">
            <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 via-transparent to-cyan-500/5" />
            
            {/* Skills Radar Chart Visualization */}
            <div className="relative w-full h-full flex items-center justify-center">
              <div className="relative w-48 h-48">
                {/* Radar grid */}
                {[0, 1, 2, 3].map((ring) => (
                  <div
                    key={ring}
                    className="absolute inset-0 rounded-full border border-white/10"
                    style={{
                      inset: `${ring * 20}px`,
                    }}
                  />
                ))}
                
                {/* Radar lines */}
                {[0, 45, 90, 135, 180, 225, 270, 315].map((angle) => (
                  <div
                    key={angle}
                    className="absolute top-1/2 left-1/2 w-0.5 h-48 bg-white/5 origin-top"
                    style={{
                      transform: `translate(-50%, -50%) rotate(${angle}deg)`,
                    }}
                  />
                ))}
                
                {/* Skill points */}
                {[
                  { skill: "Flutter", level: 0.88, angle: 30 },
                  { skill: "React", level: 0.95, angle: 90 },
                  { skill: "Node.js", level: 0.85, angle: 150 },
                  { skill: "Python", level: 0.82, angle: 210 },
                  { skill: "AI", level: 0.80, angle: 270 },
                  { skill: "DevOps", level: 0.70, angle: 330 },
                ].map((point) => (
                  <motion.div
                    key={point.skill}
                    className="absolute w-3 h-3 rounded-full bg-gradient-to-r from-purple-500 to-cyan-500 border border-white/20 shadow-lg shadow-purple-500/20"
                    initial={{ scale: 0 }}
                    whileInView={{ scale: 1 }}
                    transition={{ duration: 0.5, delay: point.angle / 100 }}
                    style={{
                      left: `calc(50% + ${Math.cos((point.angle * Math.PI) / 180) * point.level * 48}px)`,
                      top: `calc(50% + ${Math.sin((point.angle * Math.PI) / 180) * point.level * 48}px)`,
                      transform: 'translate(-50%, -50%)',
                    }}
                  >
                    <div className="absolute -top-6 left-1/2 transform -translate-x-1/2 whitespace-nowrap text-xs text-white font-medium">
                      {point.skill}
                    </div>
                  </motion.div>
                ))}
                
                {/* Connecting lines */}
                <svg className="absolute inset-0 w-full h-full">
                  <motion.polygon
                    points="97,60 127,97 97,134 67,97"
                    fill="url(#radar-gradient)"
                    fillOpacity="0.2"
                    stroke="url(#radar-gradient)"
                    strokeWidth="1.5"
                    initial={{ pathLength: 0 }}
                    animate={{ pathLength: 1 }}
                    transition={{ duration: 2, delay: 0.5 }}
                  />
                  <defs>
                    <linearGradient id="radar-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#8B5CF6" />
                      <stop offset="100%" stopColor="#06B6D4" />
                    </linearGradient>
                  </defs>
                </svg>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Tools & Technologies Showcase */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.2 }}
          className="space-y-12"
        >
          <div className="text-center">
            <div className="inline-flex items-center gap-3 px-6 py-3 rounded-full bg-gradient-to-r from-white/5 to-white/[0.02] border border-white/10 backdrop-blur-sm mb-4">
              <Palette className="w-5 h-5 text-purple-400" />
              <h3 className="text-2xl font-bold bg-gradient-to-r from-white via-white to-white/80 bg-clip-text text-transparent">
                Tools & Technologies
              </h3>
            </div>
            <p className="text-zinc-400 max-w-2xl mx-auto">
              Comprehensive ecosystem of tools and technologies I use daily to build, 
              deploy, and maintain cutting-edge applications
            </p>
          </div>

          {/* Tools Grid */}
          <div className="space-y-8">
            <ToolCategory 
              title="Frontend Development" 
              tools={frontendTools} 
              gradient="bg-gradient-to-r from-blue-500 to-cyan-500" 
            />
            
            <ToolCategory 
              title="Mobile Development" 
              tools={mobileTools} 
              gradient="bg-gradient-to-r from-purple-500 to-pink-500" 
            />
            
            <ToolCategory 
              title="Backend & Databases" 
              tools={backendTools} 
              gradient="bg-gradient-to-r from-green-500 to-emerald-500" 
            />
            
            <ToolCategory 
              title="AI & Machine Learning" 
              tools={aiTools} 
              gradient="bg-gradient-to-r from-rose-500 to-red-500" 
            />
            
            <ToolCategory 
              title="Cloud & Infrastructure" 
              tools={cloudTools} 
              gradient="bg-gradient-to-r from-cyan-500 to-blue-500" 
            />
            
            <ToolCategory 
              title="Development Tools" 
              tools={devTools} 
              gradient="bg-gradient-to-r from-orange-500 to-yellow-500" 
            />
          </div>
        </motion.div>
      </div>
    </section>
  )
}