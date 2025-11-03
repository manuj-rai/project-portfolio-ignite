import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Home, User, Briefcase, Mail, FolderOpen } from "lucide-react";

const Navigation = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    setIsMobileMenuOpen(false);
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
      {/* Desktop Navigation */}
      <nav
        className={`hidden md:block fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled
            ? "bg-background/95 backdrop-blur-lg border-b border-border shadow-lg"
            : "bg-transparent"
        }`}
      >
        <div className="container px-4">
          <div className="flex items-center justify-between h-20">
            <button
              onClick={() => scrollToSection("hero")}
              className="text-2xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent"
            >
              Portfolio
            </button>

            <div className="flex items-center gap-8">
              {navLinks.map((link) => (
                <button
                  key={link.href}
                  onClick={() => scrollToSection(link.href)}
                  className="text-foreground/80 hover:text-foreground transition-colors"
                >
                  {link.label}
                </button>
              ))}
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile Bottom Navigation - Instagram Style */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 z-50 bg-background/95 backdrop-blur-lg border-t border-border">
        <div className="flex items-center justify-around h-16 px-2">
          {navLinks.map((link) => {
            const Icon = link.icon;
            return (
              <button
                key={link.href}
                onClick={() => scrollToSection(link.href)}
                className="flex flex-col items-center justify-center gap-1 p-2 flex-1 transition-colors hover:text-primary"
              >
                <Icon className="h-6 w-6" />
                <span className="text-xs">{link.label}</span>
              </button>
            );
          })}
        </div>
      </nav>
    </>
  );
};

export default Navigation;
