import AnimatedSection from "./AnimatedSection";

const AboutSection = () => (
  <section id="about" className="section-padding bg-secondary">
    <div className="max-w-5xl mx-auto">
      <AnimatedSection>
        <p className="text-sm tracking-[0.2em] uppercase text-muted-foreground mb-4 font-medium">About</p>
        <h2 className="text-3xl md:text-5xl font-bold text-foreground tracking-tight mb-8">
          Engineering intelligence<br className="hidden md:block" /> into every system.
        </h2>
      </AnimatedSection>
      <AnimatedSection delay={0.2}>
        <div className="grid md:grid-cols-2 gap-12">
          <p className="text-muted-foreground leading-relaxed text-lg">
            I'm an aspiring AI Engineer with deep expertise in Python, backend development, 
            and AI/ML integration. My focus is on building production-grade intelligent systems 
            that bridge the gap between cutting-edge AI research and real-world applications.
          </p>
          <p className="text-muted-foreground leading-relaxed text-lg">
            With hands-on experience in LLM integration, FastAPI, REST APIs, and scalable 
            database architectures, I craft solutions that are not just smart — but reliable, 
            secure, and built to scale. Every line of code is written with purpose.
          </p>
        </div>
      </AnimatedSection>
    </div>
  </section>
);

export default AboutSection;
