import { useEffect, useRef, useState } from "react";
import { Card } from "@/components/ui/card";
import { Award, Briefcase, Coffee, Users } from "lucide-react";

const stats = [
  { icon: Briefcase, value: "50+", label: "Projects Completed" },
  { icon: Users, value: "30+", label: "Happy Clients" },
  { icon: Award, value: "5+", label: "Years Experience" },
  { icon: Coffee, value: "1000+", label: "Cups of Coffee" },
];

const About = () => {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section id="about" ref={sectionRef} className="py-20 bg-gradient-to-b from-background to-card/30">
      <div className="container px-4">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center mb-16">
            {/* Text Content */}
            <div className={`space-y-6 ${isVisible ? "animate-slide-in-left" : "opacity-0"}`}>
              <h2 className="text-4xl md:text-5xl font-bold">About Me</h2>
              <div className="space-y-4 text-lg text-muted-foreground">
                <p>
                  I'm a passionate full-stack developer with over 5 years of experience building
                  web applications that make a difference. My journey in tech started with a
                  curiosity for problem-solving and has evolved into a career I love.
                </p>
                <p>
                  I specialize in creating scalable, user-friendly applications using modern
                  technologies. From concept to deployment, I bring ideas to life with clean code
                  and thoughtful design.
                </p>
                <p>
                  When I'm not coding, you'll find me exploring new technologies, contributing to
                  open-source projects, or sharing knowledge with the developer community.
                </p>
              </div>
            </div>

            {/* Image Placeholder */}
            <div className={`${isVisible ? "animate-fade-in-up" : "opacity-0"}`}>
              <div className="aspect-square rounded-2xl bg-gradient-to-br from-primary/20 to-accent/20 border-2 border-primary/20 flex items-center justify-center overflow-hidden">
                <div className="text-9xl font-bold text-primary/30">DEV</div>
              </div>
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {stats.map((stat, index) => {
              const Icon = stat.icon;
              return (
                <Card
                  key={index}
                  className={`p-6 text-center bg-card/50 backdrop-blur border-border hover:border-primary/50 transition-all duration-300 ${
                    isVisible ? "animate-fade-in-up" : "opacity-0"
                  }`}
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <Icon className="h-8 w-8 mx-auto mb-3 text-primary" />
                  <div className="text-3xl font-bold mb-1">{stat.value}</div>
                  <div className="text-sm text-muted-foreground">{stat.label}</div>
                </Card>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
