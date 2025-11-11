import { useEffect, useRef, useState } from "react";
import { Card } from "@/components/ui/card";
import { Award, Briefcase, Coffee, Users, Code2, Sparkles, Rocket, Target, Zap } from "lucide-react";
import { cn } from "@/lib/utils";

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

  const skills = [
    { name: "Frontend", level: 95, color: "from-blue-500 to-cyan-500" },
    { name: "Backend", level: 88, color: "from-purple-500 to-pink-500" },
    { name: "UI/UX Design", level: 82, color: "from-green-500 to-emerald-500" },
    { name: "DevOps", level: 75, color: "from-orange-500 to-red-500" },
  ];

  const highlights = [
    { icon: Rocket, title: "Fast Delivery", description: "Quick turnaround without compromising quality" },
    { icon: Target, title: "Precision", description: "Pixel-perfect implementation every time" },
    { icon: Zap, title: "Modern Tech", description: "Using the latest tools and frameworks" },
  ];

  return (
    <section id="about" ref={sectionRef} className="py-20 lg:py-32 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 -left-10 w-80 h-80 bg-primary/10 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 -right-10 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-purple-500/10 rounded-full blur-3xl" />
      </div>

      <div className="container px-6 relative z-10">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="text-center mb-16 lg:mb-24">
            <div className={cn(
              "inline-flex items-center gap-3 px-6 py-3 rounded-2xl bg-background/80 backdrop-blur-md border border-border shadow-lg mb-8 transition-all duration-700",
              isVisible ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
            )}>
              <div className="w-2 h-2 bg-primary rounded-full animate-pulse" />
              <span className="text-sm font-semibold text-foreground">About Me</span>
            </div>
            <h2 className={cn(
              "text-4xl sm:text-5xl lg:text-6xl font-bold mb-6 transition-all duration-700",
              isVisible ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
            )}>
              Crafting Digital
              <span className="block bg-gradient-to-r from-primary to-blue-600 bg-clip-text text-transparent">
                Excellence
              </span>
            </h2>
          </div>

          {/* Main Content Grid */}
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-start mb-20 lg:mb-28">
            {/* Text Content */}
            <div className="space-y-8">
              <div className={cn(
                "space-y-6 transition-all duration-700 delay-200",
                isVisible ? "translate-x-0 opacity-100" : "-translate-x-10 opacity-0"
              )}>
                <p className="text-xl text-muted-foreground leading-relaxed">
                  I'm a <span className="text-foreground font-semibold">full-stack developer</span> passionate about creating digital experiences that are not just functional, but truly exceptional.
                </p>
                <p className="text-lg text-muted-foreground leading-relaxed">
                  With expertise spanning modern frontend frameworks and robust backend systems, I bridge the gap between design and technology to deliver solutions that users love.
                </p>
                <p className="text-lg text-muted-foreground leading-relaxed">
                  I believe in <span className="text-foreground font-semibold">clean code</span>, <span className="text-foreground font-semibold">thoughtful design</span>, and <span className="text-foreground font-semibold">continuous learning</span>.
                </p>
              </div>

              {/* Skills Progress */}
              <div className={cn(
                "space-y-6 transition-all duration-700 delay-300",
                isVisible ? "translate-x-0 opacity-100" : "-translate-x-10 opacity-0"
              )}>
                {skills.map((skill, index) => (
                  <div key={skill.name} className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="font-semibold text-foreground">{skill.name}</span>
                      <span className="text-sm text-muted-foreground">{skill.level}%</span>
                    </div>
                    <div className="w-full bg-accent rounded-full h-2 overflow-hidden">
                      <div 
                        className={cn(
                          "h-full rounded-full bg-gradient-to-r transition-all duration-1000 ease-out",
                          skill.color,
                          isVisible ? "w-full" : "w-0"
                        )}
                        style={{ width: isVisible ? `${skill.level}%` : '0%' }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Visual Content */}
            <div className={cn(
              "space-y-8 transition-all duration-700 delay-200",
              isVisible ? "translate-x-0 opacity-100" : "translate-x-10 opacity-0"
            )}>
              {/* Main Visual Card */}
              <Card className="relative bg-gradient-to-br from-background to-accent/30 rounded-3xl border border-border p-8 shadow-2xl overflow-hidden">
                <div className="absolute -top-20 -right-20 w-40 h-40 bg-primary/10 rounded-full blur-2xl" />
                <div className="absolute -bottom-20 -left-20 w-40 h-40 bg-blue-500/10 rounded-full blur-2xl" />
                
                <div className="relative z-10">
                  <div className="flex items-center gap-4 mb-6">
                    <div className="w-16 h-16 bg-gradient-to-r from-primary to-blue-600 rounded-2xl flex items-center justify-center">
                      <Code2 className="w-8 h-8 text-white" />
                    </div>
                    <div>
                      <h3 className="font-bold text-xl">John Doe</h3>
                      <p className="text-muted-foreground">Full-Stack Developer</p>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4 mb-6">
                    {['React', 'TypeScript', 'Node.js', 'Tailwind'].map((tech) => (
                      <div key={tech} className="px-3 py-2 bg-background/50 rounded-lg text-center text-sm font-medium border border-border">
                        {tech}
                      </div>
                    ))}
                  </div>

                  <div className="p-4 bg-background/50 rounded-xl border border-border">
                    <div className="text-sm font-semibold mb-2">Currently Learning</div>
                    <div className="text-xs text-muted-foreground">AI/ML Integration & Web3 Technologies</div>
                  </div>
                </div>
              </Card>

              {/* Highlights Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {highlights.map((item, index) => {
                  const Icon = item.icon;
                  return (
                    <Card 
                      key={item.title}
                      className={cn(
                        "p-4 text-center bg-background/50 backdrop-blur-sm border border-border transition-all duration-500 hover:scale-105 hover:border-primary/50",
                        isVisible ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
                      )}
                      style={{ transitionDelay: `${400 + index * 100}ms` }}
                    >
                      <Icon className="w-8 h-8 mx-auto mb-3 text-primary" />
                      <div className="font-semibold text-sm mb-1">{item.title}</div>
                      <div className="text-xs text-muted-foreground">{item.description}</div>
                    </Card>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Stats Section */}
          <div className={cn(
            "grid grid-cols-2 lg:grid-cols-4 gap-6 transition-all duration-700",
            isVisible ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
          )}>
            {[
              { icon: Briefcase, value: "50+", label: "Projects Completed", suffix: "" },
              { icon: Users, value: "30", label: "Happy Clients", suffix: "+" },
              { icon: Award, value: "5", label: "Years Experience", suffix: "+" },
              { icon: Coffee, value: "1000", label: "Cups of Coffee", suffix: "+" },
            ].map((stat, index) => {
              const Icon = stat.icon;
              return (
                <Card
                  key={index}
                  className="relative group overflow-hidden p-6 bg-background/50 backdrop-blur-sm border border-border hover:border-primary/50 transition-all duration-500 hover:scale-105"
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                  <Icon className="h-8 w-8 mb-4 text-primary group-hover:scale-110 transition-transform" />
                  <div className="text-2xl lg:text-3xl font-bold mb-1">
                    {stat.value}<span className="text-primary">{stat.suffix}</span>
                  </div>
                  <div className="text-sm text-muted-foreground font-medium">{stat.label}</div>
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
