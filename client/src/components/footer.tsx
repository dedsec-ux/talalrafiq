import { useQuery } from "@tanstack/react-query";
import type { Profile } from "@shared/schema";

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
    <footer className="bg-slate-900 text-white py-12">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h3 className="text-2xl font-bold mb-4">{profile?.name || "Alex Chen"}</h3>
          <p className="text-slate-400 mb-6">Building the future, one line of code at a time.</p>
          
          <div className="flex justify-center space-x-6 mb-8">
            <button
              onClick={() => scrollToSection('about')}
              className="text-slate-400 hover:text-white transition-colors duration-200"
            >
              About
            </button>
            <button
              onClick={() => scrollToSection('skills')}
              className="text-slate-400 hover:text-white transition-colors duration-200"
            >
              Skills
            </button>
            <button
              onClick={() => scrollToSection('projects')}
              className="text-slate-400 hover:text-white transition-colors duration-200"
            >
              Projects
            </button>
            <button
              onClick={() => scrollToSection('contact')}
              className="text-slate-400 hover:text-white transition-colors duration-200"
            >
              Contact
            </button>
          </div>
          
          <div className="border-t border-slate-800 pt-8">
            <p className="text-slate-400 text-sm">
              © 2024 {profile?.name || "Alex Chen"}. All rights reserved. Built with passion and modern web technologies.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
