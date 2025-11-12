import { Button } from "@/components/ui/button";
import { ArrowRight, Sparkles } from "lucide-react";

const CTA = () => {
  const scrollToSection = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="py-12 md:py-20 bg-gradient-to-r from-primary/10 via-accent/10 to-primary/10 relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-10 left-10 w-48 md:w-72 h-48 md:h-72 bg-primary rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-10 right-10 w-64 md:w-96 h-64 md:h-96 bg-accent rounded-full blur-3xl animate-pulse" style={{ animationDelay: "1s" }} />
      </div>

      <div className="container px-4 md:px-6 relative z-10">
        <div className="max-w-4xl mx-auto text-center space-y-6 md:space-y-8">
          <div className="inline-flex items-center gap-2 px-3 md:px-4 py-2 bg-primary/20 rounded-full border border-primary/30 mb-2 md:mb-4">
            <Sparkles className="h-3 w-3 md:h-4 md:w-4 text-primary" />
            <span className="text-xs md:text-sm font-medium">Let's Work Together</span>
          </div>

          <h2 className="text-3xl md:text-5xl lg:text-6xl font-bold px-4">
            Ready to Start Your Next Project?
          </h2>

          <p className="text-base md:text-xl text-muted-foreground max-w-2xl mx-auto px-4">
            I'm currently available for freelance work and exciting new opportunities.
            Let's discuss how I can help bring your vision to life.
          </p>

          <div className="flex flex-col sm:flex-row flex-wrap gap-3 md:gap-4 justify-center pt-2 md:pt-4">
            <Button
              size="lg"
              className="bg-gradient-to-r from-primary to-accent hover:opacity-90 transition-opacity text-base md:text-lg px-6 md:px-8 py-5 md:py-6 touch-target active:scale-95"
              onClick={() => scrollToSection("contact")}
            >
              Start a Conversation <ArrowRight className="ml-2 h-4 w-4 md:h-5 md:w-5" />
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="text-base md:text-lg px-6 md:px-8 py-5 md:py-6 touch-target active:scale-95"
              onClick={() => scrollToSection("projects")}
            >
              View My Portfolio
            </Button>
          </div>

          <div className="pt-6 md:pt-8 flex flex-wrap justify-center gap-6 md:gap-8 text-center px-4">
            <div>
              <div className="text-2xl md:text-3xl font-bold text-primary">50+</div>
              <div className="text-xs md:text-sm text-muted-foreground">Projects Completed</div>
            </div>
            <div>
              <div className="text-2xl md:text-3xl font-bold text-primary">30+</div>
              <div className="text-xs md:text-sm text-muted-foreground">Happy Clients</div>
            </div>
            <div>
              <div className="text-2xl md:text-3xl font-bold text-primary">5+</div>
              <div className="text-xs md:text-sm text-muted-foreground">Years Experience</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTA;
