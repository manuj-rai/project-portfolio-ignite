import { Award, Trophy, Star, Zap } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const achievements = [
  {
    icon: Trophy,
    title: "AWS Certified Solutions Architect",
    issuer: "Amazon Web Services",
    date: "2023",
    color: "from-yellow-500 to-orange-500",
  },
  {
    icon: Star,
    title: "Google Cloud Professional",
    issuer: "Google Cloud",
    date: "2023",
    color: "from-blue-500 to-cyan-500",
  },
  {
    icon: Award,
    title: "React Advanced Certification",
    issuer: "Meta",
    date: "2022",
    color: "from-purple-500 to-pink-500",
  },
  {
    icon: Zap,
    title: "Top Developer Award",
    issuer: "Stack Overflow",
    date: "2022",
    color: "from-green-500 to-emerald-500",
  },
];

const Achievements = () => {
  return (
    <section className="py-12 md:py-20 bg-card/30">
      <div className="container px-4 md:px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-8 md:mb-16">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-3 md:mb-4">Certifications & Awards</h2>
            <p className="text-base md:text-xl text-muted-foreground px-4">
              Recognition and professional certifications
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 md:gap-6">
            {achievements.map((achievement, index) => {
              const Icon = achievement.icon;
              return (
                <Card
                  key={index}
                  className="p-6 md:p-6 bg-card/50 backdrop-blur border-border hover:border-primary/50 transition-all duration-300 group hover:scale-105 active:scale-95"
                >
                  <div className="relative mb-4">
                    <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${achievement.color} flex items-center justify-center mx-auto group-hover:rotate-12 transition-transform duration-300`}>
                      <Icon className="h-8 w-8 text-white" />
                    </div>
                    <div className={`absolute -top-2 -right-2 w-8 h-8 rounded-full bg-gradient-to-br ${achievement.color} flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300`}>
                      <Star className="h-4 w-4 text-white fill-white" />
                    </div>
                  </div>

                  <h3 className="text-lg font-bold mb-2 text-center">{achievement.title}</h3>
                  <p className="text-sm text-muted-foreground text-center mb-3">
                    {achievement.issuer}
                  </p>
                  <div className="flex justify-center">
                    <Badge variant="secondary" className="text-xs">
                      {achievement.date}
                    </Badge>
                  </div>
                </Card>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Achievements;
