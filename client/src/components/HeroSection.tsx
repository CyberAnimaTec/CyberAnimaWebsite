import { motion } from "framer-motion";
import { Globe, Rocket, Play } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function HeroSection() {
  const scrollToSection = (sectionId: string) => {
    const element = document.querySelector(sectionId);
    element?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section id="home" className="relative z-10 px-6 lg:px-8 py-20 lg:py-32">
      <div className="max-w-7xl mx-auto text-center">
        <motion.div
          className="mb-8"
          initial={{ scale: 0, rotate: -180 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ duration: 1, type: "spring", stiffness: 100 }}
        >
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          >
            <Globe className="text-6xl lg:text-8xl text-primary mx-auto floating-icon" />
          </motion.div>
        </motion.div>

        <motion.h2
          className="text-4xl lg:text-7xl font-bold mb-6 leading-tight"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
        >
          Welcome to the{" "}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent">
            Digital Cosmos
          </span>
        </motion.h2>

        <motion.p
          className="text-xl lg:text-2xl text-muted-foreground mb-12 max-w-3xl mx-auto leading-relaxed"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
        >
          Explore a curated collection of artistic projects and indie games,
          crafted with passion and inspired by the infinite beauty of space.
        </motion.p>

        <motion.div
          className="flex flex-col sm:flex-row gap-6 justify-center items-center"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.7 }}
        >
          <Button
            onClick={() => scrollToSection("#featured")}
            className="bg-primary hover:bg-primary/80 px-8 py-4 rounded-full font-semibold text-lg transition-all animate-pulse-glow"
            size="lg"
          >
            <Rocket className="mr-3 floating-icon" />
            Explore Projects
          </Button>

          <Button
            onClick={() => scrollToSection("#games")}
            variant="outline"
            className="border-accent text-accent hover:bg-accent hover:text-accent-foreground px-8 py-4 rounded-full font-semibold text-lg transition-all"
            size="lg"
          >
            <Play className="mr-3 floating-icon" />
            Play Games
          </Button>
        </motion.div>

        {/* Floating elements */}
        <motion.div
          className="absolute top-1/4 left-10 text-4xl text-primary opacity-50"
          animate={{ y: [-20, 20, -20] }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
        >
          ✦
        </motion.div>
        <motion.div
          className="absolute top-3/4 right-10 text-3xl text-accent opacity-50"
          animate={{ y: [20, -20, 20] }}
          transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
        >
          ⚡
        </motion.div>
        <motion.div
          className="absolute top-1/2 left-1/4 text-2xl text-yellow-400 opacity-50"
          animate={{ y: [-15, 15, -15] }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: 2 }}
        >
          ✨
        </motion.div>
      </div>
    </section>
  );
}
