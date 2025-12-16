"use client";

import React, { useEffect, useRef, useState } from "react";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { Github, ExternalLink, PlayCircle } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

type Project = {
  id: string;
  title: string;
  subtitle?: string;
  description: string;
  image?: string;
  tech: string[];
  demo?: string;
  github?: string;
  video?: string;
  featured?: boolean;
};

// Modern Project Card Component with Side-by-Side Layout
function ProjectCard({ project, index }: { project: Project; index: number }) {
  const videoRef = useRef<HTMLVideoElement>(null);

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="group flex flex-col lg:flex-row gap-8 items-center"
    >
      {/* Media Container */}
      <div className="relative aspect-video w-full lg:w-1/2 overflow-hidden bg-gray-900 rounded-lg">
        {project.video ? (
          <video
            ref={videoRef}
            src={project.video}
            muted
            loop
            playsInline
            autoPlay
            className="absolute inset-0 w-full h-full object-cover"
          />
        ) : (
          <div className="relative w-full h-full">
            {project.image && (
              <Image
                src={project.image}
                alt={project.title}
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-105"
              />
            )}
          </div>
        )}
      </div>

      {/* Details Container */}
      <div className="w-full lg:w-1/2 space-y-4">
        <div>
          <h3 className="text-2xl font-bold text-white mb-2">
            {project.title}
          </h3>
          {project.subtitle && (
            <p className="text-purple-400 text-sm font-medium mb-4">
              {project.subtitle}
            </p>
          )}
          <p className="text-gray-400 leading-relaxed mb-4">
            {project.description}
          </p>

          <div className="flex flex-wrap gap-2 mb-6">
            {project.tech.map((tech) => (
              <Badge
                key={tech}
                variant="secondary"
                className="bg-white/10 text-white/80 border-white/20"
              >
                {tech}
              </Badge>
            ))}
          </div>
        </div>

        <div className="flex gap-3">
          {project.demo && (
            <Button
              asChild
              size="sm"
              className="bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-500 hover:to-indigo-500 text-white shadow-lg shadow-purple-500/20 border-0"
            >
              <Link href={project.demo} target="_blank">
                <ExternalLink className="w-4 h-4 mr-2" />
                Live Demo
              </Link>
            </Button>
          )}
          {project.github && (
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    asChild
                    variant="outline"
                    size="icon"
                    className="border-white/20 bg-white/5 hover:bg-white/10 text-white shrink-0"
                  >
                    <Link href={project.github} target="_blank">
                      <Github className="w-4 h-4" />
                    </Link>
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>View Source Code</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          )}
        </div>
      </div>
    </motion.div>
  );
}

export default function ProjectsSection(): React.ReactElement {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // Modern Particle Background Animation
  useEffect(() => {
    if (!canvasRef.current) return;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;

    const particles: Array<{
      x: number;
      y: number;
      vx: number;
      vy: number;
      size: number;
      opacity: number;
      color: string;
    }> = [];

    const colors = ['#8b5cf6', '#3b82f6', '#ec4899', '#06b6d4', '#10b981'];

    // Create particles
    for (let i = 0; i < 50; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.5,
        vy: (Math.random() - 0.5) * 0.5,
        size: Math.random() * 3 + 1,
        opacity: Math.random() * 0.5 + 0.2,
        color: colors[Math.floor(Math.random() * colors.length)],
      });
    }

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      particles.forEach((particle, index) => {
        // Update position
        particle.x += particle.vx;
        particle.y += particle.vy;

        // Wrap around edges
        if (particle.x < 0) particle.x = canvas.width;
        if (particle.x > canvas.width) particle.x = 0;
        if (particle.y < 0) particle.y = canvas.height;
        if (particle.y > canvas.height) particle.y = 0;

        // Draw particle
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
        ctx.fillStyle = particle.color;
        ctx.globalAlpha = particle.opacity;
        ctx.fill();

        // Draw connections to nearby particles
        particles.forEach((otherParticle, otherIndex) => {
          if (index !== otherIndex) {
            const dx = particle.x - otherParticle.x;
            const dy = particle.y - otherParticle.y;
            const distance = Math.sqrt(dx * dx + dy * dy);

            if (distance < 100) {
              ctx.beginPath();
              ctx.moveTo(particle.x, particle.y);
              ctx.lineTo(otherParticle.x, otherParticle.y);
              ctx.strokeStyle = particle.color;
              ctx.globalAlpha = (100 - distance) / 100 * 0.2;
              ctx.lineWidth = 0.5;
              ctx.stroke();
            }
          }
        });
      });

      requestAnimationFrame(animate);
    };

    animate();

    const handleResize = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };

    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const projects: Project[] = [
    {
      id: "safe-space",
      title: "SafeSpace Ecosystem",
      subtitle: "AI HealthTech",
      description:
        "Award-winning platform connecting patients and doctors with real-time AI-driven sentiment analysis.",
      image: "/projects/safespace.png",
      tech: ["Flutter", "React", "TypeScript", "Python", "FastAPI"],
      demo: "https://ncmttztvfuwnkyuekrvv.supabase.co/storage/v1/object/public/portfolio/SafeSpace.mp4",
      github: "https://github.com/DhanukaRathnayaka/Final_Year_Project",
      video: "https://ncmttztvfuwnkyuekrvv.supabase.co/storage/v1/object/public/portfolio/SafeSpace%20(1).mp4", // Ensure this file exists for autoplay
    },
    {
      id: "Master Designer v2",
      title: "Master Designer v2",
      subtitle: "web application",
      description:
        "Master Designer v2.0 is an official all-island design competition platform featuring modern UI/UX, interactive visuals, and a fully responsive web experience.",
      image: "/projects/freshmart.png",
      tech: ["HTML 5", "CSS", "Tailwind", "JavaScript", "json"],
      demo: "https://master-designer-v2-0.vercel.app/",
      github: "https://github.com/DhanukaRathnayaka/Master-Designer-v2.0",
      video: "https://ncmttztvfuwnkyuekrvv.supabase.co/storage/v1/object/public/portfolio/Untitled%20video%20-%20Made%20with%20Clipchamp%20(1).mp4",
    },
    {
      id: "Kamukoo",
      title: "Kamukoo food delivery web-app",
      subtitle: "E-commerce",
      description:
        "A responsive food delivery web application built with React and Vite, designed for a fast and seamless user experience.",
      image: "/projects/researchx.png",
      tech: ["Node.js", "css", "react", "Vercel"],
      demo: "https://dhanukarathnayaka.github.io/Food-Delivery-App-Using-React-JS/",
      github: "https://github.com/DhanukaRathnayaka/Food-Delivery-App-Using-React-JS",
      video: "https://ncmttztvfuwnkyuekrvv.supabase.co/storage/v1/object/public/portfolio/Untitled%20video%20-%20Made%20with%20Clipchamp%20(2).mp4",
    },
    {
      id: "Serandib Games",
      title: "Serandib Games Blog",
      subtitle: "Blog Platform",
      description:
        "A cloud-based gaming blog with a user-friendly interface, Firebase authentication, and a real-time trained chatbot for interactive user engagement.",
      image: "/projects/master-designer.png",
      tech: ["javascript", "css", "HTML 5", "Chatbot","Firbase"],
      demo: "https://serendib-games-blog.vercel.app/",
      github: "https://serendib-games-blog.vercel.app/",
      video: "https://ncmttztvfuwnkyuekrvv.supabase.co/storage/v1/object/public/portfolio/Untitled%20video%20-%20Made%20with%20Clipchamp%20(4).mp4",
    },
    {
      id: "GPA Calculator",
      title: "GPA Calculator",
      subtitle: "Mobile App",
      description:
        "A GPA calculator app designed to dynamically calculate GPA based on user-entered subjects and grades with real-time updates.",
      image: "https://ncmttztvfuwnkyuekrvv.supabase.co/storage/v1/object/public/portfolio/SafeSpace.png",
      tech: ["Dart", "Flutter",],
      demo: "#",
      github: "https://github.com/DhanukaRathnayaka/Gpa_Calculator",
    },
    {
      id: "Book Store App",
      title: "E-Commerce Book Store",
      subtitle: "E-Commerce",
      description:
        "Scalable architecture with microservices, handling thousands of products with AI recommendations.",
      image: "https://ncmttztvfuwnkyuekrvv.supabase.co/storage/v1/object/public/portfolio/SafeSpace%20(1).png",
      tech: ["Dart", "Flutter",],
      demo: "#",
      github: "#",
    },
  ];

  const [showAll, setShowAll] = useState(false);
  const visibleProjects = showAll ? projects : projects.slice(0, 3);

  return (
    <section
      id="projects"
      className="projects-section section text-gray-300 relative overflow-hidden"
    >
      <div className="absolute top-0 right-0 w-96 h-96 bg-violet-600/5 rounded-full blur-3xl -z-10"></div>
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-orange-600/5 rounded-full blur-3xl -z-10"></div>
      {/* Background Canvas */}
      <div className="absolute inset-0 z-0 opacity-40 pointer-events-none">
        <canvas ref={canvasRef} className="w-full h-full" />
      </div>
      <div className="absolute top-0 right-0 w-96 h-96 bg-violet-600/5 rounded-full blur-3xl -z-10"></div>
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-orange-600/5 rounded-full blur-3xl -z-10"></div>

      <div className="container relative z-10 px-4 mx-auto max-w-7xl">
        {/* Header Section */}
        <div className="text-center mb-20 space-y-4">
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{
              duration: 0.8,
              ease: [0.22, 1, 0.36, 1],
              delay: 0.2,
            }}
            className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-tighter text-white"
          >
            Selected <span className="text-white">Projects</span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-gray-400 max-w-2xl mx-auto text-lg"
          >
            A curated collection of projects pushing the boundaries of Web
            Development, AI, and User Experience.
          </motion.p>
        </div>

        {/* Projects List */}
        <div className="space-y-16">
          {visibleProjects.map((project, index) => (
            <ProjectCard key={project.id} project={project} index={index} />
          ))}
        </div>

        {/* More/Less Button */}
        {projects.length > 3 && (
          <div className="text-center mt-12">
            <Button
              onClick={() => setShowAll(!showAll)}
              variant="outline"
              className="border-purple-500/30 text-purple-400 hover:bg-purple-500/10 hover:text-purple-300 transition-colors"
            >
              {showAll ? "Show Less" : "Show More Projects"}
            </Button>
          </div>
        )}
      </div>
    </section>
  );
}
