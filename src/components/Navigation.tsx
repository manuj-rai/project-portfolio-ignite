import { useState, useEffect } from "react";
import { Home, User, Briefcase, Mail, FolderOpen, Shield } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";
import { useNavigate } from "react-router-dom";
import { ThemeToggle } from "@/components/ThemeToggle";

const Navigation = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("hero");
  const { isAdmin } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);

      // Update active section based on scroll position
      const sections = ["hero", "about", "services", "projects", "contact"];
      const currentSection = sections.find((section) => {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          return rect.top <= 100 && rect.bottom >= 100;
        }
        return false;
      });
      if (currentSection) {
        setActiveSection(currentSection);
      }
    };
    
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    setActiveSection(id);
  };

  const navLinks = [
    { label: "Home", href: "hero", icon: Home },
    { label: "About", href: "about", icon: User },
    { label: "Services", href: "services", icon: Briefcase },
    { label: "Projects", href: "projects", icon: FolderOpen },
    { label: "Contact", href: "contact", icon: Mail },
  ];

  return (
    <>
      {/* Mobile Bottom Navigation - Instagram Style (Mobile First) */}
      <nav className="fixed bottom-0 left-0 right-0 z-50 bg-card/95 backdrop-blur-lg border-t border-border shadow-lg md:hidden">
        <div className="flex items-center justify-around h-16 px-1">
          {navLinks.map((link) => {
            const Icon = link.icon;
            const isActive = activeSection === link.href;
            return (
              <button
                key={link.href}
                onClick={() => scrollToSection(link.href)}
                className="flex flex-col items-center justify-center gap-1 p-2 flex-1 transition-all duration-200 relative group"
              >
                <Icon 
                  className={`h-6 w-6 transition-all duration-200 ${
                    isActive 
                      ? "text-primary scale-110" 
                      : "text-muted-foreground group-active:scale-95"
                  }`}
                  strokeWidth={isActive ? 2.5 : 2}
                />
                <span 
                  className={`text-[10px] font-medium transition-all duration-200 ${
                    isActive ? "text-primary" : "text-muted-foreground"
                  }`}
                >
                  {link.label}
                </span>
                {isActive && (
                  <div className="absolute -top-[1px] left-1/2 -translate-x-1/2 w-12 h-[3px] bg-primary rounded-full" />
                )}
              </button>
            );
          })}
        </div>
      </nav>

      {/* Desktop Navigation */}
      <nav
        className={`hidden md:block fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled
            ? "bg-card/95 backdrop-blur-lg border-b border-border shadow-lg"
            : "bg-transparent"
        }`}
      >
        <div className="container px-4">
          <div className="flex items-center justify-between h-20">
            <button
              onClick={() => scrollToSection("hero")}
              className="text-2xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent hover:scale-105 transition-transform"
            >
              Portfolio
            </button>

            <div className="flex items-center gap-6">
              {navLinks.map((link) => {
                const isActive = activeSection === link.href;
                return (
                  <button
                    key={link.href}
                    onClick={() => scrollToSection(link.href)}
                    className={`relative transition-colors font-medium ${
                      isActive ? "text-primary" : "text-foreground/70 hover:text-foreground"
                    }`}
                  >
                    {link.label}
                    {isActive && (
                      <div className="absolute -bottom-2 left-0 right-0 h-[2px] bg-primary rounded-full" />
                    )}
                  </button>
                );
              })}
              
              <ThemeToggle />
              
              {isAdmin && (
                <button
                  onClick={() => navigate("/admin")}
                  className="flex items-center gap-2 text-foreground/70 hover:text-foreground transition-colors"
                >
                  <Shield className="h-4 w-4" />
                  Admin
                </button>
              )}
            </div>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navigation;
