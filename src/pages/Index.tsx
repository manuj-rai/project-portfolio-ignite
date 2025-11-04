import Navigation from "@/components/Navigation";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Statistics from "@/components/Statistics";
import Services from "@/components/Services";
import Skills from "@/components/Skills";
import SkillProgress from "@/components/SkillProgress";
import TechStack from "@/components/TechStack";
import Experience from "@/components/Experience";
import Projects from "@/components/Projects";
import Achievements from "@/components/Achievements";
import Testimonials from "@/components/Testimonials";
import CTA from "@/components/CTA";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import ScrollToTop from "@/components/ScrollToTop";

const Index = () => {
  return (
    <main className="min-h-screen pb-16 md:pb-0">
      <Navigation />
      <Hero />
      <About />
      <Statistics />
      <Services />
      <Skills />
      <SkillProgress />
      <TechStack />
      <Experience />
      <Projects />
      <Achievements />
      <Testimonials />
      <CTA />
      <Contact />
      <Footer />
      <ScrollToTop />
    </main>
  );
};

export default Index;