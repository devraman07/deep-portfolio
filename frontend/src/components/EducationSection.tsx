import AnimatedSection from "./AnimatedSection";

const education = [
  { degree: "B.Tech in Computer Science & Engineering", school: "Sister Nivedita University", year: "Current" },
  { degree: "Higher Secondary (XII)", school: "Completed", year: "" },
  { degree: "Secondary (X)", school: "Completed", year: "" },
];

const EducationSection = () => (
  <section className="section-padding bg-secondary">
    <div className="max-w-5xl mx-auto">
      <AnimatedSection>
        <p className="text-sm tracking-[0.2em] uppercase text-muted-foreground mb-4 font-medium">Education</p>
        <h2 className="text-3xl md:text-5xl font-bold text-foreground tracking-tight mb-16">
          Academic foundation.
        </h2>
      </AnimatedSection>

      <div className="grid md:grid-cols-3 gap-6">
        {education.map((e, i) => (
          <AnimatedSection key={e.degree} delay={i * 0.1}>
            <div className="border border-border rounded-lg p-6 bg-card">
              <h3 className="font-bold text-foreground mb-2">{e.degree}</h3>
              <p className="text-sm text-muted-foreground">{e.school}</p>
              {e.year && <p className="text-xs text-muted-foreground mt-2">{e.year}</p>}
            </div>
          </AnimatedSection>
        ))}
      </div>
    </div>
  </section>
);

export default EducationSection;
