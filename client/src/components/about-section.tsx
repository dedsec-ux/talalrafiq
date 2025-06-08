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
    <section id="about" className="py-20 bg-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl lg:text-4xl font-bold text-slate-900 mb-4">About Me</h2>
          <p className="text-lg text-slate-600">Get to know me better</p>
        </div>
        
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <h3 className="text-2xl font-semibold text-slate-900 mb-4">My Journey</h3>
            <p className="text-slate-600 mb-4 leading-relaxed">
              Started as a computer science student with a passion for creating digital experiences. 
              Over the years, I've worked with startups and established companies, helping them 
              build scalable web applications and improve user experiences.
            </p>
            <p className="text-slate-600 mb-6 leading-relaxed">
              When I'm not coding, you'll find me exploring new technologies, contributing to 
              open-source projects, or mentoring aspiring developers in my community.
            </p>
            
            <div className="flex flex-wrap gap-3">
              <span className="bg-blue-100 text-primary px-4 py-2 rounded-full text-sm font-medium">5+ Years Experience</span>
              <span className="bg-blue-100 text-primary px-4 py-2 rounded-full text-sm font-medium">50+ Projects</span>
              <span className="bg-blue-100 text-primary px-4 py-2 rounded-full text-sm font-medium">Remote Work Expert</span>
            </div>
          </div>
          
          <div className="space-y-6">
            <div className="bg-slate-50 p-6 rounded-xl">
              <div className="flex items-center mb-3">
                <GraduationCap className="text-primary text-xl mr-3" />
                <h4 className="font-semibold text-slate-900">Education</h4>
              </div>
              <p className="text-slate-600 whitespace-pre-line">{profile.education}</p>
            </div>
            
            <div className="bg-slate-50 p-6 rounded-xl">
              <div className="flex items-center mb-3">
                <Briefcase className="text-primary text-xl mr-3" />
                <h4 className="font-semibold text-slate-900">Current Role</h4>
              </div>
              <p className="text-slate-600 whitespace-pre-line">{profile.currentRole}</p>
            </div>
            
            <div className="bg-slate-50 p-6 rounded-xl">
              <div className="flex items-center mb-3">
                <MapPin className="text-primary text-xl mr-3" />
                <h4 className="font-semibold text-slate-900">Location</h4>
              </div>
              <p className="text-slate-600">
                {profile.location}<br />
                Open to Remote Work
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
