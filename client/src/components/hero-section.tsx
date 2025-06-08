import { useQuery } from "@tanstack/react-query";
import type { Profile } from "@shared/schema";
import profileImage from "@assets/F1139420-CC1B-4111-9D9C-3673BB72DDD2_1749393529210.jpg";

export default function HeroSection() {
  const { data: profile, isLoading } = useQuery<Profile>({
    queryKey: ['/api/profile'],
  });

  const scrollToProjects = () => {
    const element = document.getElementById('projects');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  if (isLoading) {
    return (
      <section id="hero" className="pt-20 pb-16 bg-gradient-to-br from-slate-50 to-blue-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row items-center gap-12">
            <div className="flex-1 space-y-4">
              <div className="h-12 bg-slate-200 rounded animate-pulse"></div>
              <div className="h-8 bg-slate-200 rounded animate-pulse"></div>
              <div className="h-24 bg-slate-200 rounded animate-pulse"></div>
            </div>
            <div className="w-80 h-80 lg:w-96 lg:h-96 bg-slate-200 rounded-2xl animate-pulse"></div>
          </div>
        </div>
      </section>
    );
  }

  if (!profile) {
    return (
      <section id="hero" className="pt-20 pb-16 bg-gradient-to-br from-slate-50 to-blue-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <p className="text-lg text-slate-600">Profile not found</p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="hero" className="pt-20 pb-16 bg-gradient-to-br from-background via-muted to-background relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-1/4 left-1/4 w-72 h-72 bg-primary/20 rounded-full blur-3xl animate-pulse-slow"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-accent/20 rounded-full blur-3xl animate-pulse-slow delay-1000"></div>
      </div>
      
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="flex flex-col lg:flex-row items-center gap-12">
          <div className="flex-1 text-center lg:text-left animate-slide-in-left">
            <h1 className="text-4xl lg:text-6xl font-bold text-foreground mb-4 hover:animate-glow transition-all duration-300">
              Hi, I'm <span className="text-primary neon-text hover:animate-wiggle">{profile.name}</span>
            </h1>
            <p className="text-xl lg:text-2xl text-muted-foreground mb-6 bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent font-semibold hover:scale-105 transition-transform duration-300">
              {profile.title}
            </p>
            <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
              {profile.bio}
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <button
                onClick={scrollToProjects}
                className="bg-primary text-primary-foreground px-8 py-3 rounded-lg hover:shadow-lg hover:animate-neon-glow transition-all duration-200 font-medium animate-scale-in"
              >
                View My Apps
              </button>
              <a 
                href="/attached_assets/Minimalist Modern Professional CV Resume (1)_1749393567484.pdf" 
                download="Talal_Rafiq_CV.pdf"
                className="glass border border-primary text-primary px-8 py-3 rounded-lg hover:bg-primary hover:text-primary-foreground transition-all duration-200 font-medium inline-block text-center animate-wiggle"
              >
                Download CV
              </a>
            </div>
          </div>
          <div className="flex-shrink-0 animate-slide-in-right">
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-br from-primary to-accent rounded-2xl blur-xl opacity-30 animate-pulse-slow"></div>
              <img
                src={profile.profileImageUrl || profileImage}
                alt={`${profile.name} - Professional headshot`}
                className="relative w-80 h-80 lg:w-96 lg:h-96 rounded-2xl shadow-2xl object-cover border border-primary/20"
              />
              {/* Floating tech icons */}
              <div className="absolute -top-4 -right-4 glass p-3 rounded-full animate-bounce">
                <span className="text-2xl">📱</span>
              </div>
              <div className="absolute top-1/2 -left-6 glass p-3 rounded-full animate-bounce delay-300">
                <span className="text-2xl">⚡</span>
              </div>
              <div className="absolute -bottom-4 right-1/4 glass p-3 rounded-full animate-bounce delay-700">
                <span className="text-2xl">🎮</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
