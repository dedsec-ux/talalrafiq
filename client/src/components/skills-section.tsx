import { useQuery } from "@tanstack/react-query";
import { Smartphone, Server, Settings, Gamepad2, Brain } from "lucide-react";
import type { Skill } from "@shared/schema";

const categoryIcons = {
  Mobile: Smartphone,
  Backend: Server,
  Tools: Settings,
  "Game Dev": Gamepad2,
  "AI/ML": Brain,
  Skills: Settings,
};

export default function SkillsSection() {
  const { data: skills, isLoading } = useQuery<Skill[]>({
    queryKey: ['/api/skills'],
  });

  if (isLoading) {
    return (
      <section id="skills" className="py-20 bg-slate-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <div className="h-10 bg-slate-200 rounded animate-pulse mb-4 max-w-md mx-auto"></div>
            <div className="h-6 bg-slate-200 rounded animate-pulse max-w-xs mx-auto"></div>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[1, 2, 3].map((i) => (
              <div key={i} className="bg-white p-8 rounded-xl shadow-sm">
                <div className="h-32 bg-slate-200 rounded animate-pulse mb-6"></div>
                <div className="space-y-4">
                  <div className="h-4 bg-slate-200 rounded animate-pulse"></div>
                  <div className="h-4 bg-slate-200 rounded animate-pulse"></div>
                  <div className="h-4 bg-slate-200 rounded animate-pulse"></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  if (!skills || skills.length === 0) {
    return (
      <section id="skills" className="py-20 bg-slate-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <p className="text-lg text-slate-600">No skills data available</p>
          </div>
        </div>
      </section>
    );
  }

  // Group skills by category
  const skillsByCategory = skills.reduce((acc, skill) => {
    if (!acc[skill.category]) {
      acc[skill.category] = [];
    }
    acc[skill.category].push(skill);
    return acc;
  }, {} as Record<string, Skill[]>);

  return (
    <section id="skills" className="py-20 bg-muted/30 relative">
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-10 left-10 w-32 h-32 bg-primary/30 rounded-full blur-2xl animate-pulse-slow"></div>
        <div className="absolute bottom-20 right-20 w-48 h-48 bg-accent/30 rounded-full blur-2xl animate-pulse-slow delay-1000"></div>
      </div>
      
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-4">Skills & Expertise</h2>
          <p className="text-lg text-muted-foreground">Technologies I master for mobile innovation</p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {Object.entries(skillsByCategory).map(([category, categorySkills]) => {
            const IconComponent = categoryIcons[category as keyof typeof categoryIcons] || Settings;
            
            return (
              <div key={category} className="glass p-8 rounded-xl hover:shadow-xl hover:border-primary/30 transition-all duration-300 group">
                <div className="text-center mb-6">
                  <div className="inline-flex p-4 rounded-full bg-primary/10 mb-4 group-hover:bg-primary/20 transition-colors">
                    <IconComponent className="text-primary text-3xl group-hover:scale-110 transition-transform" />
                  </div>
                  <h3 className="font-semibold text-xl text-foreground">{category}</h3>
                </div>
                <div className="space-y-4">
                  {categorySkills.map((skill) => (
                    <div key={skill.id}>
                      <div className="flex justify-between mb-2">
                        <span className="text-foreground font-medium">{skill.name}</span>
                        <span className="text-muted-foreground text-sm">{skill.level}</span>
                      </div>
                      <div className="bg-muted h-2 rounded-full overflow-hidden">
                        <div 
                          className="h-2 rounded-full transition-all duration-1000 bg-gradient-to-r from-primary to-accent relative overflow-hidden"
                          style={{ width: `${skill.percentage}%` }}
                        >
                          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-pulse"></div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
