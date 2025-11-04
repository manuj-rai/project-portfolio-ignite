import { Briefcase, GraduationCap } from "lucide-react";
import { Card } from "@/components/ui/card";

const experiences = [
  {
    type: "work",
    title: "Senior Full Stack Developer",
    company: "Tech Innovators Inc.",
    period: "2022 - Present",
    description: "Leading development of scalable web applications using React, Node.js, and cloud technologies. Managed a team of 5 developers.",
    technologies: ["React", "Node.js", "AWS", "PostgreSQL"],
  },
  {
    type: "work",
    title: "Full Stack Developer",
    company: "Digital Solutions Co.",
    period: "2020 - 2022",
    description: "Built and maintained multiple client projects, focusing on modern web technologies and best practices.",
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
    <section id="experience" className="py-20 bg-background">
      <div className="container px-4">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">Experience & Education</h2>
            <p className="text-xl text-muted-foreground">
              My professional journey and academic background
            </p>
          </div>

          <div className="relative">
            {/* Timeline line */}
            <div className="hidden md:block absolute left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-primary via-accent to-primary" />

            <div className="space-y-12">
              {experiences.map((exp, index) => (
                <div
                  key={index}
                  className={`relative flex items-center ${
                    index % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
                  }`}
                >
                  {/* Timeline dot */}
                  <div className="hidden md:flex absolute left-1/2 -translate-x-1/2 w-12 h-12 rounded-full bg-gradient-to-br from-primary to-accent items-center justify-center z-10 shadow-lg shadow-primary/50">
                    {exp.type === "work" ? (
                      <Briefcase className="h-6 w-6 text-primary-foreground" />
                    ) : (
                      <GraduationCap className="h-6 w-6 text-primary-foreground" />
                    )}
                  </div>

                  {/* Content card */}
                  <Card
                    className={`w-full md:w-[calc(50%-3rem)] p-6 bg-card/50 backdrop-blur border-border hover:border-primary/50 transition-all duration-300 hover:shadow-[0_0_30px_rgba(96,165,250,0.15)] ${
                      index % 2 === 0 ? "md:mr-auto" : "md:ml-auto"
                    }`}
                  >
                    <div className="flex items-start gap-4 mb-4 md:hidden">
                      <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center flex-shrink-0">
                        {exp.type === "work" ? (
                          <Briefcase className="h-5 w-5 text-primary-foreground" />
                        ) : (
                          <GraduationCap className="h-5 w-5 text-primary-foreground" />
                        )}
                      </div>
                      <div>
                        <h3 className="text-xl font-bold">{exp.title}</h3>
                        <p className="text-primary font-semibold">{exp.company}</p>
                      </div>
                    </div>

                    <div className="hidden md:block">
                      <h3 className="text-xl font-bold mb-1">{exp.title}</h3>
                      <p className="text-primary font-semibold mb-2">{exp.company}</p>
                    </div>

                    <p className="text-sm text-muted-foreground mb-3 font-medium">{exp.period}</p>
                    <p className="text-muted-foreground mb-4">{exp.description}</p>
                    
                    <div className="flex flex-wrap gap-2">
                      {exp.technologies.map((tech) => (
                        <span
                          key={tech}
                          className="px-3 py-1 rounded-full text-xs font-medium glass-effect"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </Card>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Experience;
