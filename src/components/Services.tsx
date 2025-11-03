import { useEffect, useRef, useState } from "react";
import { Card } from "@/components/ui/card";
import { Code2, Palette, Rocket, Search, ShoppingCart, Smartphone } from "lucide-react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

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
  const [visibleCards, setVisibleCards] = useState<boolean[]>([]);
  const sectionRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const index = cardRefs.current.findIndex((ref) => ref === entry.target);
            if (index !== -1) {
              setVisibleCards((prev) => {
                const updated = [...prev];
                updated[index] = true;
                return updated;
              });
            }
          }
        });
      },
      { threshold: 0.1 }
    );

    cardRefs.current.forEach((ref) => {
      if (ref) observer.observe(ref);
    });

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

          {/* Mobile Carousel */}
          <div className="md:hidden">
            <Carousel className="w-full max-w-xs mx-auto">
              <CarouselContent>
                {services.map((service) => {
                  const Icon = service.icon;
                  return (
                    <CarouselItem key={service.title}>
                      <Card className="p-6 bg-card/50 backdrop-blur border-border hover:border-primary/50 transition-all duration-300 group h-full">
                        <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-primary to-accent flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                          <Icon className="h-6 w-6 text-primary-foreground" />
                        </div>
                        
                        <h3 className="text-xl font-bold mb-3">{service.title}</h3>
                        <p className="text-muted-foreground mb-4">{service.description}</p>
                        
                        <ul className="space-y-2">
                          {service.features.map((feature) => (
                            <li key={feature} className="text-sm text-muted-foreground flex items-start gap-2">
                              <span className="text-primary mt-1">•</span>
                              {feature}
                            </li>
                          ))}
                        </ul>
                      </Card>
                    </CarouselItem>
                  );
                })}
              </CarouselContent>
              <CarouselPrevious />
              <CarouselNext />
            </Carousel>
          </div>

          {/* Desktop Grid */}
          <div className="hidden md:grid grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, index) => {
              const Icon = service.icon;
              return (
                <Card
                  key={service.title}
                  ref={(el) => {
                    if (el && !visibleCards[index]) cardRefs.current[index] = el;
                  }}
                  className={`p-6 bg-card/50 backdrop-blur border-border hover:border-primary/50 transition-all duration-300 group ${
                    visibleCards[index] ? "animate-fade-in-up" : "opacity-0"
                  }`}
                  style={{
                    animationDelay: `${(index % 3) * 100}ms`,
                  }}
                >
                  <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-primary to-accent flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                    <Icon className="h-6 w-6 text-primary-foreground" />
                  </div>
                  
                  <h3 className="text-xl font-bold mb-3">{service.title}</h3>
                  <p className="text-muted-foreground mb-4">{service.description}</p>
                  
                  <ul className="space-y-2">
                    {service.features.map((feature) => (
                      <li key={feature} className="text-sm text-muted-foreground flex items-start gap-2">
                        <span className="text-primary mt-1">•</span>
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
