import { motion } from "framer-motion";
import { Star, ExternalLink, Eye, Heart, Download } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useFeaturedProjects } from "@/hooks/useProjects";

export default function FeaturedProjects() {
  const { data: projects, isLoading } = useFeaturedProjects();

  if (isLoading) {
    return (
      <section className="relative z-10 px-6 lg:px-8 py-20">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <motion.div
              className="mb-4"
              animate={{ rotate: 360 }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <Star className="text-4xl text-accent mx-auto" />
            </motion.div>
            <h3 className="text-3xl lg:text-5xl font-bold mb-4">Featured Works</h3>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {[1, 2, 3].map((i) => (
              <div key={i} className="animate-pulse">
                <div className="bg-muted rounded-2xl h-96"></div>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="featured" className="relative z-10 px-6 lg:px-8 py-20">
      <div className="max-w-7xl mx-auto">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <motion.div
            className="mb-4"
            animate={{ rotate: 360 }}
            transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
          >
            <Star className="text-4xl text-accent mx-auto floating-icon animate-twinkle" />
          </motion.div>
          <h3 className="text-3xl lg:text-5xl font-bold mb-4">Featured Works</h3>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Highlighted projects that showcase the intersection of technology and creativity
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {projects?.map((project, index) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
            >
              <Card className="project-card glass-morphism border-border/20 overflow-hidden h-full">
                <div className="relative">
                  <img
                    src={project.imageUrl}
                    alt={project.title}
                    className="w-full h-48 object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                </div>

                <CardContent className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <Badge
                      variant="secondary"
                      className={`${
                        project.category === "art"
                          ? "bg-primary/20 text-primary"
                          : project.category === "game"
                          ? "bg-accent/20 text-accent"
                          : "bg-green-500/20 text-green-400"
                      }`}
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

                  <h4 className="text-xl font-bold mb-3">{project.title}</h4>
                  <p className="text-muted-foreground mb-6 line-clamp-3">
                    {project.description}
                  </p>

                  <div className="flex items-center justify-between">
                    <Button
                      variant="ghost"
                      className="text-accent hover:text-accent-foreground hover:bg-accent p-0"
                    >
                      <ExternalLink className="mr-2 floating-icon" />
                      {project.category === "game" ? "Play Now" : "View Project"}
                    </Button>
                    <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                      {project.category === "game" ? (
                        <>
                          <Download className="w-4 h-4" />
                          <span>{project.downloads || 0}</span>
                        </>
                      ) : (
                        <>
                          <Eye className="w-4 h-4" />
                          <span>{project.views}</span>
                        </>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
