import { useEffect, useRef, useState } from "react";
import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";

interface Skill {
  name: string;
  level: number;
  category: string;
}

const skillsData: Skill[] = [
  { name: "React / Next.js", level: 95, category: "Frontend" },
  { name: "TypeScript", level: 90, category: "Frontend" },
  { name: "Tailwind CSS", level: 92, category: "Frontend" },
  { name: "Node.js", level: 88, category: "Backend" },
  { name: "PostgreSQL", level: 85, category: "Backend" },
  { name: "GraphQL", level: 82, category: "Backend" },
  { name: "AWS / Cloud", level: 80, category: "DevOps" },
  { name: "Docker", level: 78, category: "DevOps" },
];

const SkillProgress = () => {
  const [visibleSkills, setVisibleSkills] = useState<boolean[]>([]);
  const [progress, setProgress] = useState<number[]>([]);
  const sectionRef = useRef<HTMLDivElement>(null);
  const skillRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const index = skillRefs.current.findIndex((ref) => ref === entry.target);
            if (index !== -1) {
              setVisibleSkills((prev) => {
                const updated = [...prev];
                updated[index] = true;
                return updated;
              });
              
              // Animate progress bar
              setTimeout(() => {
                setProgress((prev) => {
                  const updated = [...prev];
                  updated[index] = skillsData[index].level;
                  return updated;
                });
              }, index * 100);
            }
          }
        });
      },
      { threshold: 0.2 }
    );

    skillRefs.current.forEach((ref) => {
      if (ref) observer.observe(ref);
    });

    return () => observer.disconnect();
  }, []);

  const categories = Array.from(new Set(skillsData.map((s) => s.category)));

  return (
    <section ref={sectionRef} className="py-20 bg-background">
      <div className="container px-4">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">Technical Proficiency</h2>
            <p className="text-xl text-muted-foreground">
              My expertise across different technologies
            </p>
          </div>

          <div className="space-y-12">
            {categories.map((category) => (
              <div key={category}>
                <h3 className="text-2xl font-bold mb-6 text-primary">{category}</h3>
                <div className="space-y-6">
                  {skillsData
                    .filter((skill) => skill.category === category)
                    .map((skill, index) => {
                      const globalIndex = skillsData.indexOf(skill);
                      return (
                        <div
                          key={skill.name}
                          ref={(el) => {
                            if (el) skillRefs.current[globalIndex] = el;
                          }}
                          className={`transition-all duration-500 ${
                            visibleSkills[globalIndex]
                              ? "opacity-100 translate-x-0"
                              : "opacity-0 -translate-x-10"
                          }`}
                        >
                          <div className="flex justify-between mb-2">
                            <span className="font-medium">{skill.name}</span>
                            <span className="text-muted-foreground">{skill.level}%</span>
                          </div>
                          <Progress 
                            value={progress[globalIndex] || 0} 
                            className="h-3"
                          />
                        </div>
                      );
                    })}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default SkillProgress;
