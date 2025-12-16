"use client"

import React, { useEffect, useRef } from "react"
import * as THREE from "three"
import { motion, useScroll, useTransform } from "framer-motion"
import { 
  Cpu, 
  Globe, 
  Smartphone, 
  Sparkles, 
  Zap,
  Code,
  Cloud,
  Server
} from "lucide-react"

const servicesData = [
  {
    id: "01",
    title: "AI Systems",
    description: "Building intelligent systems with machine learning pipelines, LLM integration, and real-time data processing for smart applications.",
    icon: Cpu,
    gradient: "from-blue-600 to-cyan-600",
    tech: ["TensorFlow", "PyTorch", "OpenAI", "LangChain"],
    accent: "#9333ea"
  },
  {
    id: "02",
    title: "Web Platforms",
    description: "Scalable full-stack applications with modern frameworks, microservices architecture, and cloud-native deployment.",
    icon: Globe,
    gradient: "from-blue-600 to-cyan-500",
    tech: ["Next.js", "Node.js", "PostgreSQL", "Docker"],
    accent: "#2563eb"
  },
  {
    id: "03",
    title: "Mobile Solutions",
    description: "High-performance cross-platform mobile apps with native feel, offline capabilities, and smooth animations.",
    icon: Smartphone,
    gradient: "from-emerald-500 to-teal-600",
    tech: ["Flutter", "React Native", "Firebase", "GraphQL"],
    accent: "#059669"
  },
  {
    id: "04",
    title: "Immersive UI",
    description: "Interactive 3D experiences, particle effects, and advanced animations that engage users on a deeper level.",
    icon: Sparkles,
    gradient: "from-orange-500 to-rose-600",
    tech: ["Three.js", "WebGL", "Framer", "GSAP"],
    accent: "#ea580c"
  },
  {
    id: "05",
    title: "Cloud & DevOps",
    description: "Infrastructure as code, CI/CD pipelines, and cloud optimization for scalable and reliable deployments.",
    icon: Cloud,
    gradient: "from-indigo-600 to-violet-500",
    tech: ["AWS", "Kubernetes", "Terraform", "Github Actions"],
    accent: "#4f46e5"
  },
  {
    id: "06",
    title: "Backend Systems",
    description: "High-performance APIs, database design, and real-time services with focus on security and scalability.",
    icon: Server,
    gradient: "from-amber-500 to-red-600",
    tech: ["Python", "Go", "Redis", "MongoDB"],
    accent: "#d97706"
  }
]

export default function ServicesSection() {
  const containerRef = useRef<HTMLDivElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  })

  const parallaxY = useTransform(scrollYProgress, [0, 1], [0, 200])
  const opacityProgress = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0])

  // Advanced 3D Particle Network
  useEffect(() => {
    if (!canvasRef.current) return

    const scene = new THREE.Scene()
    const camera = new THREE.PerspectiveCamera(50, window.innerWidth / window.innerHeight, 0.1, 1000)
    const renderer = new THREE.WebGLRenderer({ 
      canvas: canvasRef.current, 
      alpha: true, 
      antialias: true,
      powerPreference: "high-performance"
    })

    renderer.setSize(window.innerWidth, window.innerHeight)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))

    // Create particle system
    const particleCount = 200
    const positions = new Float32Array(particleCount * 3)
    const geometry = new THREE.BufferGeometry()

    // Distribute particles in a sphere
    for (let i = 0; i < particleCount; i++) {
      const i3 = i * 3
      const radius = 15
      const theta = Math.random() * Math.PI * 2
      const phi = Math.acos(2 * Math.random() - 1)
      
      positions[i3] = radius * Math.sin(phi) * Math.cos(theta)
      positions[i3 + 1] = radius * Math.sin(phi) * Math.sin(theta)
      positions[i3 + 2] = radius * Math.cos(phi)
    }

    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3))

    // Material with custom shader
    const material = new THREE.ShaderMaterial({
      uniforms: {
        time: { value: 0 },
        color: { value: new THREE.Color(0x8b5cf6) }
      },
      vertexShader: `
        uniform float time;
        varying vec3 vPosition;
        varying vec2 vUv;
        
        void main() {
          vPosition = position;
          vUv = uv;
          
          // Pulsing animation
          float pulse = sin(time + length(position) * 0.5) * 0.2;
          vec3 pos = position * (1.0 + pulse * 0.1);
          
          gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
          gl_PointSize = 2.0;
        }
      `,
      fragmentShader: `
        uniform vec3 color;
        varying vec3 vPosition;
        
        void main() {
          float dist = length(gl_PointCoord - vec2(0.5));
          if (dist > 0.5) discard;
          
          float intensity = 1.0 - dist * 2.0;
          vec3 finalColor = mix(color, vec3(1.0), 0.3);
          
          gl_FragColor = vec4(finalColor, intensity * 0.3);
        }
      `,
      transparent: true,
      blending: THREE.AdditiveBlending
    })

    const particles = new THREE.Points(geometry, material)
    scene.add(particles)

    // Connect particles with lines
    const lineMaterial = new THREE.LineBasicMaterial({ 
      color: 0x8b5cf6,
      transparent: true,
      opacity: 0.1
    })

    for (let i = 0; i < particleCount; i += 5) {
      const connections = Math.floor(Math.random() * 3) + 1
      for (let j = 0; j < connections; j++) {
        const targetIndex = (i + Math.floor(Math.random() * 20) + 1) % particleCount
        const points = []
        points.push(new THREE.Vector3(positions[i * 3], positions[i * 3 + 1], positions[i * 3 + 2]))
        points.push(new THREE.Vector3(positions[targetIndex * 3], positions[targetIndex * 3 + 1], positions[targetIndex * 3 + 2]))
        
        const lineGeometry = new THREE.BufferGeometry().setFromPoints(points)
        const line = new THREE.Line(lineGeometry, lineMaterial)
        scene.add(line)
      }
    }

    camera.position.z = 25

    let mouseX = 0
    let mouseY = 0

    const handleMouseMove = (event: MouseEvent) => {
      mouseX = (event.clientX / window.innerWidth) * 2 - 1
      mouseY = -(event.clientY / window.innerHeight) * 2 + 1
    }

    window.addEventListener('mousemove', handleMouseMove)

    const animate = () => {
      requestAnimationFrame(animate)
      
      material.uniforms.time.value += 0.01
      
      // Smooth camera movement
      camera.position.x += (mouseX * 5 - camera.position.x) * 0.05
      camera.position.y += (mouseY * 5 - camera.position.y) * 0.05
      camera.lookAt(scene.position)

      // Gentle rotation
      particles.rotation.y += 0.001
      particles.rotation.x += 0.0005

      renderer.render(scene, camera)
    }

    animate()

    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight
      camera.updateProjectionMatrix()
      renderer.setSize(window.innerWidth, window.innerHeight)
    }

    window.addEventListener('resize', handleResize)

    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
      window.removeEventListener('resize', handleResize)
      renderer.dispose()
    }
  }, [])

  return (
    <section
      ref={containerRef}
      id="services"
      className="relative min-h-screen py-32 overflow-hidden bg-black"
    >
      {/* 3D Background */}
      <div className="absolute inset-0 z-0">
        <canvas ref={canvasRef} className="w-full h-full" />
        <div className="absolute inset-0 bg-gradient-to-b from-black via-black/80 to-black" />
      </div>

      {/* Floating Elements */}
      <div className="absolute top-20 left-10 w-72 h-72 bg-blue-600/10 rounded-full blur-3xl" />
      <div className="absolute bottom-20 right-10 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl" />

      {/* Grid Overlay */}
      <div className="absolute inset-0 z-0 opacity-5">
        <div 
          className="absolute inset-0"
          style={{
            backgroundImage: `radial-gradient(circle at 1px 1px, rgba(255,255,255,0.15) 1px, transparent 1px)`,
            backgroundSize: '50px 50px'
          }}
        />
      </div>

      <div className="container relative z-10 mx-auto px-4">
        {/* Header - Simplified with no animation */}
        <div className="text-center mb-24">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 mb-6">
            <Zap className="w-4 h-4 text-blue-400" />
            <span className="text-sm text-gray-300">Specialized Services</span>
          </div>
          
          <h2 className="text-6xl md:text-8xl font-bold mb-6">
            <span className="bg-gradient-to-r from-white via-gray-200 to-gray-400 bg-clip-text text-transparent">
              Capabilities
            </span>
          </h2>
          
          <p className="text-xl text-gray-400 max-w-2xl mx-auto leading-relaxed">
            Transforming ideas into <span className="text-blue-400 font-semibold">cutting-edge digital experiences</span> 
            through innovative technology solutions
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {servicesData.map((service, index) => (
            <motion.div
              key={service.id}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              whileHover={{ y: -10, scale: 1.02 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ 
                duration: 0.5, 
                delay: index * 0.1,
                type: "spring",
                stiffness: 100
              }}
              className="group relative"
            >
              {/* Card Background */}
              <div className="absolute inset-0 bg-gradient-to-br from-gray-900/50 to-black/50 rounded-3xl border border-gray-800/50 backdrop-blur-sm" />
              
              {/* Hover Gradient */}
              <div 
                className="absolute inset-0 bg-gradient-to-br opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-3xl"
                style={{ 
                  backgroundImage: `linear-gradient(135deg, ${service.accent}20, transparent 50%)`
                }}
              />

              {/* Card Content */}
              <div className="relative p-8 h-full">
                {/* Icon */}
                <div className="mb-6">
                  <div className="relative inline-block">
                    <div 
                      className="absolute inset-0 bg-gradient-to-br blur-xl rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                      style={{ backgroundColor: service.accent }}
                    />
                    <div className="relative w-16 h-16 rounded-xl bg-gradient-to-br from-gray-800 to-gray-900 border border-gray-700/50 flex items-center justify-center group-hover:border-transparent transition-colors duration-300">
                      <service.icon className={`w-8 h-8 bg-gradient-to-r ${service.gradient} bg-clip-text text-transparent`} />
                    </div>
                  </div>
                </div>

                {/* ID Badge */}
                <div className="absolute top-6 right-6">
                  <span className="text-6xl font-bold text-gray-900 select-none">
                    {service.id}
                  </span>
                </div>

                {/* Title */}
                <h3 className="text-2xl font-bold text-white mb-4 group-hover:text-gray-100 transition-colors">
                  {service.title}
                </h3>

                {/* Description */}
                <p className="text-gray-400 mb-6 leading-relaxed">
                  {service.description}
                </p>

                {/* Tech Stack */}
                <div className="flex flex-wrap gap-2 mb-8">
                  {service.tech.map((tech) => (
                    <span 
                      key={tech}
                      className="px-3 py-1 text-xs rounded-full bg-white/5 border border-white/10 text-gray-400 group-hover:border-white/20 transition-colors"
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                {/* Learn More */}
                <div className="flex items-center gap-2 text-sm text-gray-500 group-hover:text-blue-400 transition-colors">
                  <span>Explore capabilities</span>
                  <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="mt-24 text-center">
          <div className="inline-flex items-center gap-4 px-8 py-4 rounded-2xl bg-gradient-to-r from-gray-900/50 to-black/50 border border-gray-800/50 backdrop-blur-sm">
            <Code className="w-6 h-6 text-blue-400" />
            <span className="text-gray-300">Looking for something specific?</span>
            <button className="px-6 py-2 rounded-full bg-gradient-to-r from-blue-600 to-cyan-600 text-white font-semibold hover:shadow-lg hover:shadow-blue-500/25 transition-all duration-300">
              Let's Talk
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}
