import { Briefcase, GraduationCap, Sparkles } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const experiences = [
  {
    type: "work",
    title: "Senior Full Stack Developer",
    company: "Tech Innovators Inc.",
    period: "2022 - Present",
    description: "Leading development of scalable web applications. Managing teams and delivering high-impact projects.",
    technologies: ["React", "Node.js", "AWS", "PostgreSQL"],
  },
  {
    type: "work",
    title: "Full Stack Developer",
    company: "Digital Solutions Co.",
    period: "2020 - 2022",
    description: "Built and maintained client projects with modern technologies and best practices.",
    technologies: ["Vue.js", "Express", "MongoDB", "Docker"],
  },
  {
    type: "education",
    title: "BSc Computer Science",
    company: "University of Technology",
    period: "2016 - 2020",
    description: "Graduated with honors. Specialized in software engineering and web development.",
    technologies: ["Data Structures", "Algorithms", "Software Design"],
  },
];

const Experience = () => {
  return (
    <section id="experience" className="py-32 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-primary/5 to-transparent" />
      
      <div className="container px-4 relative z-10">
        <div className="max-w-5xl mx-auto">
          {/* Header */}
          <div className="text-center mb-20">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-primary/30 bg-primary/5 mb-6">
              <Sparkles className="w-4 h-4 text-primary" />
              <span className="text-sm font-medium text-primary">Journey</span>
            </div>
            <h2 className="text-5xl md:text-7xl font-black mb-6">
              Experience &
              <span className="block text-primary">Education</span>
            </h2>
          </div>

          {/* Timeline */}
          <div className="relative space-y-8">
            {/* Center Line */}
            <div className="hidden md:block absolute left-1/2 top-0 bottom-0 w-[2px] bg-gradient-to-b from-transparent via-primary to-transparent" />

            {experiences.map((exp, index) => (
              <div
                key={index}
                className="relative"
              >
                {/* Timeline Dot */}
                <div className="hidden md:flex absolute left-1/2 top-8 -translate-x-1/2 z-10">
                  <div className="w-16 h-16 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center shadow-lg shadow-primary/50">
                    {exp.type === "work" ? (
                      <Briefcase className="w-7 h-7 text-primary-foreground" />
                    ) : (
                      <GraduationCap className="w-7 h-7 text-primary-foreground" />
                    )}
                  </div>
                </div>

                {/* Content Card */}
                <div className={`md:w-[calc(50%-4rem)] ${index % 2 === 0 ? "md:ml-auto md:pl-16" : "md:pr-16"}`}>
                  <Card className="group relative overflow-hidden p-8 bg-card border-border hover:border-primary transition-all duration-500">
                    <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                    
                    <div className="relative z-10 space-y-4">
                      {/* Mobile Icon */}
                      <div className="md:hidden w-12 h-12 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center mb-4">
                        {exp.type === "work" ? (
                          <Briefcase className="w-6 h-6 text-primary-foreground" />
                        ) : (
                          <GraduationCap className="w-6 h-6 text-primary-foreground" />
                        )}
                      </div>

                      <div>
                        <h3 className="text-2xl font-bold mb-2">{exp.title}</h3>
                        <p className="text-primary font-semibold text-lg">{exp.company}</p>
                        <p className="text-sm text-muted-foreground font-medium mt-2 uppercase tracking-wider">{exp.period}</p>
                      </div>

                      <p className="text-muted-foreground leading-relaxed">{exp.description}</p>
                      
                      <div className="flex flex-wrap gap-2 pt-2">
                        {exp.technologies.map((tech) => (
                          <Badge key={tech} variant="secondary" className="px-3 py-1">
                            {tech}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </Card>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Experience;
