export interface ProjectInsights {
  desc: string;
  category: string;
  techStack: string[];
  reportLink: string;
}

export interface Project {
  image: string;
  title: string;
  subTitle: string;
  githubLink: string;
  insights: ProjectInsights;
}

export const Projects: Record<string, Project> = {
  'safe-space': {
    image: '/projects/safespace.png',
    title: 'SafeSpace Ecosystem',
    subTitle: 'AI HealthTech',
    githubLink: '#',
    insights: {
      desc: 'Award-winning platform connecting patients and doctors with real-time AI-driven sentiment analysis.',
      category: 'AI HealthTech',
      techStack: ['Flutter', 'React', 'TypeScript', 'Python', 'FastAPI'],
      reportLink: '#'
    }
  },
  'freshmart': {
    image: '/projects/freshmart.png',
    title: 'Freshmart Store',
    subTitle: 'E-commerce',
    githubLink: '#',
    insights: {
      desc: 'A lightning-fast grocery store featuring state management, cart logic, and stripe payments.',
      category: 'E-commerce',
      techStack: ['Next.js', 'Redux', 'Tailwind', 'Stripe'],
      reportLink: '#'
    }
  },
  'researchx': {
    image: '/projects/researchx.png',
    title: 'ResearchX AI',
    subTitle: 'SaaS Platform',
    githubLink: '#',
    insights: {
      desc: 'AI-powered document researcher that scrapes, synthesizes, and generates comprehensive whitepapers.',
      category: 'SaaS Platform',
      techStack: ['Next.js', 'OpenAI API', 'LangChain', 'Vercel'],
      reportLink: '#'
    }
  },
  'master-designer': {
    image: '/projects/master-designer.png',
    title: 'Master Designer v2',
    subTitle: 'Interactive 3D',
    githubLink: '#',
    insights: {
      desc: 'Immersive web platform engineered with WebGL/Three.js for the All-Island Design Competition.',
      category: 'Interactive 3D',
      techStack: ['Three.js', 'WebGL', 'GSAP', 'React'],
      reportLink: '#'
    }
  },
  'serendib-games': {
    image: '/projects/serendib.png',
    title: 'Serendib Games',
    subTitle: 'Content Platform',
    githubLink: '#',
    insights: {
      desc: 'Cloud-based gaming hub featuring a fully responsive UI and intelligent chatbot automation.',
      category: 'Content Platform',
      techStack: ['React', 'Node.js', 'AWS', 'MongoDB'],
      reportLink: '#'
    }
  },
  'ecommerce-platform': {
    image: '/projects/ecommerce.png',
    title: 'Nexus Commerce',
    subTitle: 'Full-Stack',
    githubLink: '#',
    insights: {
      desc: 'Scalable architecture with microservices, handling thousands of products with AI recommendations.',
      category: 'Full-Stack',
      techStack: ['NestJS', 'PostgreSQL', 'Docker', 'Redis'],
      reportLink: '#'
    }
  }
};