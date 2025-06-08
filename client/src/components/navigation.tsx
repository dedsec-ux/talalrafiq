import { useState } from "react";
import { Menu } from "lucide-react";

export default function Navigation() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
    setIsMobileMenuOpen(false);
  };

  return (
    <nav className="fixed top-0 w-full bg-white/80 backdrop-blur-md border-b border-slate-200 z-50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="font-bold text-xl text-primary">AC</div>
          
          {/* Desktop Navigation */}
          <div className="hidden md:flex space-x-8">
            <button
              onClick={() => scrollToSection('about')}
              className="text-slate-600 hover:text-primary transition-colors duration-200"
            >
              About
            </button>
            <button
              onClick={() => scrollToSection('skills')}
              className="text-slate-600 hover:text-primary transition-colors duration-200"
            >
              Skills
            </button>
            <button
              onClick={() => scrollToSection('projects')}
              className="text-slate-600 hover:text-primary transition-colors duration-200"
            >
              Projects
            </button>
            <button
              onClick={() => scrollToSection('contact')}
              className="text-slate-600 hover:text-primary transition-colors duration-200"
            >
              Contact
            </button>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            <Menu className="h-6 w-6 text-slate-600" />
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMobileMenuOpen && (
          <div className="md:hidden py-4 border-t border-slate-200">
            <div className="flex flex-col space-y-4">
              <button
                onClick={() => scrollToSection('about')}
                className="text-slate-600 hover:text-primary transition-colors duration-200 text-left"
              >
                About
              </button>
              <button
                onClick={() => scrollToSection('skills')}
                className="text-slate-600 hover:text-primary transition-colors duration-200 text-left"
              >
                Skills
              </button>
              <button
                onClick={() => scrollToSection('projects')}
                className="text-slate-600 hover:text-primary transition-colors duration-200 text-left"
              >
                Projects
              </button>
              <button
                onClick={() => scrollToSection('contact')}
                className="text-slate-600 hover:text-primary transition-colors duration-200 text-left"
              >
                Contact
              </button>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
