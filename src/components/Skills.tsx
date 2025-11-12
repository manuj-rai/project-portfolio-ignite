import { Code, Database, Globe, Smartphone, Cloud, Zap, Sparkles } from "lucide-react";
import { Card } from "@/components/ui/card";

const skills = [
  {
    icon: Code,
    title: "Frontend",
    description: "React, TypeScript, Next.js, Tailwind",
  },
  {
    icon: Database,
    title: "Backend",
    description: "Node.js, PostgreSQL, REST, GraphQL",
  },
  {
    icon: Cloud,
    title: "Cloud",
    description: "AWS, Docker, CI/CD, Serverless",
  },
  {
    icon: Smartphone,
    title: "Mobile",
    description: "React Native, Progressive Web Apps",
  },
  {
    icon: Globe,
    title: "Design",
    description: "UI/UX, Responsive, Accessibility",
  },
  {
    icon: Zap,
    title: "Performance",
    description: "Optimization, SEO, Core Vitals",
  },
];

const Skills = () => {
  return (
    <section id="skills" className="py-12 md:py-20 lg:py-32 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-primary/5 to-transparent" />
      
      <div className="container px-4 md:px-6 relative z-10">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12 md:mb-20">
            <div className="inline-flex items-center gap-2 px-3 md:px-4 py-2 rounded-full border border-primary/30 bg-primary/5 mb-4 md:mb-6">
              <Sparkles className="w-3 h-3 md:w-4 md:h-4 text-primary" />
              <span className="text-xs md:text-sm font-medium text-primary">Expertise</span>
            </div>
            <h2 className="text-3xl md:text-5xl lg:text-7xl font-black mb-4 md:mb-6">
              Skills &
              <span className="block text-primary">Technologies</span>
            </h2>
          </div>

          {/* Skills Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
            {skills.map((skill, index) => {
              const Icon = skill.icon;
              return (
                <Card 
                  key={index}
                  className="group relative overflow-hidden p-6 md:p-8 bg-card border-border hover:border-primary active:scale-95 transition-all duration-500"
                >
                  {/* Hover Effect */}
                  <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-accent/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  
                  <div className="relative z-10">
                    <div className="mb-4 md:mb-6">
                      <div className="w-12 h-12 md:w-14 md:h-14 rounded-2xl bg-gradient-to-br from-primary to-accent flex items-center justify-center group-hover:scale-110 transition-transform duration-500">
                        <Icon className="w-6 h-6 md:w-7 md:h-7 text-primary-foreground" strokeWidth={1.5} />
                      </div>
                    </div>
                    
                    <h3 className="text-xl md:text-2xl font-bold mb-2 md:mb-3 group-hover:text-primary transition-colors">{skill.title}</h3>
                    <p className="text-sm md:text-base text-muted-foreground leading-relaxed">{skill.description}</p>
                  </div>
                  
                  {/* Corner Accent */}
                  <div className="absolute -bottom-8 -right-8 w-24 h-24 bg-primary/10 rounded-full blur-2xl group-hover:bg-primary/20 transition-colors duration-500" />
                </Card>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Skills;