import { useEffect, useRef, useState } from "react";
import { Card } from "@/components/ui/card";
import { Award, Briefcase, Coffee, Users, Code2, Sparkles } from "lucide-react";

const stats = [
  { icon: Briefcase, value: "50+", label: "Projects" },
  { icon: Users, value: "30+", label: "Clients" },
  { icon: Award, value: "5+", label: "Years" },
  { icon: Coffee, value: "∞", label: "Coffee" },
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
    <section id="about" ref={sectionRef} className="py-32 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-primary/5 to-transparent opacity-50" />
      
      <div className="container px-4 relative z-10">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="text-center mb-20">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-primary/30 bg-primary/5 mb-6">
              <Sparkles className="w-4 h-4 text-primary" />
              <span className="text-sm font-medium text-primary">About Me</span>
            </div>
            <h2 className="text-5xl md:text-7xl font-black mb-6">
              Building Digital
              <span className="block text-primary">Experiences</span>
            </h2>
          </div>

          {/* Content Grid */}
          <div className="grid md:grid-cols-2 gap-16 items-center mb-20">
            {/* Text Content */}
            <div className={`space-y-6 ${isVisible ? "animate-slide-in-left" : "opacity-0"}`}>
              <div className="space-y-4 text-lg text-muted-foreground leading-relaxed">
                <p>
                  I'm a <span className="text-foreground font-semibold">passionate developer</span> with 5+ years crafting web experiences that combine beautiful design with powerful functionality.
                </p>
                <p>
                  My expertise spans the <span className="text-foreground font-semibold">full stack</span> - from pixel-perfect frontends to robust backend systems. I believe in writing clean, maintainable code that scales.
                </p>
                <p>
                  When I'm not coding, I'm exploring emerging technologies and contributing to open-source projects.
                </p>
              </div>
            </div>

            {/* Visual Element */}
            <div className={`${isVisible ? "animate-fade-in-up" : "opacity-0"}`}>
              <div className="relative aspect-square">
                <div className="absolute inset-0 bg-gradient-to-br from-primary via-primary/50 to-accent rounded-3xl" />
                <div className="absolute inset-4 bg-background rounded-2xl flex items-center justify-center">
                  <Code2 className="w-32 h-32 text-primary" strokeWidth={1} />
                </div>
                <div className="absolute -top-4 -right-4 w-24 h-24 bg-primary/20 rounded-full blur-2xl" />
                <div className="absolute -bottom-4 -left-4 w-32 h-32 bg-accent/20 rounded-full blur-2xl" />
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
                  className={`relative overflow-hidden p-8 text-center bg-card border-border hover:border-primary/50 transition-all duration-300 group ${
                    isVisible ? "animate-fade-in-up" : "opacity-0"
                  }`}
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                  <Icon className="h-10 w-10 mx-auto mb-4 text-primary" strokeWidth={1.5} />
                  <div className="text-4xl font-black mb-2 text-foreground">{stat.value}</div>
                  <div className="text-sm text-muted-foreground font-medium uppercase tracking-wider">{stat.label}</div>
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
