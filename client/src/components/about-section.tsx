import { useQuery } from "@tanstack/react-query";
import { GraduationCap, Briefcase, MapPin } from "lucide-react";
import type { Profile } from "@shared/schema";

export default function AboutSection() {
  const { data: profile, isLoading } = useQuery<Profile>({
    queryKey: ['/api/profile'],
  });

  if (isLoading) {
    return (
      <section id="about" className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <div className="h-10 bg-slate-200 rounded animate-pulse mb-4 max-w-md mx-auto"></div>
            <div className="h-6 bg-slate-200 rounded animate-pulse max-w-xs mx-auto"></div>
          </div>
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="space-y-4">
              <div className="h-8 bg-slate-200 rounded animate-pulse"></div>
              <div className="h-20 bg-slate-200 rounded animate-pulse"></div>
              <div className="h-16 bg-slate-200 rounded animate-pulse"></div>
            </div>
            <div className="space-y-6">
              <div className="h-24 bg-slate-200 rounded animate-pulse"></div>
              <div className="h-24 bg-slate-200 rounded animate-pulse"></div>
              <div className="h-24 bg-slate-200 rounded animate-pulse"></div>
            </div>
          </div>
        </div>
      </section>
    );
  }

  if (!profile) {
    return (
      <section id="about" className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <p className="text-lg text-slate-600">Profile information not available</p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="about" className="py-20 bg-muted/20 relative">
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-1/4 right-1/3 w-48 h-48 bg-accent/30 rounded-full blur-2xl animate-pulse-slow"></div>
        <div className="absolute bottom-1/3 left-1/4 w-64 h-64 bg-primary/20 rounded-full blur-2xl animate-pulse-slow delay-500"></div>
      </div>
      
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-4">About Me</h2>
          <p className="text-lg text-muted-foreground">My mobile development journey</p>
        </div>
        
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="animate-slide-in-left">
            <h3 className="text-2xl font-semibold text-foreground mb-4 bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">My Mobile Development Journey</h3>
            <p className="text-muted-foreground mb-4 leading-relaxed">
              Started as a Software Engineering student with a passion for mobile innovation. 
              Gained hands-on experience during my internship at DevelopersHub.co, where I 
              collaborated with teams to build cutting-edge mobile solutions.
            </p>
            <p className="text-muted-foreground mb-6 leading-relaxed">
              Now specializing in Flutter development, I create cross-platform mobile apps 
              that combine beautiful UI/UX with powerful functionality, from AI-powered health 
              apps to secure steganography tools.
            </p>
            
            <div className="flex flex-wrap gap-3">
              <span className="glass border border-primary/30 text-primary px-4 py-2 rounded-full text-sm font-medium hover:bg-primary/10 transition-colors">6 Week Internship</span>
              <span className="glass border border-accent/30 text-accent px-4 py-2 rounded-full text-sm font-medium hover:bg-accent/10 transition-colors">5+ Mobile Apps</span>
              <span className="glass border border-primary/30 text-primary px-4 py-2 rounded-full text-sm font-medium hover:bg-primary/10 transition-colors">Flutter Expert</span>
            </div>
          </div>
          
          <div className="space-y-6 animate-slide-in-right">
            <div className="glass p-6 rounded-xl hover:border-primary/30 transition-all duration-300 group">
              <div className="flex items-center mb-3">
                <div className="p-2 rounded-lg bg-primary/10 mr-3 group-hover:bg-primary/20 transition-colors">
                  <GraduationCap className="text-primary text-xl" />
                </div>
                <h4 className="font-semibold text-foreground">Education</h4>
              </div>
              <p className="text-muted-foreground whitespace-pre-line text-sm leading-relaxed">{profile.education}</p>
            </div>
            
            <div className="glass p-6 rounded-xl hover:border-accent/30 transition-all duration-300 group">
              <div className="flex items-center mb-3">
                <div className="p-2 rounded-lg bg-accent/10 mr-3 group-hover:bg-accent/20 transition-colors">
                  <Briefcase className="text-accent text-xl" />
                </div>
                <h4 className="font-semibold text-foreground">Current Focus</h4>
              </div>
              <p className="text-muted-foreground whitespace-pre-line text-sm leading-relaxed">{profile.currentRole}</p>
            </div>
            
            <div className="glass p-6 rounded-xl hover:border-primary/30 transition-all duration-300 group">
              <div className="flex items-center mb-3">
                <div className="p-2 rounded-lg bg-primary/10 mr-3 group-hover:bg-primary/20 transition-colors">
                  <MapPin className="text-primary text-xl" />
                </div>
                <h4 className="font-semibold text-foreground">Location</h4>
              </div>
              <p className="text-muted-foreground text-sm">
                {profile.location}<br />
                <span className="text-accent">Available for Remote Work</span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
