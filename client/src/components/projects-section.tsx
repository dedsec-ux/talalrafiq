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
      'React': 'bg-blue-100 text-blue-800',
      'Node.js': 'bg-green-100 text-green-800',
      'MongoDB': 'bg-purple-100 text-purple-800',
      'React Native': 'bg-blue-100 text-blue-800',
      'Firebase': 'bg-yellow-100 text-yellow-800',
      'Redux': 'bg-red-100 text-red-800',
      'Vue.js': 'bg-blue-100 text-blue-800',
      'Express': 'bg-green-100 text-green-800',
      'MySQL': 'bg-orange-100 text-orange-800',
    };
    return colors[tech as keyof typeof colors] || 'bg-gray-100 text-gray-800';
  };

  return (
    <section id="projects" className="py-20 bg-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl lg:text-4xl font-bold text-slate-900 mb-4">Featured Projects</h2>
          <p className="text-lg text-slate-600">Some of my recent work</p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project) => (
            <div key={project.id} className="bg-white rounded-xl shadow-sm hover:shadow-lg transition-all duration-300 overflow-hidden group border border-slate-200">
              <img
                src={project.imageUrl}
                alt={project.title}
                className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
              />
              <div className="p-6">
                <h3 className="font-semibold text-xl text-slate-900 mb-2">{project.title}</h3>
                <p className="text-slate-600 mb-4">{project.description}</p>
                <div className="flex flex-wrap gap-2 mb-4">
                  {project.technologies.map((tech, index) => (
                    <span
                      key={index}
                      className={`px-3 py-1 rounded-full text-xs font-medium ${getTechnologyColor(tech)}`}
                    >
                      {tech}
                    </span>
                  ))}
                </div>
                <div className="flex gap-3">
                  {project.liveUrl && (
                    <a
                      href={project.liveUrl}
                      className="text-primary hover:text-blue-700 font-medium text-sm flex items-center gap-1"
                    >
                      <ExternalLink className="w-4 h-4" />
                      Live Demo
                    </a>
                  )}
                  {project.codeUrl && (
                    <a
                      href={project.codeUrl}
                      className="text-slate-600 hover:text-slate-800 font-medium text-sm flex items-center gap-1"
                    >
                      <Github className="w-4 h-4" />
                      Code
                    </a>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
        
        <div className="text-center mt-12">
          <button className="bg-primary text-white px-8 py-3 rounded-lg hover:bg-blue-700 transition-colors duration-200 font-medium">
            View All Projects
          </button>
        </div>
      </div>
    </section>
  );
}
