'use client';

import { useState, useEffect, useRef } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { MessageSquare, Send, User, ShieldCheck, Clock, X } from 'lucide-react';
import { cn } from '@/lib/utils/cn';

interface Message {
  id: string;
  sender: 'company' | 'admin';
  sender_name: string;
  content: string;
  timestamp: string;
  context_tag?: string; // e.g., "Revenue FY2025"
}

interface CompanyFeedbackProps {
  companyId: string;
  onClose?: () => void;
  isAdmin?: boolean;
}

export function CompanyFeedback({ companyId, onClose, isAdmin = false }: CompanyFeedbackProps) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState('');
  const scrollRef = useRef<HTMLDivElement>(null);

  const storageKey = `feedback-${companyId}`;

  useEffect(() => {
    const saved = localStorage.getItem(storageKey);
    if (saved) {
      setMessages(JSON.parse(saved));
    } else {
      // Initial message
      const initial: Message[] = [
        {
          id: '1',
          sender: 'admin',
          sender_name: 'Platform Advisor',
          content: 'Hello! I have reviewed your latest financial upload. Can we discuss the working capital debt in FY2025?',
          timestamp: new Date().toISOString(),
          context_tag: 'Financials'
        }
      ];
      setMessages(initial);
      localStorage.setItem(storageKey, JSON.stringify(initial));
    }
  }, [companyId, storageKey]);

  useEffect(() => {
    if (scrollRef.current) {
        scrollRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages]);

  const handleSend = () => {
    if (!inputValue.trim()) return;

    const newMessage: Message = {
      id: Date.now().toString(),
      sender: isAdmin ? 'admin' : 'company',
      sender_name: isAdmin ? 'System Admin' : 'Company Owner',
      content: inputValue,
      timestamp: new Date().toISOString(),
    };

    const updated = [...messages, newMessage];
    setMessages(updated);
    localStorage.setItem(storageKey, JSON.stringify(updated));
    setInputValue('');
  };

  return (
    <Card className="h-full flex flex-col shadow-2xl border-l border-slate-200 rounded-none bg-slate-50/30">
      <CardHeader className="bg-white border-b py-4">
        <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-full bg-blue-600 flex items-center justify-center text-white">
                    <MessageSquare className="h-5 w-5" />
                </div>
                <div>
                    <CardTitle className="text-sm font-black uppercase tracking-tight">Intelligence Feedback</CardTitle>
                    <CardDescription className="text-[10px] uppercase">Direct line to Platform Advisors</CardDescription>
                </div>
            </div>
            {onClose && (
                <Button variant="ghost" size="icon" onClick={onClose} className="h-8 w-8 text-slate-400">
                    <X className="h-4 w-4" />
                </Button>
            )}
        </div>
      </CardHeader>
      
      <CardContent className="flex-1 overflow-hidden p-0 flex flex-col">
          <ScrollArea className="flex-1 p-4">
              <div className="space-y-6">
                {messages.map((msg) => (
                    <div key={msg.id} className={cn(
                        "flex flex-col gap-1 max-w-[85%]",
                        msg.sender === (isAdmin ? 'admin' : 'company') ? "ml-auto items-end" : "items-start"
                    )}>
                        <div className="flex items-center gap-2 mb-1">
                            <span className="text-[9px] font-bold uppercase text-slate-400">{msg.sender_name}</span>
                            <span className="text-[8px] text-slate-300 font-mono"><Clock className="h-2 w-2 inline mr-0.5" /> {new Date(msg.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
                        </div>
                        
                        {msg.context_tag && (
                            <Badge variant="outline" className="text-[8px] mb-1 bg-white border-blue-100 text-blue-600 uppercase">
                                Re: {msg.context_tag}
                            </Badge>
                        )}

                        <div className={cn(
                            "p-3 rounded-2xl text-xs leading-relaxed shadow-sm",
                            msg.sender === (isAdmin ? 'admin' : 'company') 
                                ? "bg-blue-600 text-white rounded-tr-none" 
                                : "bg-white text-slate-800 border border-slate-100 rounded-tl-none"
                        )}>
                            {msg.content}
                        </div>
                    </div>
                ))}
                <div ref={scrollRef} />
              </div>
          </ScrollArea>

          <div className="p-4 bg-white border-t mt-auto">
             <div className="flex items-center gap-2">
                <Input 
                    placeholder="Type your message..." 
                    className="h-10 text-xs bg-slate-50 border-none focus-visible:ring-1 focus-visible:ring-blue-500 shadow-none"
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                />
                <Button size="icon" className="h-10 w-10 bg-blue-600 hover:bg-blue-700 shrink-0" onClick={handleSend}>
                    <Send className="h-4 w-4" />
                </Button>
             </div>
             <p className="text-[8px] text-center text-slate-400 mt-2 uppercase tracking-widest font-bold">Encrypted Advisor Session</p>
          </div>
      </CardContent>
    </Card>
  );
}
