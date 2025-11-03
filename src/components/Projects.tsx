import { useState, useEffect, useRef } from "react";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ExternalLink, Github } from "lucide-react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import ProjectModal from "./ProjectModal";

const Projects = () => {
  const [selectedTech, setSelectedTech] = useState<string | null>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [visibleCards, setVisibleCards] = useState<boolean[]>([]);
  const [selectedProject, setSelectedProject] = useState<any>(null);
  const [modalOpen, setModalOpen] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);

  const { data: projects, isLoading } = useQuery({
    queryKey: ["projects"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("projects")
        .select("*")
        .order("display_order", { ascending: true });
      
      if (error) throw error;
      return data;
    },
  });

  // Get all unique technologies for filtering
  const allTechnologies = Array.from(
    new Set(projects?.flatMap((p) => p.technologies || []))
  ).sort();

  // Filter projects by selected technology
  const filteredProjects = selectedTech
    ? projects?.filter((p) => p.technologies?.includes(selectedTech))
    : projects;

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
  }, [filteredProjects]);

  if (isLoading) {
    return (
      <section id="projects" className="py-20">
        <div className="container px-4">
          <div className="text-center">Loading projects...</div>
        </div>
      </section>
    );
  }

  return (
    <section id="projects" ref={sectionRef} className="py-20 bg-background">
      <div className="container px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">Featured Projects</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-8">
              Recent work showcasing my expertise in building scalable applications
            </p>

            {/* Technology Filter */}
            <div className="flex flex-wrap gap-2 justify-center">
              <Button
                variant={selectedTech === null ? "default" : "outline"}
                size="sm"
                onClick={() => setSelectedTech(null)}
                className={selectedTech === null ? "bg-gradient-to-r from-primary to-accent" : ""}
              >
                All
              </Button>
              {allTechnologies.map((tech) => (
                <Button
                  key={tech}
                  variant={selectedTech === tech ? "default" : "outline"}
                  size="sm"
                  onClick={() => setSelectedTech(tech)}
                  className={
                    selectedTech === tech ? "bg-gradient-to-r from-primary to-accent" : ""
                  }
                >
                  {tech}
                </Button>
              ))}
            </div>
          </div>

          {/* Mobile Carousel */}
          <div className="md:hidden">
            <Carousel className="w-full max-w-xs mx-auto">
              <CarouselContent>
                {filteredProjects?.map((project) => (
                  <CarouselItem key={project.id}>
                    <Card 
                      className="p-6 bg-card/50 backdrop-blur border-border hover:border-primary/50 transition-all duration-300 group cursor-pointer"
                      onClick={() => {
                        setSelectedProject(project);
                        setModalOpen(true);
                      }}
                    >
                      <div className="aspect-video bg-gradient-to-br from-primary/20 to-accent/20 rounded-lg mb-4 overflow-hidden">
                        {project.image_url && (
                          <img
                            src={project.image_url}
                            alt={project.title}
                            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                          />
                        )}
                      </div>

                      <h3 className="text-xl font-bold mb-2">{project.title}</h3>
                      <p className="text-muted-foreground mb-4 line-clamp-2">{project.description}</p>

                      <div className="flex flex-wrap gap-2 mb-4">
                        {project.technologies?.slice(0, 3).map((tech) => (
                          <Badge key={tech} variant="secondary">
                            {tech}
                          </Badge>
                        ))}
                        {project.technologies?.length > 3 && (
                          <Badge variant="secondary">+{project.technologies.length - 3}</Badge>
                        )}
                      </div>

                      <div className="flex gap-3" onClick={(e) => e.stopPropagation()}>
                        {project.project_url && (
                          <a
                            href={project.project_url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-2 text-sm text-primary hover:text-primary/80 transition-colors"
                          >
                            <ExternalLink className="h-4 w-4" />
                            Demo
                          </a>
                        )}
                        {project.github_url && (
                          <a
                            href={project.github_url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-2 text-sm text-primary hover:text-primary/80 transition-colors"
                          >
                            <Github className="h-4 w-4" />
                            Code
                          </a>
                        )}
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
          <div className="hidden md:grid grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProjects?.map((project, index) => (
              <Card
                key={project.id}
                ref={(el) => {
                  if (el && !visibleCards[index]) cardRefs.current[index] = el;
                }}
                className={`p-6 bg-card/50 backdrop-blur border-border hover:border-primary/50 transition-all duration-300 group cursor-pointer ${
                  visibleCards[index] ? "animate-fade-in-up" : "opacity-0"
                }`}
                style={{
                  animationDelay: `${(index % 3) * 100}ms`,
                }}
                onClick={() => {
                  setSelectedProject(project);
                  setModalOpen(true);
                }}
              >
                <div className="aspect-video bg-gradient-to-br from-primary/20 to-accent/20 rounded-lg mb-4 overflow-hidden">
                  {project.image_url && (
                    <img
                      src={project.image_url}
                      alt={project.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                  )}
                </div>

                <h3 className="text-xl font-bold mb-2">{project.title}</h3>
                <p className="text-muted-foreground mb-4 line-clamp-2">{project.description}</p>

                <div className="flex flex-wrap gap-2 mb-4">
                  {project.technologies?.slice(0, 3).map((tech) => (
                    <Badge key={tech} variant="secondary">
                      {tech}
                    </Badge>
                  ))}
                  {project.technologies?.length > 3 && (
                    <Badge variant="secondary">+{project.technologies.length - 3}</Badge>
                  )}
                </div>

                <div className="flex gap-3" onClick={(e) => e.stopPropagation()}>
                  {project.project_url && (
                    <a
                      href={project.project_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 text-sm text-primary hover:text-primary/80 transition-colors"
                    >
                      <ExternalLink className="h-4 w-4" />
                      Demo
                    </a>
                  )}
                  {project.github_url && (
                    <a
                      href={project.github_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 text-sm text-primary hover:text-primary/80 transition-colors"
                    >
                      <Github className="h-4 w-4" />
                      Code
                    </a>
                  )}
                </div>
              </Card>
            ))}
          </div>
        </div>
      </div>
      
      <ProjectModal
        project={selectedProject}
        open={modalOpen}
        onOpenChange={setModalOpen}
      />
    </section>
  );
};

export default Projects;