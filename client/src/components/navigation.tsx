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
    <nav className="fixed top-0 w-full glass border-b border-border z-50 shadow-lg shadow-primary/10 backdrop-blur-md transition-all duration-300">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="font-bold text-xl text-primary neon-text tracking-widest">TR</div>
          
          {/* Desktop Navigation */}
          <div className="hidden md:flex space-x-8">
            {['about', 'skills', 'projects', 'contact'].map((section) => (
              <button
                key={section}
                onClick={() => scrollToSection(section)}
                className={`text-muted-foreground hover:text-primary transition-colors duration-200 hover:drop-shadow-lg px-2 py-1 rounded focus-visible:outline focus-visible:outline-2 focus-visible:outline-primary focus-visible:outline-offset-2 font-medium nav-link-${section}`}
              >
                {section.charAt(0).toUpperCase() + section.slice(1)}
              </button>
            ))}
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2 rounded focus-visible:outline focus-visible:outline-2 focus-visible:outline-primary focus-visible:outline-offset-2"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Open navigation menu"
          >
            <Menu className="h-6 w-6 text-muted-foreground" />
          </button>
        </div>

        {/* Mobile Navigation */}
        <div
          className={`md:hidden transition-all duration-500 overflow-hidden ${isMobileMenuOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0 pointer-events-none'}`}
          aria-hidden={!isMobileMenuOpen}
        >
          <div className="flex flex-col space-y-4 py-4 border-t border-border bg-background/80 backdrop-blur-md rounded-b-xl shadow-lg">
            {['about', 'skills', 'projects', 'contact'].map((section) => (
              <button
                key={section}
                onClick={() => scrollToSection(section)}
                className="text-muted-foreground hover:text-primary transition-colors duration-200 text-left px-4 py-2 rounded focus-visible:outline focus-visible:outline-2 focus-visible:outline-primary focus-visible:outline-offset-2 font-medium"
              >
                {section.charAt(0).toUpperCase() + section.slice(1)}
              </button>
            ))}
          </div>
        </div>
      </div>
    </nav>
  );
}
