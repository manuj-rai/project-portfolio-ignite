import { Button } from "@/components/ui/button";
import { ArrowRight, Github, Linkedin, Mail, Sparkles, ChevronDown } from "lucide-react";
import { useState, useEffect, useRef } from "react";
import { cn } from "@/lib/utils";

const Hero = () => {
  const [typedText, setTypedText] = useState("");
  const [currentRole, setCurrentRole] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const heroRef = useRef<HTMLElement>(null);
  
  const roles = [
    "Full-Stack Developer",
    "UI/UX Enthusiast", 
    "Problem Solver",
    "Tech Innovator"
  ];

  useEffect(() => {
    setIsVisible(true);
    
    // Typewriter effect
    let currentIndex = 0;
    const currentText = roles[currentRole];
    const typeInterval = setInterval(() => {
      if (currentIndex <= currentText.length) {
        setTypedText(currentText.slice(0, currentIndex));
        currentIndex++;
      } else {
        clearInterval(typeInterval);
        // Wait then start deleting
        setTimeout(() => {
          deleteText();
        }, 2000);
      }
    }, 100);

    return () => clearInterval(typeInterval);
  }, [currentRole]);

  const deleteText = () => {
    let currentIndex = typedText.length;
    const deleteInterval = setInterval(() => {
      if (currentIndex >= 0) {
        setTypedText(roles[currentRole].slice(0, currentIndex));
        currentIndex--;
      } else {
        clearInterval(deleteInterval);
        // Move to next role
        setCurrentRole((prev) => (prev + 1) % roles.length);
      }
    }, 50);
  };

  const scrollToSection = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section 
      ref={heroRef}
      id="hero" 
      className="relative min-h-screen flex items-center justify-center overflow-hidden bg-background"
    >
      {/* Enhanced Animated Background */}
      <div className="absolute inset-0">
        {/* Gradient Mesh */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,hsl(var(--primary)/0.15),transparent)]" />
        
        {/* Animated Grid - More subtle on mobile */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,hsl(var(--border)/0.1)_1px,transparent_1px),linear-gradient(to_bottom,hsl(var(--border)/0.1)_1px,transparent_1px)] bg-[size:3rem_3rem] md:bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)]" />
        
        {/* Floating Particles */}
        <div className="absolute inset-0 opacity-30">
          {[...Array(20)].map((_, i) => (
            <div
              key={i}
              className="absolute w-1 h-1 bg-primary rounded-full animate-float"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 20}s`,
                animationDuration: `${20 + Math.random() * 20}s`,
              }}
            />
          ))}
        </div>
      </div>

      {/* Content */}
      <div className="container relative z-10 px-6 md:px-4 py-20 md:py-32">
        <div className="max-w-4xl mx-auto">
          <div className={cn(
            "flex flex-col items-center text-center space-y-8 md:space-y-12 transition-all duration-700 transform",
            isVisible ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
          )}>
            {/* Enhanced Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2.5 rounded-full border border-primary/30 bg-primary/5 backdrop-blur-xl shadow-lg hover:shadow-primary/10 transition-all duration-300 hover:scale-105">
              <Sparkles className="w-4 h-4 text-primary animate-pulse" />
              <span className="text-sm font-medium text-primary bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">
                Available for Projects
              </span>
            </div>
            
            {/* Enhanced Main Heading */}
            <div className="space-y-6 md:space-y-8">
              {/* Welcome Text */}
              <div className="space-y-2">
                <p className="text-lg md:text-xl text-primary font-medium tracking-wide">
                  Hi, I'm John Doe 👋
                </p>
                <h1 className="text-4xl sm:text-5xl md:text-7xl lg:text-8xl font-black tracking-tight leading-tight">
                  <span className="bg-gradient-to-r from-foreground via-foreground to-primary bg-clip-text text-transparent">
                    {typedText}
                  </span>
                  <span className="animate-pulse text-primary ml-1">|</span>
                </h1>
              </div>
              
              <p className="text-lg md:text-xl lg:text-2xl text-muted-foreground max-w-2xl mx-auto font-light leading-relaxed px-4">
                Crafting <span className="text-primary font-medium">digital experiences</span> with clean code, 
                modern design, and user-focused solutions
              </p>
            </div>

            {/* Enhanced CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 pt-2">
              <Button 
                size="lg" 
                className="group relative overflow-hidden bg-primary hover:bg-primary/90 text-primary-foreground px-8 py-6 text-base font-semibold shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 min-w-[140px]"
                onClick={() => scrollToSection("contact")}
              >
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -skew-x-12 group-hover:animate-shine" />
                <span className="relative z-10 flex items-center gap-2">
                  Let's Talk
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-200" />
                </span>
              </Button>
              
              <Button 
                size="lg" 
                variant="outline"
                className="px-8 py-6 text-base font-semibold border-2 bg-background/50 backdrop-blur-sm hover:bg-accent hover:scale-105 transition-all duration-300 min-w-[140px]"
                onClick={() => scrollToSection("projects")}
              >
                View Work
              </Button>
            </div>

            {/* Enhanced Social Links */}
            <div className="flex gap-4 pt-6 md:pt-8">
              {[
                { icon: Github, href: "https://github.com", label: "GitHub" },
                { icon: Linkedin, href: "https://linkedin.com", label: "LinkedIn" },
                { icon: Mail, href: "mailto:contact@example.com", label: "Email" }
              ].map((social, index) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={cn(
                    "w-12 h-12 rounded-xl border border-border hover:border-primary bg-card/50 backdrop-blur-sm hover:bg-primary/10 flex items-center justify-center transition-all duration-300 hover:scale-110 shadow-sm hover:shadow-md",
                    "transform transition-all duration-500",
                    isVisible ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"
                  )}
                  style={{ transitionDelay: `${600 + index * 100}ms` }}
                  aria-label={social.label}
                >
                  <social.icon className="w-5 h-5" />
                </a>
              ))}
            </div>

            {/* Stats Bar */}
            <div className="grid grid-cols-3 gap-6 md:gap-12 pt-8 md:pt-12 w-full max-w-2xl">
              {[
                { number: "2+", label: "Years Experience" },
                { number: "50+", label: "Projects Done" },
                { number: "100%", label: "Client Satisfaction" }
              ].map((stat, index) => (
                <div 
                  key={stat.label}
                  className={cn(
                    "text-center transform transition-all duration-500",
                    isVisible ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"
                  )}
                  style={{ transitionDelay: `${800 + index * 100}ms` }}
                >
                  <div className="text-2xl md:text-3xl font-bold text-primary">{stat.number}</div>
                  <div className="text-xs md:text-sm text-muted-foreground font-medium mt-1">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Enhanced Scroll Indicator */}
      <button 
        onClick={() => scrollToSection("about")}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3 group animate-bounce hover:animate-none transition-transform duration-300 hover:scale-110"
        aria-label="Scroll to next section"
      >
        <div className="flex flex-col items-center gap-1">
          <div className="w-[2px] h-12 bg-gradient-to-b from-primary/50 via-primary to-transparent group-hover:from-primary group-hover:via-primary" />
          <ChevronDown className="w-5 h-5 text-primary group-hover:scale-110 transition-transform" />
        </div>
      </button>
    </section>
  );
};

export default Hero;
