'use client';

import React, { useState } from "react";
import { BrainCircuit, Send, X, Sparkles, Cpu } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export default function NeuralLink() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { role: 'assistant', content: 'Neural Link synchronized. How can I accelerate your venture trajectory today?' }
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMsg = input;
    setInput('');
    setMessages(prev => [...prev, { role: 'user', content: userMsg }]);
    setIsTyping(true);

    // Mock AI Response
    setTimeout(() => {
      const response = getMockAIResponse(userMsg);
      setMessages(prev => [...prev, { role: 'assistant', content: response }]);
      setIsTyping(false);
    }, 1500);
  };

  const getMockAIResponse = (query: string) => {
    const q = query.toLowerCase();
    if (q.includes('market')) return "Analyzing regional market nodes... I detect a significant gap in the Tier 2 healthcare logistics sector. Recommended focus: decentralized cold-chain management.";
    if (q.includes('funding')) return "Lattice analysis suggests focusing on early-stage incubation grants before series A. Current TRL 4 status is optimal for MSINS Seed acceleration.";
    if (q.includes('scale')) return "Scaling requires architectural elasticity. Consider migrating to a multi-node deployment strategy in the Pune Tech Corridor.";
    return "Directive received. Optimizing innovation parameters. Your current roadmap is 12% ahead of cohort average. Stay focused on the TRL 5 gate.";
  };

  return (
    <>
      <Button 
        onClick={() => setIsOpen(true)}
        className="fixed bottom-8 right-8 size-16 bg-accent text-white rounded-full shadow-2xl shadow-accent/50 hover:scale-110 transition-transform z-50 flex items-center justify-center p-0"
      >
        <BrainCircuit className="w-8 h-8" />
        <div className="absolute inset-0 rounded-full border-2 border-white/20 animate-ping" />
      </Button>

      <AnimatePresence>
        {isOpen && (
          <div className="fixed inset-0 z-[60] flex items-end justify-end p-8 pointer-events-none">
            <motion.div 
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="w-full max-w-md bg-bg-surface border border-border rounded-[2.5rem] shadow-2xl overflow-hidden pointer-events-auto flex flex-col h-[600px]"
            >
              <div className="p-6 bg-text-primary text-bg-base flex justify-between items-center">
                <div className="flex items-center gap-3">
                  <div className="size-10 bg-accent rounded-xl flex items-center justify-center">
                    <Cpu className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-sm font-black uppercase tracking-widest italic">Neural Link</h3>
                    <p className="text-[8px] font-bold opacity-50 uppercase tracking-widest">Co-Innovator AI v4.2</p>
                  </div>
                </div>
                <button onClick={() => setIsOpen(false)} className="p-2 hover:bg-white/10 rounded-full transition-colors">
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="flex-1 overflow-y-auto p-6 space-y-4 custom-scrollbar">
                {messages.map((msg, i) => (
                  <motion.div 
                    initial={{ opacity: 0, x: msg.role === 'user' ? 20 : -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    key={i} 
                    className={cn(
                      "max-w-[85%] p-4 rounded-2xl text-xs font-medium leading-relaxed",
                      msg.role === 'user' 
                        ? "ml-auto bg-accent text-white rounded-tr-none" 
                        : "mr-auto bg-bg-base border border-border rounded-tl-none"
                    )}
                  >
                    {msg.content}
                  </motion.div>
                ))}
                {isTyping && (
                  <div className="flex gap-1 p-2 bg-bg-base rounded-lg w-fit">
                    <div className="size-1 bg-accent rounded-full animate-bounce" />
                    <div className="size-1 bg-accent rounded-full animate-bounce [animation-delay:0.2s]" />
                    <div className="size-1 bg-accent rounded-full animate-bounce [animation-delay:0.4s]" />
                  </div>
                )}
              </div>

              <div className="p-6 border-t border-border bg-bg-surface">
                <div className="relative">
                  <input 
                    value={input}
                    onChange={e => setInput(e.target.value)}
                    onKeyPress={e => e.key === 'Enter' && handleSend()}
                    placeholder="Sync query with AI..."
                    className="w-full bg-bg-base border border-border rounded-2xl pl-4 pr-12 py-4 text-xs font-black placeholder:text-text-muted focus:outline-none focus:border-accent transition-colors"
                  />
                  <button 
                    onClick={handleSend}
                    className="absolute right-2 top-1/2 -translate-y-1/2 p-2 text-accent hover:scale-110 transition-transform"
                  >
                    <Send className="w-5 h-5" />
                  </button>
                </div>
                <div className="mt-4 flex items-center justify-center gap-4 text-[8px] font-black uppercase tracking-[0.2em] text-text-muted">
                  <span className="flex items-center gap-1"><Sparkles className="w-2 h-2" /> Venture Intel</span>
                  <span className="flex items-center gap-1"><Sparkles className="w-2 h-2" /> IP Strategy</span>
                  <span className="flex items-center gap-1"><Sparkles className="w-2 h-2" /> Market Sync</span>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}
