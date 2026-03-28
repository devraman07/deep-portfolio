import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageCircle, X, Send } from "lucide-react";

interface Message {
  role: "user" | "assistant";
  content: string;
}

const knowledgeBase: Record<string, string> = {
  skills:
    "Dipayan is skilled in Python, C++, FastAPI, REST APIs, Spring Boot, MySQL, PostgreSQL, LLM Integration, NLP, OpenAI, DSA, OOP, and System Design.",
  projects:
    "Key projects include an AI-Powered Online Banking Software (Spring Boot, PostgreSQL, JWT, 2FA, LLM integration) and an AI Meeting Notes Generator (Whisper, FastAPI, Streamlit, OpenAI).",
  experience:
    "Dipayan has worked as a Gen AI Intern at RT Network Pvt Ltd, an Intern at Employability.life, and a Life Advisor at HDFC Life.",
  education:
    "Dipayan is pursuing B.Tech in CSE from Sister Nivedita University.",
  contact:
    "You can reach Dipayan through the contact form on this website, or connect via GitHub and LinkedIn (links in the footer).",
  about:
    "Dipayan Maiti is an aspiring AI Engineer focused on building intelligent systems with AI, automation, and scalable backend architectures.",
};

function getResponse(input: string): string {
  const lower = input.toLowerCase();
  if (lower.includes("skill") || lower.includes("tech") || lower.includes("stack"))
    return knowledgeBase.skills;
  if (lower.includes("project") || lower.includes("work") || lower.includes("built"))
    return knowledgeBase.projects;
  if (lower.includes("experience") || lower.includes("job") || lower.includes("intern"))
    return knowledgeBase.experience;
  if (lower.includes("education") || lower.includes("degree") || lower.includes("university"))
    return knowledgeBase.education;
  if (lower.includes("contact") || lower.includes("email") || lower.includes("reach"))
    return knowledgeBase.contact;
  if (lower.includes("who") || lower.includes("about") || lower.includes("dipayan"))
    return knowledgeBase.about;
  return "I can tell you about Dipayan's skills, projects, experience, education, or how to contact him. What would you like to know?";
}

const ChatBot = () => {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    { role: "assistant", content: "Hi! I'm Dipayan's AI assistant. Ask me about his skills, projects, or experience." },
  ]);
  const [input, setInput] = useState("");
  const endRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const send = () => {
    if (!input.trim()) return;
    const userMsg: Message = { role: "user", content: input.trim() };
    const reply: Message = { role: "assistant", content: getResponse(input) };
    setMessages((prev) => [...prev, userMsg, reply]);
    setInput("");
  };

  return (
    <>
      {/* Toggle button */}
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setOpen(!open)}
        className="fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full bg-primary text-primary-foreground flex items-center justify-center shadow-2xl"
      >
        {open ? <X size={20} /> : <MessageCircle size={20} />}
      </motion.button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            className="fixed bottom-24 right-6 z-50 w-80 sm:w-96 glass-panel rounded-xl overflow-hidden flex flex-col"
            style={{ maxHeight: "500px" }}
          >
            {/* Header */}
            <div className="px-5 py-4 border-b border-border/20">
              <h3 className="text-sm font-semibold text-primary-foreground">AI Assistant</h3>
              <p className="text-xs text-muted-foreground">Ask about Dipayan</p>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-3 min-h-[250px]">
              {messages.map((m, i) => (
                <div key={i} className={`flex ${m.role === "user" ? "justify-end" : "justify-start"}`}>
                  <div
                    className={`max-w-[80%] px-3 py-2 rounded-lg text-sm ${
                      m.role === "user"
                        ? "bg-primary text-primary-foreground"
                        : "bg-secondary text-secondary-foreground"
                    }`}
                  >
                    {m.content}
                  </div>
                </div>
              ))}
              <div ref={endRef} />
            </div>

            {/* Input */}
            <div className="p-3 border-t border-border/20 flex gap-2">
              <input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && send()}
                placeholder="Ask me anything..."
                className="flex-1 bg-secondary/50 border border-border/30 rounded-md px-3 py-2 text-sm text-primary-foreground placeholder:text-muted-foreground focus:outline-none"
              />
              <button
                onClick={send}
                className="bg-primary text-primary-foreground p-2 rounded-md hover:opacity-80 transition-opacity"
              >
                <Send size={14} />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default ChatBot;
