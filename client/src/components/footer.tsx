import { useQuery } from "@tanstack/react-query";
import type { Profile } from "@shared/schema";
import { Linkedin, Github, Instagram } from "lucide-react";

export default function Footer() {
  const { data: profile } = useQuery<Profile>({
    queryKey: ['/api/profile'],
  });

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <footer className="bg-background border-t border-border py-12 relative overflow-hidden animate-fade-in">
      <div className="absolute inset-0 opacity-5 pointer-events-none select-none">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary/20 rounded-full blur-3xl animate-pulse-slow"></div>
        <div className="absolute bottom-0 right-1/4 w-80 h-80 bg-accent/20 rounded-full blur-3xl animate-pulse-slow delay-700"></div>
      </div>
      
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center">
          <h3 className="text-2xl font-bold mb-4 text-foreground">
            <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              {profile?.name || "Talal Rafiq"}
            </span>
          </h3>
          <p className="text-muted-foreground mb-6">Building the future of mobile apps, one Flutter widget at a time.</p>
          
          <div className="flex justify-center space-x-6 mb-8">
            {['about', 'skills', 'projects', 'contact'].map((section) => (
              <button
                key={section}
                onClick={() => scrollToSection(section)}
                className="text-muted-foreground hover:text-primary transition-colors duration-200 hover:drop-shadow-lg px-2 py-1 rounded focus-visible:outline focus-visible:outline-2 focus-visible:outline-primary focus-visible:outline-offset-2 font-medium"
              >
                {section.charAt(0).toUpperCase() + section.slice(1)}
              </button>
            ))}
          </div>
          
          <div className="flex justify-center space-x-6 mb-8">
            <a
              href="https://www.linkedin.com/in/talal-rafiq/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-primary transition-colors duration-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-primary focus-visible:outline-offset-2"
            >
              <Linkedin className="text-2xl" />
            </a>
            
            <a
              href="https://github.com/dedsec-ux"
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-primary transition-colors duration-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-primary focus-visible:outline-offset-2"
            >
              <Github className="text-2xl" />
            </a>
            
            <a
              href="https://www.instagram.com/itx_txr/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-primary transition-colors duration-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-primary focus-visible:outline-offset-2"
            >
              <Instagram className="text-2xl" />
            </a>
          </div>
          
          <div className="border-t border-border pt-8 animate-fade-in">
            <p className="text-muted-foreground text-sm animate-pulse">
              © 2025 {profile?.name || "Talal Rafiq"}. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
