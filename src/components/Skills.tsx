import { Code, Database, Globe, Smartphone, Cloud, Zap } from "lucide-react";
import { Card } from "@/components/ui/card";

const skills = [
  {
    icon: Code,
    title: "Frontend Development",
    description: "React, TypeScript, Next.js, Tailwind CSS",
  },
  {
    icon: Database,
    title: "Backend Development",
    description: "Node.js, PostgreSQL, REST APIs, GraphQL",
  },
  {
    icon: Cloud,
    title: "Cloud & DevOps",
    description: "AWS, Docker, CI/CD, Serverless",
  },
  {
    icon: Smartphone,
    title: "Mobile Development",
    description: "React Native, Progressive Web Apps",
  },
  {
    icon: Globe,
    title: "Web Design",
    description: "UI/UX, Responsive Design, Accessibility",
  },
  {
    icon: Zap,
    title: "Performance",
    description: "Optimization, SEO, Core Web Vitals",
  },
];

const Skills = () => {
  return (
    <section id="skills" className="py-20 bg-gradient-to-b from-background to-card/30">
      <div className="container px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">Skills & Expertise</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              A comprehensive skill set covering the full development lifecycle
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {skills.map((skill, index) => {
              const Icon = skill.icon;
              return (
                <Card 
                  key={index}
                  className="p-6 bg-card/50 backdrop-blur border-border hover:border-primary/50 transition-all duration-300 hover:shadow-[0_0_30px_rgba(96,165,250,0.15)] group"
                >
                  <div className="mb-4 w-12 h-12 rounded-lg bg-gradient-to-br from-primary to-accent flex items-center justify-center group-hover:scale-110 transition-transform">
                    <Icon className="h-6 w-6 text-primary-foreground" />
                  </div>
                  <h3 className="text-xl font-semibold mb-2">{skill.title}</h3>
                  <p className="text-muted-foreground">{skill.description}</p>
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