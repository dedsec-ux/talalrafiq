import { useQuery } from "@tanstack/react-query";
import type { Profile } from "@shared/schema";

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
    <section id="hero" className="pt-20 pb-16 bg-gradient-to-br from-slate-50 to-blue-50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row items-center gap-12">
          <div className="flex-1 text-center lg:text-left">
            <h1 className="text-4xl lg:text-6xl font-bold text-slate-900 mb-4">
              Hi, I'm <span className="text-primary">{profile.name}</span>
            </h1>
            <p className="text-xl lg:text-2xl text-slate-600 mb-6">
              {profile.title}
            </p>
            <p className="text-lg text-slate-600 mb-8 leading-relaxed">
              {profile.bio}
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <button
                onClick={scrollToProjects}
                className="bg-primary text-white px-8 py-3 rounded-lg hover:bg-blue-700 transition-colors duration-200 font-medium"
              >
                View My Work
              </button>
              <button className="border-2 border-primary text-primary px-8 py-3 rounded-lg hover:bg-primary hover:text-white transition-all duration-200 font-medium">
                Download Resume
              </button>
            </div>
          </div>
          <div className="flex-shrink-0">
            <img
              src={profile.profileImageUrl || 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=400&h=400'}
              alt={`${profile.name} - Professional headshot`}
              className="w-80 h-80 lg:w-96 lg:h-96 rounded-2xl shadow-2xl object-cover"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
