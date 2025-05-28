import { motion } from "framer-motion";
import { Gamepad2, Star, Download, Play, Info, Lightbulb, PenTool, Code, Rocket } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useAllProjects } from "@/hooks/useProjects";

export default function IndieGamesSection() {
  const { data: allProjects, isLoading } = useAllProjects();

  const gameProjects = allProjects?.filter(project => project.category === "game") || [];

  if (isLoading) {
    return (
      <section className="relative z-10 px-6 lg:px-8 py-20">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <Gamepad2 className="text-4xl text-accent mb-4 mx-auto animate-pulse" />
            <h3 className="text-3xl lg:text-5xl font-bold mb-4">Indie Games</h3>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {[1, 2].map((i) => (
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
    <section id="games" className="relative z-10 px-6 lg:px-8 py-20">
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
            animate={{ 
              scale: [1, 1.1, 1],
              boxShadow: [
                "0 0 20px rgba(0, 210, 255, 0.5)",
                "0 0 40px rgba(0, 210, 255, 0.8)",
                "0 0 20px rgba(0, 210, 255, 0.5)"
              ]
            }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          >
            <Gamepad2 className="text-4xl text-accent mx-auto floating-icon" />
          </motion.div>
          <h3 className="text-3xl lg:text-5xl font-bold mb-4">Indie Games</h3>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Interactive experiences that blend storytelling with innovative gameplay mechanics
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {gameProjects.map((game, index) => (
            <motion.div
              key={game.id}
              initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: index * 0.2 }}
            >
              <Card className="project-card glass-morphism border-border/20 p-8 h-full">
                <div className="mb-6">
                  <img
                    src={game.imageUrl}
                    alt={game.title}
                    className="w-full h-64 object-cover rounded-xl"
                  />
                </div>

                <div className="flex items-center justify-between mb-4">
                  <Badge className="bg-accent/20 text-accent px-4 py-2 rounded-full">
                    {game.type}
                  </Badge>
                  <div className="flex items-center space-x-4">
                    <div className="flex items-center space-x-1">
                      <Star className="text-yellow-400 fill-current" />
                      <span className="text-sm">{game.rating || 4.5}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Download className="text-muted-foreground w-4 h-4" />
                      <span className="text-sm">{game.downloads || 0}</span>
                    </div>
                  </div>
                </div>

                <h4 className="text-2xl font-bold mb-4">{game.title}</h4>
                <p className="text-muted-foreground mb-6 leading-relaxed">
                  {game.description}
                </p>

                <div className="flex flex-wrap gap-2 mb-6">
                  {game.tags.map((tag) => (
                    <Badge
                      key={tag}
                      variant="secondary"
                      className="bg-background/50 text-xs"
                    >
                      {tag}
                    </Badge>
                  ))}
                </div>

                <div className="flex flex-col sm:flex-row gap-4">
                  <Button
                    className="bg-accent text-accent-foreground hover:bg-accent/90 rounded-full font-semibold flex-1"
                    size="lg"
                  >
                    <Play className="mr-2 floating-icon" />
                    Play Now
                  </Button>
                  <Button
                    variant="outline"
                    className="border-accent text-accent hover:bg-accent hover:text-accent-foreground rounded-full font-semibold"
                    size="lg"
                  >
                    <Info className="mr-2 floating-icon" />
                    Learn More
                  </Button>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Game Development Process */}
        <motion.div
          className="mt-20"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <Card className="glass-morphism border-border/20 p-8">
            <div className="text-center mb-12">
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
              >
                <div className="text-3xl text-accent mb-4 mx-auto w-fit">⚙️</div>
              </motion.div>
              <h4 className="text-2xl font-bold mb-4">Development Process</h4>
              <p className="text-muted-foreground">From concept to completion, here's how these games come to life</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
              {[
                { icon: Lightbulb, title: "Concept", desc: "Ideation and game design", color: "text-primary" },
                { icon: PenTool, title: "Prototype", desc: "Core mechanics testing", color: "text-accent" },
                { icon: Code, title: "Development", desc: "Full implementation", color: "text-green-400" },
                { icon: Rocket, title: "Launch", desc: "Release and iteration", color: "text-yellow-400" },
              ].map((step, index) => (
                <motion.div
                  key={step.title}
                  className="text-center"
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.2 }}
                >
                  <motion.div
                    className={`w-16 h-16 bg-opacity-20 rounded-full flex items-center justify-center mx-auto mb-4 ${
                      step.color.includes("primary") ? "bg-primary/20" :
                      step.color.includes("accent") ? "bg-accent/20" :
                      step.color.includes("green") ? "bg-green-400/20" :
                      "bg-yellow-400/20"
                    }`}
                    whileHover={{ scale: 1.1 }}
                  >
                    <step.icon className={`text-2xl ${step.color} floating-icon`} />
                  </motion.div>
                  <h5 className="font-bold mb-2">{step.title}</h5>
                  <p className="text-sm text-muted-foreground">{step.desc}</p>
                </motion.div>
              ))}
            </div>
          </Card>
        </motion.div>
      </div>
    </section>
  );
}
