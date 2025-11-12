import { useState, useEffect } from "react";
import { Home, User, Briefcase, Mail, FolderOpen, Menu, X, Sparkles } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";
import { useNavigate } from "react-router-dom";
import { ThemeToggle } from "@/components/ThemeToggle";
import { cn } from "@/lib/utils";

const Navigation = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("hero");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { isAdmin } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);

      // Update active section based on scroll position
      const sections = ["hero", "services", "projects", "contact"];
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
    setMobileMenuOpen(false);
  };

  const navLinks = [
    { label: "Home", href: "hero", icon: Home },
    { label: "Work", href: "services", icon: Briefcase },
    { label: "Projects", href: "projects", icon: FolderOpen },
    { label: "Contact", href: "contact", icon: Mail },
  ];

  return (
    <>
      {/* Desktop Navigation - Modern Glass Morphism */}
      <nav
        className={cn(
          "hidden md:block fixed top-6 left-1/2 -translate-x-1/2 z-50 transition-all duration-500",
          isScrolled ? "top-4" : "top-6"
        )}
      >
        <div
          className={cn(
            "flex items-center gap-1 px-6 py-3 rounded-2xl border backdrop-blur-xl transition-all duration-500 shadow-lg",
            isScrolled
              ? "bg-card/80 border-border/50 shadow-xl"
              : "bg-card/40 border-border/30 shadow-lg"
          )}
        >
          {/* Logo/Brand */}
          <button
            onClick={() => scrollToSection("hero")}
            className="flex items-center gap-2 mr-4 px-3 py-2 rounded-xl bg-gradient-to-r from-primary/10 to-blue-500/10 hover:from-primary/20 hover:to-blue-500/20 transition-all duration-300 group"
          >
            <Sparkles className="h-5 w-5 text-primary group-hover:scale-110 transition-transform" />
            <span className="font-bold bg-gradient-to-r from-primary to-blue-600 bg-clip-text text-transparent">
              Portfolio
            </span>
          </button>

          {/* Navigation Links */}
          <div className="flex items-center gap-1">
            {navLinks.map((link) => {
              const isActive = activeSection === link.href;
              return (
                <button
                  key={link.href}
                  onClick={() => scrollToSection(link.href)}
                  className={cn(
                    "relative px-4 py-2 rounded-xl text-sm font-medium transition-all duration-300 group",
                    isActive
                      ? "text-primary bg-primary/10"
                      : "text-muted-foreground hover:text-foreground hover:bg-accent/50"
                  )}
                >
                  <span className="relative z-10">{link.label}</span>
                  {isActive && (
                    <div className="absolute inset-0 bg-gradient-to-r from-primary/10 to-blue-500/10 rounded-xl border border-primary/20" />
                  )}
                </button>
              );
            })}
          </div>

          {/* Right Side Actions */}
          <div className="flex items-center gap-2 ml-4 pl-4 border-l border-border/50">
            <ThemeToggle />
            
            {isAdmin && (
              <button
                onClick={() => navigate("/admin")}
                className="flex items-center gap-2 px-3 py-2 rounded-xl text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-accent/50 transition-all duration-300 group"
              >
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                Admin
              </button>
            )}
          </div>
        </div>
      </nav>

      {/* Mobile Navigation - Modern Bottom Bar */}
      <nav className="md:hidden fixed bottom-4 left-1/2 -translate-x-1/2 z-50 w-[95vw] max-w-md">
        <div className="bg-card/80 backdrop-blur-xl border border-border/50 rounded-2xl shadow-2xl">
          <div className="flex items-center justify-between px-2 py-2">
            {navLinks.map((link, index) => {
              const Icon = link.icon;
              const isActive = activeSection === link.href;
              return (
                <button
                  key={link.href}
                  onClick={() => scrollToSection(link.href)}
                  className={cn(
                    "flex flex-col items-center justify-center gap-1 p-3 rounded-xl transition-all duration-300 relative group flex-1",
                    isActive
                      ? "text-primary bg-primary/10"
                      : "text-muted-foreground hover:text-foreground hover:bg-accent/50"
                  )}
                >
                  <Icon 
                    className={cn(
                      "h-5 w-5 transition-all duration-300",
                      isActive && "scale-110"
                    )}
                    strokeWidth={isActive ? 2.5 : 2}
                  />
                  <span 
                    className={cn(
                      "text-[10px] font-medium transition-all duration-300",
                      isActive ? "text-primary" : "text-muted-foreground"
                    )}
                  >
                    {link.label}
                  </span>
                  
                  {isActive && (
                    <div className="absolute -top-1 left-1/2 -translate-x-1/2 w-6 h-1 bg-primary rounded-full" />
                  )}
                </button>
              );
            })}
            
            {/* Mobile Menu Toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="flex flex-col items-center justify-center gap-1 p-3 rounded-xl text-muted-foreground hover:text-foreground hover:bg-accent/50 transition-all duration-300 flex-1"
            >
              {mobileMenuOpen ? (
                <X className="h-5 w-5" />
              ) : (
                <Menu className="h-5 w-5" />
              )}
              <span className="text-[10px] font-medium">More</span>
            </button>
          </div>

          {/* Expanded Mobile Menu */}
          {mobileMenuOpen && (
            <div className="border-t border-border/50 px-4 py-3 animate-in slide-in-from-bottom-4 duration-300">
              <div className="flex items-center justify-between">
                <ThemeToggle />
                
                {isAdmin && (
                  <button
                    onClick={() => navigate("/admin")}
                    className="flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-accent/50 transition-all duration-300"
                  >
                    <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                    Admin
                  </button>
                )}
                
                <button
                  onClick={() => scrollToSection("hero")}
                  className="flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium bg-gradient-to-r from-primary/10 to-blue-500/10 text-primary transition-all duration-300"
                >
                  <Sparkles className="h-4 w-4" />
                  Portfolio
                </button>
              </div>
            </div>
          )}
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      {mobileMenuOpen && (
        <div 
          className="md:hidden fixed inset-0 z-40 bg-background/80 backdrop-blur-sm"
          onClick={() => setMobileMenuOpen(false)}
        />
      )}
    </>
  );
};

export default Navigation;
