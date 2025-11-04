import { Card } from "@/components/ui/card";

const techCategories = [
  {
    category: "Frontend",
    color: "from-blue-500 to-cyan-500",
    technologies: [
      { name: "React", icon: "⚛️", level: 95 },
      { name: "TypeScript", icon: "📘", level: 92 },
      { name: "Next.js", icon: "▲", level: 90 },
      { name: "Tailwind", icon: "🎨", level: 95 },
    ],
  },
  {
    category: "Backend",
    color: "from-green-500 to-emerald-500",
    technologies: [
      { name: "Node.js", icon: "🟢", level: 90 },
      { name: "PostgreSQL", icon: "🐘", level: 88 },
      { name: "GraphQL", icon: "◆", level: 85 },
      { name: "Redis", icon: "🔴", level: 82 },
    ],
  },
  {
    category: "DevOps & Cloud",
    color: "from-purple-500 to-pink-500",
    technologies: [
      { name: "AWS", icon: "☁️", level: 85 },
      { name: "Docker", icon: "🐳", level: 88 },
      { name: "GitHub", icon: "🐙", level: 92 },
      { name: "CI/CD", icon: "🔄", level: 85 },
    ],
  },
  {
    category: "Tools & Others",
    color: "from-orange-500 to-red-500",
    technologies: [
      { name: "Git", icon: "📌", level: 95 },
      { name: "VS Code", icon: "💻", level: 98 },
      { name: "Figma", icon: "🎯", level: 80 },
      { name: "Postman", icon: "📮", level: 90 },
    ],
  },
];

const TechStack = () => {
  return (
    <section className="py-20 bg-gradient-to-b from-background to-card/30 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-accent rounded-full blur-3xl" />
      </div>

      <div className="container px-4 relative z-10">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">Tech Stack & Tools</h2>
            <p className="text-xl text-muted-foreground">
              Technologies I use to bring ideas to life
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {techCategories.map((category, catIndex) => (
              <Card
                key={catIndex}
                className="p-6 bg-card/50 backdrop-blur border-border hover:border-primary/50 transition-all duration-300 group"
              >
                <div className="flex items-center gap-3 mb-6">
                  <div className={`h-1 w-12 rounded-full bg-gradient-to-r ${category.color}`} />
                  <h3 className="text-2xl font-bold">{category.category}</h3>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  {category.technologies.map((tech, techIndex) => (
                    <div
                      key={techIndex}
                      className="flex items-center gap-3 p-3 rounded-lg glass-effect hover:scale-105 transition-all duration-300"
                    >
                      <span className="text-3xl">{tech.icon}</span>
                      <div className="flex-1">
                        <p className="font-semibold text-sm">{tech.name}</p>
                        <div className="h-1.5 bg-muted rounded-full overflow-hidden mt-1">
                          <div
                            className={`h-full rounded-full bg-gradient-to-r ${category.color} transition-all duration-1000`}
                            style={{ width: `${tech.level}%` }}
                          />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default TechStack;
