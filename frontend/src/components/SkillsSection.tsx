import AnimatedSection from "./AnimatedSection";
import { motion } from "framer-motion";

const categories = [
  { title: "Programming", skills: ["Python", "C++"] },
  { title: "AI / ML", skills: ["LLM Integration", "NLP", "OpenAI", "Prompt Engineering"] },
  { title: "Backend", skills: ["FastAPI", "REST APIs", "Spring Boot"] },
  { title: "Database", skills: ["MySQL", "PostgreSQL"] },
  { title: "Core", skills: ["DSA", "OOP", "API Integration", "System Design"] },
];

const SkillsSection = () => (
  <section id="skills" className="section-padding">
    <div className="max-w-5xl mx-auto">
      <AnimatedSection>
        <p className="text-sm tracking-[0.2em] uppercase text-muted-foreground mb-4 font-medium">Skills</p>
        <h2 className="text-3xl md:text-5xl font-bold text-foreground tracking-tight mb-16">
          Tools of the trade.
        </h2>
      </AnimatedSection>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {categories.map((cat, i) => (
          <AnimatedSection key={cat.title} delay={i * 0.1}>
            <motion.div
              whileHover={{ y: -4 }}
              className="border border-border rounded-lg p-6 bg-card hover:border-foreground/20 transition-colors duration-300"
            >
              <h3 className="text-sm font-semibold tracking-wide uppercase text-muted-foreground mb-4">
                {cat.title}
              </h3>
              <div className="flex flex-wrap gap-2">
                {cat.skills.map((s) => (
                  <span
                    key={s}
                    className="text-sm px-3 py-1.5 rounded-md bg-secondary text-secondary-foreground font-medium"
                  >
                    {s}
                  </span>
                ))}
              </div>
            </motion.div>
          </AnimatedSection>
        ))}
      </div>
    </div>
  </section>
);

export default SkillsSection;
