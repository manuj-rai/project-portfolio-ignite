import { useEffect, useRef, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Card } from "@/components/ui/card";
import * as LucideIcons from "lucide-react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

interface Service {
  id: string;
  title: string;
  description: string;
  icon: string | null;
  features: string[];
  display_order: number;
  published: boolean;
}

const Services = () => {
  const [visibleCards, setVisibleCards] = useState<boolean[]>([]);
  const sectionRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);

  const { data: services, isLoading } = useQuery({
    queryKey: ["services"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("services")
        .select("*")
        .eq("published", true)
        .order("display_order");
      if (error) throw error;
      return data as Service[];
    },
  });

  useEffect(() => {
    if (!services) return;

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
  }, [services]);

  const getIcon = (iconName: string | null) => {
    if (!iconName) return LucideIcons.Code2;
    const Icon = (LucideIcons as any)[iconName];
    return Icon || LucideIcons.Code2;
  };

  if (isLoading || !services) {
    return (
      <section id="services" className="py-20 bg-background">
        <div className="container px-4">
          <div className="text-center">
            <p className="text-muted-foreground">Loading services...</p>
          </div>
        </div>
      </section>
    );
  }


  return (
    <section id="services" ref={sectionRef} className="py-12 md:py-20 bg-background">
      <div className="container px-4 md:px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-8 md:mb-16">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-3 md:mb-4">Services I Offer</h2>
            <p className="text-base md:text-xl text-muted-foreground max-w-2xl mx-auto px-4">
              Comprehensive development solutions tailored to your business needs
            </p>
          </div>

          {/* Mobile Stack */}
          <div className="md:hidden space-y-6">
            {services.map((service) => {
              const Icon = getIcon(service.icon);
              return (
                <Card key={service.id} className="p-6 bg-card/50 backdrop-blur border-border hover:border-primary/50 transition-all duration-300 group">
                  <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-primary to-accent flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                    <Icon className="h-7 w-7 text-primary-foreground" />
                  </div>
                  
                  <h3 className="text-xl font-bold mb-3">{service.title}</h3>
                  <p className="text-muted-foreground mb-4 leading-relaxed">{service.description}</p>
                  
                  <ul className="space-y-2.5">
                    {service.features.map((feature) => (
                      <li key={feature} className="text-sm text-muted-foreground flex items-start gap-2.5">
                        <span className="text-primary mt-0.5 text-lg">•</span>
                        <span className="flex-1">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </Card>
              );
            })}
          </div>

          {/* Tablet/Desktop Grid */}
          <div className="hidden md:grid md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {services.map((service, index) => {
              const Icon = getIcon(service.icon);
              return (
                <Card
                  key={service.id}
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
