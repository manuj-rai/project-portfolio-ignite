import { Github, Linkedin, Mail, Heart } from "lucide-react";

const Footer = () => {
  return (
    <footer className="relative py-16 border-t border-border">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent to-primary/5" />
      
      <div className="container px-4 relative z-10">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col items-center gap-8">
            {/* Social Links */}
            <div className="flex gap-4">
              {[
                { icon: Github, href: "https://github.com", label: "GitHub" },
                { icon: Linkedin, href: "https://linkedin.com", label: "LinkedIn" },
                { icon: Mail, href: "mailto:contact@example.com", label: "Email" }
              ].map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-12 h-12 rounded-full border-2 border-border hover:border-primary bg-card hover:bg-primary/10 flex items-center justify-center transition-all hover:scale-110"
                  aria-label={social.label}
                >
                  <social.icon className="w-5 h-5" />
                </a>
              ))}
            </div>

            {/* Copyright */}
            <div className="flex items-center gap-2 text-muted-foreground">
              <p>© {new Date().getFullYear()} Built with</p>
              <Heart className="w-4 h-4 fill-primary text-primary" />
              <p>All rights reserved.</p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;