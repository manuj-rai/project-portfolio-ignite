import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Card } from "@/components/ui/card";
import { Star } from "lucide-react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

const Testimonials = () => {
  const { data: testimonials, isLoading } = useQuery({
    queryKey: ["testimonials"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("testimonials")
        .select("*")
        .order("display_order", { ascending: true });
      
      if (error) throw error;
      return data;
    },
  });

  if (isLoading) {
    return null;
  }

  return (
    <section className="py-12 md:py-20 bg-gradient-to-b from-card/30 to-background">
      <div className="container px-4 md:px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-8 md:mb-16">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-3 md:mb-4">Client Testimonials</h2>
            <p className="text-base md:text-xl text-muted-foreground max-w-2xl mx-auto px-4">
              What clients say about working with me
            </p>
          </div>

          {/* Mobile Stack */}
          <div className="md:hidden space-y-6">
            {testimonials?.map((testimonial) => (
              <Card key={testimonial.id} className="p-6 bg-card/50 backdrop-blur border-border">
                <div className="flex gap-1 mb-4">
                  {[...Array(testimonial.rating || 5)].map((_, i) => (
                    <Star key={i} className="h-5 w-5 fill-accent text-accent" />
                  ))}
                </div>
                
                <p className="text-foreground mb-6 italic leading-relaxed">"{testimonial.content}"</p>
                
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center text-primary-foreground font-bold flex-shrink-0">
                    {testimonial.client_name.charAt(0)}
                  </div>
                  <div className="min-w-0">
                    <div className="font-semibold truncate">{testimonial.client_name}</div>
                    <div className="text-sm text-muted-foreground truncate">
                      {testimonial.role}{testimonial.company && ` at ${testimonial.company}`}
                    </div>
                  </div>
                </div>
              </Card>
            ))}
          </div>

          {/* Tablet/Desktop Grid */}
          <div className="hidden md:grid md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {testimonials?.map((testimonial) => (
              <Card 
                key={testimonial.id}
                className="p-6 bg-card/50 backdrop-blur border-border hover:border-primary/50 transition-all duration-300"
              >
                <div className="flex gap-1 mb-4">
                  {[...Array(testimonial.rating || 5)].map((_, i) => (
                    <Star key={i} className="h-5 w-5 fill-accent text-accent" />
                  ))}
                </div>
                
                <p className="text-foreground mb-6 italic">"{testimonial.content}"</p>
                
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center text-primary-foreground font-bold">
                    {testimonial.client_name.charAt(0)}
                  </div>
                  <div>
                    <div className="font-semibold">{testimonial.client_name}</div>
                    <div className="text-sm text-muted-foreground">
                      {testimonial.role}{testimonial.company && ` at ${testimonial.company}`}
                    </div>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;