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
    <section className="py-20 bg-gradient-to-b from-card/30 to-background">
      <div className="container px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">Client Testimonials</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              What clients say about working with me
            </p>
          </div>

          {/* Mobile Carousel */}
          <div className="md:hidden">
            <Carousel className="w-full max-w-xs mx-auto">
              <CarouselContent>
                {testimonials?.map((testimonial) => (
                  <CarouselItem key={testimonial.id}>
                    <Card className="p-6 bg-card/50 backdrop-blur border-border">
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
                  </CarouselItem>
                ))}
              </CarouselContent>
              <CarouselPrevious />
              <CarouselNext />
            </Carousel>
          </div>

          {/* Desktop Grid */}
          <div className="hidden md:grid grid-cols-3 gap-8">
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