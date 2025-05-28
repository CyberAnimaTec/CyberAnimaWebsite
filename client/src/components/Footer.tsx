import { motion } from "framer-motion";
import { Rocket } from "lucide-react";

export default function Footer() {
  const scrollToSection = (sectionId: string) => {
    const element = document.querySelector(sectionId);
    element?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <footer className="relative z-10 px-6 lg:px-8 py-12 border-t border-border/20">
      <div className="max-w-7xl mx-auto">
        <motion.div
          className="text-center"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <motion.div
            className="flex items-center justify-center space-x-3 mb-6"
            whileHover={{ scale: 1.05 }}
          >
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            >
              <Rocket className="text-2xl text-accent floating-icon" />
            </motion.div>
            <h4 className="text-xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              Cosmic Portfolio
            </h4>
          </motion.div>

          <p className="text-muted-foreground mb-6 max-w-md mx-auto">
            Exploring the intersection of art, technology, and the infinite cosmos.
          </p>

          <div className="flex justify-center space-x-8 mb-8">
            {[
              { href: "#home", label: "Home" },
              { href: "#featured", label: "Projects" },
              { href: "#games", label: "Games" },
              { href: "#contact", label: "Contact" },
            ].map((link, index) => (
              <motion.button
                key={link.href}
                onClick={() => scrollToSection(link.href)}
                className="text-muted-foreground hover:text-accent transition-colors text-sm"
                whileHover={{ y: -2 }}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                {link.label}
              </motion.button>
            ))}
          </div>

          <motion.div
            className="text-muted-foreground text-sm"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.5 }}
          >
            <p>&copy; 2024 Cosmic Portfolio. Made with ❤️ and stardust.</p>
          </motion.div>
        </motion.div>
      </div>
    </footer>
  );
}
