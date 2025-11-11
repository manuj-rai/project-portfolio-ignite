import { Button } from "@/components/ui/button";
import { ArrowRight, Github, Linkedin, Mail, Play } from "lucide-react";
import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";

const Hero = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const scrollToSection = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-background">
      {/* Modern Geometric Background */}
      <div className="absolute inset-0">
        {/* Primary Gradient Blobs */}
        <div className="absolute top-1/4 -left-10 w-72 h-72 bg-primary/20 rounded-full blur-3xl animate-float" />
        <div className="absolute bottom-1/4 -right-10 w-96 h-96 bg-blue-500/15 rounded-full blur-3xl animate-float" style={{ animationDelay: '2s' }} />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-purple-500/10 rounded-full blur-3xl animate-float" style={{ animationDelay: '4s' }} />
        
        {/* Grid Pattern */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,transparent_95%,hsl(var(--border)/0.03)_95%),linear-gradient(to_bottom,transparent_95%,hsl(var(--border)/0.03)_95%)] bg-[size:60px_60px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,black_30%,transparent_100%)]" />
      </div>

      {/* Main Content */}
      <div className="container relative z-10 px-6 py-20">
        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Text Content */}
            <div className={cn(
              "space-y-8 transition-all duration-700",
              isVisible ? "translate-x-0 opacity-100" : "-translate-x-10 opacity-0"
            )}>
              {/* Badge */}
              <div className="inline-flex items-center gap-3 px-4 py-2 rounded-2xl bg-background/80 backdrop-blur-md border border-border shadow-lg">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                <span className="text-sm font-semibold text-foreground">
                  Available for new projects
                </span>
              </div>

              {/* Main Headline */}
              <div className="space-y-6">
                <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold tracking-tight leading-none">
                  <span className="block text-foreground">Creating</span>
                  <span className="block bg-gradient-to-r from-primary to-blue-600 bg-clip-text text-transparent">
                    Digital
                  </span>
                  <span className="block text-foreground">Experiences</span>
                </h1>
                
                <p className="text-xl text-muted-foreground leading-relaxed max-w-lg">
                  I design and build modern web applications with focus on performance, 
                  accessibility, and beautiful user interfaces.
                </p>
              </div>

              {/* Stats */}
              <div className="flex gap-8">
                {[
                  { value: "2+", label: "Years" },
                  { value: "50+", label: "Projects" },
                  { value: "100%", label: "Satisfaction" }
                ].map((stat, index) => (
                  <div key={stat.label} className="text-center">
                    <div className="text-2xl font-bold text-primary">{stat.value}</div>
                    <div className="text-sm text-muted-foreground font-medium">{stat.label}</div>
                  </div>
                ))}
              </div>

              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 pt-4">
                <Button 
                  size="lg"
                  className="group relative bg-foreground text-background hover:bg-foreground/90 px-8 py-6 text-lg font-semibold rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
                  onClick={() => scrollToSection("contact")}
                >
                  <span className="flex items-center gap-3">
                    Start a Project
                    <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </span>
                </Button>
                
                <Button 
                  size="lg"
                  variant="outline"
                  className="px-8 py-6 text-lg font-semibold rounded-2xl border-2 bg-background/50 backdrop-blur-sm hover:bg-accent hover:scale-105 transition-all duration-300"
                  onClick={() => scrollToSection("projects")}
                >
                  <span className="flex items-center gap-3">
                    View Work
                    <Play className="w-4 h-4" />
                  </span>
                </Button>
              </div>

              {/* Social Links */}
              <div className="flex gap-4 pt-6">
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
                      "w-14 h-14 rounded-2xl border border-border bg-background/60 backdrop-blur-sm hover:bg-primary/10 flex items-center justify-center transition-all duration-300 hover:scale-110 hover:border-primary shadow-sm",
                      "transform transition-all duration-500"
                    )}
                    style={{ animationDelay: `${600 + index * 100}ms` }}
                    aria-label={social.label}
                  >
                    <social.icon className="w-6 h-6" />
                  </a>
                ))}
              </div>
            </div>

            {/* Visual Content */}
            <div className={cn(
              "relative transition-all duration-700",
              isVisible ? "translate-x-0 opacity-100" : "translate-x-10 opacity-0"
            )}>
              {/* Main Card */}
              <div className="relative bg-gradient-to-br from-background to-accent/30 rounded-3xl border border-border p-8 shadow-2xl backdrop-blur-sm">
                {/* Floating Elements */}
                <div className="absolute -top-4 -right-4 w-20 h-20 bg-primary rounded-2xl rotate-12 shadow-lg" />
                <div className="absolute -bottom-4 -left-4 w-16 h-16 bg-blue-500 rounded-2xl -rotate-12 shadow-lg" />
                
                {/* Content Inside Card */}
                <div className="relative z-10 space-y-6">
                  {/* Profile */}
                  <div className="flex items-center gap-4">
                    <div className="w-16 h-16 bg-gradient-to-r from-primary to-blue-600 rounded-2xl" />
                    <div>
                      <div className="font-bold text-lg">John Doe</div>
                      <div className="text-sm text-muted-foreground">Full-Stack Developer</div>
                    </div>
                  </div>

                  {/* Skills */}
                  <div className="grid grid-cols-2 gap-3">
                    {['React', 'TypeScript', 'Node.js', 'UI/UX'].map((skill) => (
                      <div key={skill} className="px-3 py-2 bg-background/50 rounded-lg text-center text-sm font-medium border border-border">
                        {skill}
                      </div>
                    ))}
                  </div>

                  {/* Current Project */}
                  <div className="space-y-3">
                    <div className="text-sm font-semibold">Currently Working On</div>
                    <div className="p-4 bg-background/50 rounded-xl border border-border">
                      <div className="font-medium">E-commerce Platform</div>
                      <div className="text-xs text-muted-foreground mt-1">Next.js + Stripe + Tailwind</div>
                      <div className="w-full bg-border rounded-full h-2 mt-3">
                        <div className="bg-primary rounded-full h-2 w-3/4" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Background Decorative Elements */}
              <div className="absolute -z-10 top-8 -right-8 w-32 h-32 bg-primary/10 rounded-3xl rotate-45" />
              <div className="absolute -z-10 bottom-8 -left-8 w-24 h-24 bg-blue-500/10 rounded-3xl -rotate-45" />
            </div>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <button 
        onClick={() => scrollToSection("about")}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 group animate-bounce"
        aria-label="Scroll to next section"
      >
        <div className="w-6 h-10 border-2 border-foreground/30 rounded-full flex justify-center">
          <div className="w-1 h-3 bg-foreground/50 rounded-full mt-2 group-hover:bg-foreground transition-colors" />
        </div>
        <span className="text-xs text-muted-foreground font-medium">Scroll</span>
      </button>
    </section>
  );
};

export default Hero;
