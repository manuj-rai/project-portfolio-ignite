import { useEffect, useRef, useState } from "react";
import { Card } from "@/components/ui/card";
import { Code2, Palette, Rocket, Search, ShoppingCart, Smartphone } from "lucide-react";

const services = [
  {
    icon: Code2,
    title: "Web Development",
    description: "Custom websites and web applications built with modern frameworks like React, Next.js, and TypeScript.",
    features: ["Responsive Design", "Performance Optimization", "SEO-Friendly"],
  },
  {
    icon: Smartphone,
    title: "Mobile Development",
    description: "Cross-platform mobile applications using React Native for iOS and Android platforms.",
    features: ["Native Performance", "Cross-Platform", "App Store Ready"],
  },
  {
    icon: ShoppingCart,
    title: "E-Commerce Solutions",
    description: "Full-featured online stores with payment integration, inventory management, and analytics.",
    features: ["Payment Gateway", "Inventory System", "Analytics Dashboard"],
  },
  {
    icon: Palette,
    title: "UI/UX Design",
    description: "Beautiful, intuitive interfaces that provide exceptional user experiences across all devices.",
    features: ["User Research", "Prototyping", "Design Systems"],
  },
  {
    icon: Rocket,
    title: "API Development",
    description: "RESTful and GraphQL APIs with proper authentication, documentation, and scalability.",
    features: ["REST & GraphQL", "Authentication", "Documentation"],
  },
  {
    icon: Search,
    title: "SEO & Performance",
    description: "Optimize your website for search engines and ensure lightning-fast load times.",
    features: ["SEO Audit", "Speed Optimization", "Core Web Vitals"],
  },
];

const Services = () => {
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
    <section id="services" ref={sectionRef} className="py-20 bg-background">
      <div className="container px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">Services I Offer</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Comprehensive development solutions tailored to your business needs
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, index) => {
              const Icon = service.icon;
              return (
                <Card
                  key={index}
                  className={`p-6 bg-card/50 backdrop-blur border-border hover:border-primary/50 transition-all duration-300 hover:shadow-[0_0_30px_rgba(96,165,250,0.15)] group ${
                    isVisible ? "animate-fade-in-up" : "opacity-0"
                  }`}
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <div className="mb-4 w-12 h-12 rounded-lg bg-gradient-to-br from-primary to-accent flex items-center justify-center group-hover:scale-110 transition-transform">
                    <Icon className="h-6 w-6 text-primary-foreground" />
                  </div>
                  <h3 className="text-xl font-semibold mb-3">{service.title}</h3>
                  <p className="text-muted-foreground mb-4">{service.description}</p>
                  <ul className="space-y-2">
                    {service.features.map((feature, idx) => (
                      <li key={idx} className="text-sm flex items-center gap-2">
                        <div className="w-1.5 h-1.5 rounded-full bg-primary" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                </Card>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Services;
