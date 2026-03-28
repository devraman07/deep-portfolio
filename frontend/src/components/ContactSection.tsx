import { useState } from "react";
import AnimatedSection from "./AnimatedSection";
import { Send, CheckCircle, AlertCircle, Loader2 } from "lucide-react";

const ContactSection = () => {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    console.log("🖱️ SUBMIT BUTTON CLICKED!");
    e.preventDefault();
    
    console.log("📋 Form values:", form);
    
    // Validate form before submitting
    if (!form.name.trim() || !form.email.trim() || !form.message.trim()) {
      console.log("❌ Validation failed - missing fields");
      setStatus("error");
      setErrorMessage("Please fill in all fields");
      return;
    }

    setStatus("loading");
    setErrorMessage("");

    try {
      console.log("🌐 Sending request to backend...");
      
      const response = await fetch(`${import.meta.env.VITE_API_URL || ''}/api/contact`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: form.name.trim(),
          email: form.email.trim(),
          message: form.message.trim(),
        }),
      });

      const data = await response.json();
      console.log("📨 Backend response:", data);

      if (data.success) {
        setStatus("success");
        setForm({ name: "", email: "", message: "" });
        
        // Reset success message after 5 seconds
        setTimeout(() => {
          setStatus("idle");
        }, 5000);
      } else {
        console.error("❌ Backend error:", data.message);
        setStatus("error");
        setErrorMessage(data.message || "Failed to send message. Please try again.");
      }
    } catch (error) {
      console.error("❌ Network error:", error);
      setStatus("error");
      setErrorMessage("Network error. Please check your connection and ensure the server is running.");
    }
  };

  return (
    <section id="contact" className="section-padding">
      <div className="max-w-2xl mx-auto">
        <AnimatedSection>
          <p className="text-sm tracking-[0.2em] uppercase text-muted-foreground mb-4 font-medium">Contact</p>
          <h2 className="text-3xl md:text-5xl font-bold text-foreground tracking-tight mb-4">
            Let's connect.
          </h2>
          <p className="text-muted-foreground mb-12">
            Have a project in mind or want to discuss AI engineering? Reach out.
          </p>
        </AnimatedSection>

        <AnimatedSection delay={0.2}>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <input
                type="text"
                placeholder="Name"
                required
                maxLength={100}
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                className="w-full bg-secondary/80 backdrop-blur-sm border border-border rounded-lg px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-foreground/50 transition-all"
              />
            </div>
            <div>
              <input
                type="email"
                placeholder="Email"
                required
                maxLength={255}
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                className="w-full bg-secondary/80 backdrop-blur-sm border border-border rounded-lg px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-foreground/50 transition-all"
              />
            </div>
            <div>
              <textarea
                placeholder="Message"
                required
                maxLength={1000}
                rows={5}
                value={form.message}
                onChange={(e) => setForm({ ...form, message: e.target.value })}
                className="w-full bg-secondary/80 backdrop-blur-sm border border-border rounded-lg px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-foreground/50 transition-all resize-none"
              />
            </div>
            <button
              type="submit"
              disabled={status === "loading"}
              className="flex items-center gap-2 bg-primary text-primary-foreground px-8 py-3 rounded-lg text-sm font-medium hover:opacity-90 transition-opacity shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed w-full sm:w-auto justify-center"
            >
              {status === "loading" && <Loader2 size={16} className="animate-spin" />}
              {status === "success" && <CheckCircle size={16} />}
              {status === "error" && <AlertCircle size={16} />}
              {status === "loading" ? "Sending..." : status === "success" ? "Sent!" : "Send Message"}
              {status !== "loading" && status !== "success" && <Send size={14} />}
            </button>

            {/* Status Messages */}
            {status === "success" && (
              <div className="flex items-center gap-2 text-green-600 bg-green-50 p-3 rounded-lg">
                <CheckCircle size={16} />
                <span className="text-sm">Message sent successfully! Check your email for confirmation.</span>
              </div>
            )}
            
            {status === "error" && (
              <div className="flex items-center gap-2 text-red-600 bg-red-50 p-3 rounded-lg">
                <AlertCircle size={16} />
                <span className="text-sm">{errorMessage}</span>
              </div>
            )}
          </form>
        </AnimatedSection>
      </div>
    </section>
  );
};

export default ContactSection;
