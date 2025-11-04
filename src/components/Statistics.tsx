import { useEffect, useRef, useState } from "react";
import { Award, Code, Users, Briefcase } from "lucide-react";

const stats = [
  { icon: Briefcase, label: "Projects Completed", value: 150, suffix: "+" },
  { icon: Users, label: "Happy Clients", value: 80, suffix: "+" },
  { icon: Code, label: "Code Commits", value: 5000, suffix: "+" },
  { icon: Award, label: "Awards Won", value: 12, suffix: "" },
];

const Statistics = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [counts, setCounts] = useState(stats.map(() => 0));
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.3 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!isVisible) return;

    stats.forEach((stat, index) => {
      const duration = 2000;
      const steps = 60;
      const increment = stat.value / steps;
      let current = 0;

      const timer = setInterval(() => {
        current += increment;
        if (current >= stat.value) {
          setCounts((prev) => {
            const updated = [...prev];
            updated[index] = stat.value;
            return updated;
          });
          clearInterval(timer);
        } else {
          setCounts((prev) => {
            const updated = [...prev];
            updated[index] = Math.floor(current);
            return updated;
          });
        }
      }, duration / steps);
    });
  }, [isVisible]);

  return (
    <section ref={sectionRef} className="py-20 bg-gradient-to-b from-card/30 to-background relative overflow-hidden">
      {/* Animated background */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/20 rounded-full blur-3xl animate-float" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-accent/20 rounded-full blur-3xl animate-float" style={{ animationDelay: "1s" }} />
      </div>

      <div className="container px-4 relative z-10">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">Achievements & Impact</h2>
            <p className="text-xl text-muted-foreground">
              Numbers that speak for themselves
            </p>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            {stats.map((stat, index) => {
              const Icon = stat.icon;
              return (
                <div
                  key={index}
                  className="glass-effect p-8 rounded-xl text-center group hover:scale-105 transition-all duration-300"
                >
                  <div className="mb-4 inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-br from-primary to-accent">
                    <Icon className="h-8 w-8 text-primary-foreground" />
                  </div>
                  <div className="text-4xl md:text-5xl font-bold mb-2 bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                    {counts[index]}{stat.suffix}
                  </div>
                  <p className="text-muted-foreground font-medium">{stat.label}</p>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Statistics;
