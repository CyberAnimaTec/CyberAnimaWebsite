import Navigation from "@/components/Navigation";
import HeroSection from "@/components/HeroSection";
import FeaturedProjects from "@/components/FeaturedProjects";
import ArtProjectsSection from "@/components/ArtProjectsSection";
import IndieGamesSection from "@/components/IndieGamesSection";
import ContactSection from "@/components/ContactSection";
import Footer from "@/components/Footer";
import BackgroundEffects from "@/components/BackgroundEffects";

export default function Home() {
  return (
    <div className="min-h-screen bg-background text-foreground overflow-x-hidden">
      <BackgroundEffects />
      <Navigation />
      <HeroSection />
      <FeaturedProjects />
      <ArtProjectsSection />
      <IndieGamesSection />
      <ContactSection />
      <Footer />
    </div>
  );
}
