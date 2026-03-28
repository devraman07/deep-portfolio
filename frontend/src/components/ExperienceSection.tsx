import AnimatedSection from "./AnimatedSection";

const experiences = [
  {
    role: "Gen AI Intern",
    company: "RT Network Pvt Ltd",
    period: "Recent",
    points: [
      "Developed and integrated LLM-powered features into production applications",
      "Built AI pipelines for data processing and intelligent automation",
      "Collaborated with cross-functional teams to deliver AI-driven solutions",
    ],
  },
  {
    role: "Intern",
    company: "Employability.life",
    period: "Previous",
    points: [
      "Built backend services and API integrations for the employability platform",
      "Implemented data-driven features to improve user experience",
      "Contributed to scalable architecture design",
    ],
  },
  {
    role: "Life Advisor",
    company: "HDFC Life",
    period: "Previous",
    points: [
      "Developed strong client-facing communication and consultative skills",
      "Analyzed data to provide personalized financial recommendations",
    ],
  },
];

const ExperienceSection = () => (
  <section id="experience" className="section-padding">
    <div className="max-w-5xl mx-auto">
      <AnimatedSection>
        <p className="text-sm tracking-[0.2em] uppercase text-muted-foreground mb-4 font-medium">Experience</p>
        <h2 className="text-3xl md:text-5xl font-bold text-foreground tracking-tight mb-16">
          Where I've contributed.
        </h2>
      </AnimatedSection>

      <div className="space-y-0">
        {experiences.map((exp, i) => (
          <AnimatedSection key={exp.role} delay={i * 0.1}>
            <div className="border-l-2 border-border pl-8 pb-12 relative">
              <div className="absolute -left-[7px] top-1 w-3 h-3 rounded-full bg-foreground" />
              <div className="flex flex-col sm:flex-row sm:items-center gap-2 mb-3">
                <h3 className="text-lg font-bold text-foreground">{exp.role}</h3>
                <span className="text-muted-foreground text-sm">— {exp.company}</span>
                <span className="text-xs text-muted-foreground ml-auto">{exp.period}</span>
              </div>
              <ul className="space-y-2">
                {exp.points.map((p, j) => (
                  <li key={j} className="text-sm text-muted-foreground leading-relaxed">
                    {p}
                  </li>
                ))}
              </ul>
            </div>
          </AnimatedSection>
        ))}
      </div>
    </div>
  </section>
);

export default ExperienceSection;
