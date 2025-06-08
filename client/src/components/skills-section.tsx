import { useQuery } from "@tanstack/react-query";
import { Code, Server, Settings } from "lucide-react";
import type { Skill } from "@shared/schema";

const categoryIcons = {
  Frontend: Code,
  Backend: Server,
  Tools: Settings,
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
    <section id="skills" className="py-20 bg-slate-50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl lg:text-4xl font-bold text-slate-900 mb-4">Skills & Expertise</h2>
          <p className="text-lg text-slate-600">Technologies I work with</p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {Object.entries(skillsByCategory).map(([category, categorySkills]) => {
            const IconComponent = categoryIcons[category as keyof typeof categoryIcons] || Code;
            
            return (
              <div key={category} className="bg-white p-8 rounded-xl shadow-sm hover:shadow-md transition-shadow duration-200">
                <div className="text-center mb-6">
                  <IconComponent className="text-primary text-3xl mb-4 mx-auto" />
                  <h3 className="font-semibold text-xl text-slate-900">{category}</h3>
                </div>
                <div className="space-y-4">
                  {categorySkills.map((skill) => (
                    <div key={skill.id}>
                      <div className="flex justify-between mb-2">
                        <span className="text-slate-700 font-medium">{skill.name}</span>
                        <span className="text-slate-500 text-sm">{skill.level}</span>
                      </div>
                      <div className="bg-slate-200 h-2 rounded-full">
                        <div 
                          className="bg-primary h-2 rounded-full transition-all duration-300"
                          style={{ width: `${skill.percentage}%` }}
                        ></div>
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
