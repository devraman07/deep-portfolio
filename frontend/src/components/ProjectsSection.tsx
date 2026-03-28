import { useState } from "react";
import AnimatedSection from "./AnimatedSection";
import { motion, AnimatePresence } from "framer-motion";
import { ExternalLink, X } from "lucide-react";

interface Project {
  title: string;
  description: string;
  details: string;
  tech: string[];
  impact: string;
}

const projects: Project[] = [
  {
    title: "AI-Powered Online Banking Software",
    description: "Secure banking platform with AI-driven automation and intelligent fraud detection capabilities.",
    details:
      "Built a comprehensive banking application featuring JWT authentication with 2FA security, LLM integration for automated customer support and transaction analysis, and a robust API architecture handling real-time financial operations.",
    tech: ["Spring Boot", "PostgreSQL", "JavaScript", "JWT", "LLM"],
    impact: "Enterprise-grade security with 2FA and AI-powered automation",
  },
  {
    title: "AI Meeting Notes Generator",
    description: "Automated transcription and intelligent summarization of meetings using Whisper and LLMs.",
    details:
      "Developed an end-to-end meeting intelligence tool leveraging OpenAI Whisper for accurate speech-to-text transcription, paired with LLM-powered summarization. Features a FastAPI backend for processing and a Streamlit UI for seamless user interaction.",
    tech: ["Python", "FastAPI", "Whisper", "Streamlit", "OpenAI"],
    impact: "Reduced meeting documentation time by 80%",
  },
];

const ProjectsSection = () => {
  const [selected, setSelected] = useState<Project | null>(null);

  return (
    <section id="projects" className="section-padding relative bg-secondary">
      <div className="max-w-5xl mx-auto">
        <AnimatedSection>
          <p className="text-sm tracking-[0.2em] uppercase text-muted-foreground mb-4 font-medium">Projects</p>
          <h2 className="text-3xl md:text-5xl font-bold text-foreground tracking-tight mb-16">
            Selected work.
          </h2>
        </AnimatedSection>

        <div className="grid md:grid-cols-2 gap-6">
          {projects.map((p, i) => (
            <AnimatedSection key={p.title} delay={i * 0.15}>
              <motion.div
                whileHover={{ y: -4 }}
                className="border border-border rounded-2xl p-8 bg-card/50 backdrop-blur-sm hover:border-foreground/20 transition-all duration-300 flex flex-col h-full shadow-lg hover:shadow-xl"
              >
                <h3 className="text-xl font-bold text-foreground mb-3">{p.title}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed mb-6 flex-1">
                  {p.description}
                </p>
                <div className="flex flex-wrap gap-2 mb-6">
                  {p.tech.map((t) => (
                    <span
                      key={t}
                      className="text-xs px-3 py-1.5 rounded-lg bg-secondary/80 text-muted-foreground font-medium"
                    >
                      {t}
                    </span>
                  ))}
                </div>
                <button
                  onClick={() => setSelected(p)}
                  className="flex items-center gap-2 text-sm font-medium text-foreground hover:opacity-70 transition-opacity self-start"
                >
                  View Details <ExternalLink size={14} />
                </button>
              </motion.div>
            </AnimatedSection>
          ))}
        </div>
      </div>

      {/* Modal */}
      <AnimatePresence>
        {selected && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-foreground/50 backdrop-blur-sm p-6"
            onClick={() => setSelected(null)}
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-card/90 backdrop-blur-md border border-border rounded-2xl p-8 max-w-lg w-full relative shadow-2xl"
            >
              <button
                onClick={() => setSelected(null)}
                className="absolute top-4 right-4 text-muted-foreground hover:text-foreground"
              >
                <X size={18} />
              </button>
              <h3 className="text-2xl font-bold text-foreground mb-4">{selected.title}</h3>
              <p className="text-muted-foreground leading-relaxed mb-6">{selected.details}</p>
              <p className="text-sm font-medium text-foreground mb-4">
                Impact: <span className="text-muted-foreground font-normal">{selected.impact}</span>
              </p>
              <div className="flex flex-wrap gap-2">
                {selected.tech.map((t) => (
                  <span
                    key={t}
                    className="text-xs px-3 py-1.5 rounded-lg bg-secondary/80 text-muted-foreground font-medium"
                  >
                    {t}
                  </span>
                ))}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default ProjectsSection;
