import { motion } from "framer-motion";
import { useEffect, useState } from "react";

interface Star {
  id: number;
  x: number;
  y: number;
  size: number;
  delay: number;
}

interface Particle {
  id: number;
  x: number;
  y: number;
  delay: number;
  duration: number;
}

export default function BackgroundEffects() {
  const [stars, setStars] = useState<Star[]>([]);
  const [particles, setParticles] = useState<Particle[]>([]);

  useEffect(() => {
    // Generate random stars
    const newStars: Star[] = [];
    for (let i = 0; i < 30; i++) {
      newStars.push({
        id: i,
        x: Math.random() * 100,
        y: Math.random() * 100,
        size: Math.random() * 2 + 0.5,
        delay: Math.random() * 5,
      });
    }
    setStars(newStars);

    // Generate floating particles
    const newParticles: Particle[] = [];
    for (let i = 0; i < 8; i++) {
      newParticles.push({
        id: i,
        x: Math.random() * 100,
        y: Math.random() * 100,
        delay: Math.random() * 15,
        duration: 25 + Math.random() * 15,
      });
    }
    setParticles(newParticles);
  }, []);

  return (
    <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
      {/* Cosmic gradient background */}
      <div className="absolute inset-0 cosmic-gradient" />

      {/* Nebula effects */}
      <motion.div
        className="absolute w-96 h-96 rounded-full nebula-gradient opacity-10"
        style={{ top: "-100px", right: "-100px" }}
        animate={{
          scale: [1, 1.05, 1],
          opacity: [0.08, 0.15, 0.08],
        }}
        transition={{
          duration: 12,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
      <motion.div
        className="absolute w-64 h-64 rounded-full nebula-gradient opacity-8"
        style={{ bottom: "-50px", left: "-50px" }}
        animate={{
          scale: [1, 1.08, 1],
          opacity: [0.05, 0.12, 0.05],
        }}
        transition={{
          duration: 15,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 3,
        }}
      />

      {/* Animated stars */}
      {stars.map((star) => (
        <motion.div
          key={star.id}
          className="absolute bg-white rounded-full"
          style={{
            left: `${star.x}%`,
            top: `${star.y}%`,
            width: `${star.size}px`,
            height: `${star.size}px`,
          }}
          animate={{
            opacity: [0.2, 0.6, 0.2],
            scale: [1, 1.05, 1],
          }}
          transition={{
            duration: 5,
            repeat: Infinity,
            ease: "easeInOut",
            delay: star.delay,
          }}
        />
      ))}

      {/* Floating particles */}
      {particles.map((particle) => (
        <motion.div
          key={particle.id}
          className="absolute w-0.5 h-0.5 bg-white rounded-full"
          style={{
            left: `${particle.x}%`,
            top: `${particle.y}%`,
          }}
          animate={{
            x: ["0vw", "100vw"],
            opacity: [0, 1, 1, 0],
          }}
          transition={{
            duration: particle.duration,
            repeat: Infinity,
            ease: "linear",
            delay: particle.delay,
          }}
        />
      ))}

      {/* Meteor trails - more subtle */}
      <motion.div
        className="absolute w-0.5 h-8 bg-gradient-to-b from-accent to-transparent opacity-50"
        style={{ top: "10%", left: "-50px" }}
        animate={{
          x: ["0vw", "120vw"],
          y: ["0vh", "50vh"],
          rotate: 45,
          opacity: [0, 0.3, 0.3, 0],
        }}
        transition={{
          duration: 12,
          repeat: Infinity,
          ease: "linear",
          repeatDelay: 15,
        }}
      />

      {/* Parallax scroll effect */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-b from-transparent via-primary/5 to-transparent"
        style={{
          backgroundImage: `radial-gradient(circle at 20% 50%, rgba(108, 92, 231, 0.1) 0%, transparent 50%),
                           radial-gradient(circle at 80% 20%, rgba(0, 210, 255, 0.1) 0%, transparent 50%),
                           radial-gradient(circle at 40% 80%, rgba(108, 92, 231, 0.05) 0%, transparent 50%)`,
        }}
        animate={{
          backgroundPosition: ["0% 0%", "100% 100%"],
        }}
        transition={{
          duration: 60,
          repeat: Infinity,
          repeatType: "reverse",
          ease: "linear",
        }}
      />
    </div>
  );
}
