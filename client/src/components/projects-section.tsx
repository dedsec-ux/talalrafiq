import { useQuery } from "@tanstack/react-query";
import { ExternalLink, Github } from "lucide-react";
import type { Project } from "@shared/schema";

export default function ProjectsSection() {
  const { data: projects, isLoading } = useQuery<Project[]>({
    queryKey: ['/api/projects', 'featured'],
    queryFn: () => fetch('/api/projects?featured=true').then(res => res.json()),
  });

  if (isLoading) {
    return (
      <section id="projects" className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <div className="h-10 bg-slate-200 rounded animate-pulse mb-4 max-w-md mx-auto"></div>
            <div className="h-6 bg-slate-200 rounded animate-pulse max-w-xs mx-auto"></div>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[1, 2, 3].map((i) => (
              <div key={i} className="bg-white rounded-xl shadow-sm border border-slate-200">
                <div className="w-full h-48 bg-slate-200 rounded-t-xl animate-pulse"></div>
                <div className="p-6">
                  <div className="h-6 bg-slate-200 rounded animate-pulse mb-2"></div>
                  <div className="h-16 bg-slate-200 rounded animate-pulse mb-4"></div>
                  <div className="flex gap-2 mb-4">
                    <div className="h-6 w-16 bg-slate-200 rounded-full animate-pulse"></div>
                    <div className="h-6 w-20 bg-slate-200 rounded-full animate-pulse"></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  if (!projects || projects.length === 0) {
    return (
      <section id="projects" className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <p className="text-lg text-slate-600">No featured projects available</p>
          </div>
        </div>
      </section>
    );
  }

  const getTechnologyColor = (tech: string) => {
    const colors = {
      'Flutter': 'bg-blue-500/20 text-blue-300 border-blue-500/30',
      'Dart': 'bg-blue-400/20 text-blue-200 border-blue-400/30',
      'Firebase': 'bg-yellow-500/20 text-yellow-300 border-yellow-500/30',
      'SupaBase': 'bg-green-500/20 text-green-300 border-green-500/30',
      'AI/ML': 'bg-purple-500/20 text-purple-300 border-purple-500/30',
      'Chat Feature': 'bg-pink-500/20 text-pink-300 border-pink-500/30',
      'Admin Panel': 'bg-indigo-500/20 text-indigo-300 border-indigo-500/30',
      'Encryption': 'bg-red-500/20 text-red-300 border-red-500/30',
      'Steganography': 'bg-cyan-500/20 text-cyan-300 border-cyan-500/30',
      'Cyberpunk UI': 'bg-violet-500/20 text-violet-300 border-violet-500/30',
      'Flame Engine': 'bg-orange-500/20 text-orange-300 border-orange-500/30',
      'Tiled': 'bg-teal-500/20 text-teal-300 border-teal-500/30',
      'Game Development': 'bg-rose-500/20 text-rose-300 border-rose-500/30',
    };
    return colors[tech as keyof typeof colors] || 'bg-gray-500/20 text-gray-300 border-gray-500/30';
  };

  return (
    <section id="projects" className="py-20 bg-background relative">
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-20 right-20 w-64 h-64 bg-primary/20 rounded-full blur-3xl animate-pulse-slow"></div>
        <div className="absolute bottom-20 left-20 w-80 h-80 bg-accent/20 rounded-full blur-3xl animate-pulse-slow delay-700"></div>
      </div>
      
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-16 animate-fade-in">
          <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-4 hover:animate-glow transition-all duration-300">Featured Mobile <span className="text-primary neon-text hover:animate-wiggle">Apps</span></h2>
          <p className="text-lg text-muted-foreground hover:text-primary transition-colors duration-300">Innovative solutions built with Flutter</p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-2 gap-8">
          {projects.map((project) => (
            <div key={project.id} className="glass rounded-xl hover:shadow-2xl hover:border-primary/50 transition-all duration-500 overflow-hidden group animate-scale-in hover:scale-105">
              <div className="relative">
                <img
                  src={project.imageUrl}
                  alt={project.title}
                  className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-transparent"></div>
                <div className="absolute top-4 right-4 glass px-3 py-1 rounded-full">
                  <span className="text-primary text-sm font-medium">Mobile App</span>
                </div>
              </div>
              <div className="p-6">
                <h3 className="font-semibold text-xl text-foreground mb-3 group-hover:text-primary transition-colors">{project.title}</h3>
                <p className="text-muted-foreground mb-4 text-sm leading-relaxed">{project.description}</p>
                <div className="flex flex-wrap gap-2 mb-6">
                  {project.technologies.map((tech, index) => (
                    <span
                      key={index}
                      className={`px-3 py-1 rounded-full text-xs font-medium border transition-all duration-200 hover:scale-105 ${getTechnologyColor(tech)}`}
                    >
                      {tech}
                    </span>
                  ))}
                </div>
                <div className="flex gap-4">
                  {project.liveUrl && (
                    <a
                      href={project.liveUrl}
                      className="text-primary hover:text-primary/80 font-medium text-sm flex items-center gap-2 hover:gap-3 transition-all"
                    >
                      <ExternalLink className="w-4 h-4" />
                      View App
                    </a>
                  )}
                  {project.codeUrl && (
                    <a
                      href={project.codeUrl}
                      className="text-muted-foreground hover:text-foreground font-medium text-sm flex items-center gap-2 hover:gap-3 transition-all"
                    >
                      <Github className="w-4 h-4" />
                      Source Code
                    </a>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
        
        <div className="text-center mt-12">
          <button className="bg-primary text-primary-foreground px-8 py-3 rounded-lg hover:shadow-lg hover:animate-neon-glow transition-all duration-200 font-medium">
            View All Mobile Apps
          </button>
        </div>
      </div>
    </section>
  );
}
