import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Palette, Brush, Box, Video, Computer, Asterisk, Heart, ExternalLink, Plus } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useAllProjects } from "@/hooks/useProjects";

const filterButtons = [
  { key: "all", label: "All", icon: Asterisk },
  { key: "art", label: "Digital Art", icon: Brush },
  { key: "3D", label: "3D Renders", icon: Box },
  { key: "Motion", label: "Motion Graphics", icon: Video },
  { key: "Interactive", label: "Interactive", icon: Computer },
];

export default function ArtProjectsSection() {
  const [activeFilter, setActiveFilter] = useState("all");
  const { data: allProjects, isLoading } = useAllProjects();

  const artProjects = allProjects?.filter(project => project.category === "art") || [];

  const filteredProjects = activeFilter === "all" 
    ? artProjects 
    : artProjects.filter(project => 
        project.type.toLowerCase().includes(activeFilter.toLowerCase()) ||
        project.tags.some(tag => tag.toLowerCase().includes(activeFilter.toLowerCase()))
      );

  if (isLoading) {
    return (
      <section className="relative z-10 px-6 lg:px-8 py-20">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <Palette className="text-4xl text-primary mb-4 mx-auto animate-pulse" />
            <h3 className="text-3xl lg:text-5xl font-bold mb-4">Artistic Projects</h3>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div key={i} className="animate-pulse">
                <div className="bg-muted rounded-xl h-80"></div>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="projects" className="relative z-10 px-6 lg:px-8 py-20">
      <div className="max-w-7xl mx-auto">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <motion.div
            animate={{ y: [-10, 10, -10] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          >
            <Palette className="text-4xl text-primary mb-4 mx-auto floating-icon" />
          </motion.div>
          <h3 className="text-3xl lg:text-5xl font-bold mb-4">Artistic Projects</h3>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            A collection of digital art, installations, and experimental media exploring cosmic themes
          </p>
        </motion.div>

        {/* Filter Buttons */}
        <motion.div
          className="flex flex-wrap justify-center gap-4 mb-12"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          {filterButtons.map((filter, index) => (
            <motion.div
              key={filter.key}
              initial={{ opacity: 0, scale: 0 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
            >
              <Button
                onClick={() => setActiveFilter(filter.key)}
                variant={activeFilter === filter.key ? "default" : "secondary"}
                className={`rounded-full font-medium transition-all ${
                  activeFilter === filter.key
                    ? "bg-primary text-primary-foreground shadow-lg scale-105"
                    : "hover:scale-105"
                }`}
              >
                <filter.icon className="mr-2 floating-icon" />
                {filter.label}
              </Button>
            </motion.div>
          ))}
        </motion.div>

        {/* Projects Grid */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeFilter}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
          >
            {filteredProjects.map((project, index) => (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                layout
              >
                <Card className="project-card glass-morphism border-border/20 overflow-hidden h-full">
                  <div className="relative">
                    <img
                      src={project.imageUrl}
                      alt={project.title}
                      className="w-full h-48 object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                  </div>
                  
                  <CardContent className="p-4">
                    <h5 className="font-bold mb-2 text-lg">{project.title}</h5>
                    <p className="text-sm text-muted-foreground mb-3 line-clamp-2">
                      {project.description}
                    </p>
                    <div className="flex items-center justify-between text-xs">
                      <Badge
                        variant="secondary"
                        className="bg-primary/20 text-primary"
                      >
                        {project.type}
                      </Badge>
                      <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                      >
                        <Heart className="floating-icon text-muted-foreground hover:text-red-400" />
                      </motion.button>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </AnimatePresence>

        <motion.div
          className="text-center mt-12"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <Button
            variant="outline"
            className="border-primary text-primary hover:bg-primary hover:text-primary-foreground rounded-full px-8 py-3 font-semibold transition-all"
          >
            <Plus className="mr-3 floating-icon" />
            Load More Projects
          </Button>
        </motion.div>
      </div>
    </section>
  );
}
