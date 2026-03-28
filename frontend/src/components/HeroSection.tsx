import { motion } from "framer-motion";
import { ArrowDown, Download } from "lucide-react";

const HeroSection = () => (
  <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
    {/* Grid background */}
    <div className="absolute inset-0 bg-[linear-gradient(to_right,hsl(0_0%_90%)_1px,transparent_1px),linear-gradient(to_bottom,hsl(0_0%_90%)_1px,transparent_1px)] bg-[size:60px_60px] opacity-40" />
    
    {/* Gradient orb */}
    <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[600px] rounded-full bg-gradient-to-br from-foreground/5 to-transparent blur-3xl" />

    <div className="relative z-10 px-6 max-w-6xl w-full">
      <div className="grid lg:grid-cols-2 gap-12 items-center">
        {/* Left side - Text content */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
        >
          <div className="text-left">
            <p className="text-sm tracking-[0.3em] uppercase text-muted-foreground mb-6 font-medium">
              AI Engineer &bull; Backend Developer
            </p>
            <h1 className="text-5xl sm:text-7xl md:text-8xl font-bold tracking-tight text-foreground leading-[0.9]">
              Dipayan
              <br />
              Maiti
            </h1>
          </div>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="mt-8 text-lg md:text-xl text-muted-foreground max-w-2xl leading-relaxed"
          >
            Building intelligent systems with AI, automation, and scalable backend architectures.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="mt-10 flex flex-col sm:flex-row items-start gap-4"
          >
            <a
              href="#projects"
              className="bg-primary text-primary-foreground px-8 py-3 rounded-lg text-sm font-medium hover:opacity-90 transition-opacity"
            >
              View Projects
            </a>
            <a
              href="/resume.pdf"
              download
              className="flex items-center gap-2 border border-border px-8 py-3 rounded-lg text-sm font-medium text-foreground hover:bg-secondary transition-colors"
            >
              <Download size={16} />
              Download Resume
            </a>
          </motion.div>
        </motion.div>

        {/* Right side - Image */}
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="relative"
        >
          <div className="relative w-full h-[400px] lg:h-[500px] rounded-2xl overflow-hidden shadow-2xl">
            <img
              src="/deepImg.png"
              alt="Dipayan Maiti"
              className="w-full h-full object-cover object-top"
              style={{ imageRendering: 'crisp-edges' }}
            />
            {/* Subtle overlay gradient */}
            <div className="absolute inset-0 bg-gradient-to-t from-background/5 to-transparent" />
          </div>
        </motion.div>
      </div>
    </div>

    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 1.2, duration: 1 }}
      className="absolute bottom-10 left-1/2 -translate-x-1/2"
    >
      <a href="#about" className="text-muted-foreground hover:text-foreground transition-colors">
        <ArrowDown size={20} className="animate-bounce" />
      </a>
    </motion.div>
  </section>
);

export default HeroSection;
