'use client';

import React, { useState } from "react";
import { 
  FileText, 
  Plus, 
  X, 
  CheckCircle2, 
  MessageSquare, 
  Star,
  Search,
  Filter,
  ArrowRight,
  TrendingUp,
  User as UserIcon
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { submitReview } from "@/app/actions/reviews";
import { toast } from "sonner";

interface Review {
  id: string;
  title: string;
  score: number;
  sentiment: string;
  feedback: string;
  status: string;
  createdAt: Date;
  candidate: {
    name: string;
    email: string;
  };
}

interface Candidate {
  id: string;
  name: string;
  email: string;
}

export default function ReviewHubClient({ 
  initialReviews, 
  candidates 
}: { 
  initialReviews: any[], 
  candidates: Candidate[] 
}) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const [formData, setFormData] = useState({
    candidateId: '',
    title: '',
    score: 5,
    sentiment: 'Positive',
    feedback: ''
  });

  const filteredReviews = initialReviews.filter(r => 
    r.candidate.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    r.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.candidateId) {
      toast.error("Please select a candidate");
      return;
    }
    setIsSubmitting(true);
    try {
      await submitReview(formData);
      toast.success("Evaluation submitted successfully");
      setIsModalOpen(false);
      setFormData({
        candidateId: '',
        title: '',
        score: 5,
        sentiment: 'Positive',
        feedback: ''
      });
    } catch (error) {
      toast.error("Failed to submit evaluation");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="p-8 space-y-8 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div className="space-y-2">
          <div className="flex items-center gap-2 text-accent">
            <FileText className="w-5 h-5" />
            <span className="text-[10px] font-black uppercase tracking-[0.3em]">Critical Assessment</span>
          </div>
          <h1 className="text-4xl font-black italic tracking-tighter uppercase">
            Review <span className="text-accent">Hub</span>
          </h1>
          <p className="text-text-secondary max-w-2xl font-medium">
            Execute expert evaluations and qualitative feedback loops for innovator progression.
          </p>
        </div>
        <Button 
          onClick={() => setIsModalOpen(true)}
          className="bg-accent text-white font-black uppercase italic rounded-none px-8 py-6 h-auto shadow-lg shadow-accent/20 hover:scale-105 transition-transform"
        >
          <Plus className="w-5 h-5 mr-2" />
          New Evaluation
        </Button>
      </div>

      {/* Analytics Row */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {[
          { label: "Total Reviews", value: initialReviews.length, icon: FileText, color: "text-accent" },
          { label: "Avg Sentiment", value: "84%", icon: TrendingUp, color: "text-green-500" },
          { label: "Pending Loops", value: candidates.length, icon: MessageSquare, color: "text-blue-500" },
        ].map((stat) => (
          <div key={stat.label} className="bg-bg-surface border border-border p-6 rounded-2xl flex items-center gap-4">
            <div className={cn("p-3 bg-bg-base rounded-xl border border-border", stat.color)}>
              <stat.icon className="w-6 h-6" />
            </div>
            <div>
              <p className="text-[10px] font-black uppercase tracking-widest text-text-muted">{stat.label}</p>
              <p className="text-2xl font-black italic">{stat.value}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Filters & Search */}
      <div className="flex flex-col md:flex-row gap-4 items-center justify-between bg-bg-surface p-4 border border-border rounded-2xl shadow-sm">
        <div className="relative w-full md:w-96">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-text-muted" />
          <input 
            type="text"
            placeholder="Search candidate or title..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-bg-base border border-border rounded-xl pl-12 pr-4 py-3 font-bold focus:outline-none focus:border-accent transition-colors"
          />
        </div>
        <div className="flex gap-2 w-full md:w-auto">
          <Button variant="outline" className="flex-1 md:flex-none font-black uppercase italic text-[10px] tracking-widest rounded-xl border-2">
            <Filter className="w-4 h-4 mr-2" />
            Filter
          </Button>
        </div>
      </div>

      {/* Review List */}
      <div className="space-y-4">
        {filteredReviews.length > 0 ? (
          filteredReviews.map((review) => (
            <motion.div 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              key={review.id} 
              className="bg-bg-surface border border-border p-6 rounded-3xl group hover:border-accent/50 transition-all shadow-sm"
            >
              <div className="flex flex-col md:flex-row gap-6">
                <div className="flex-1 space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-bg-base border border-border flex items-center justify-center">
                        <UserIcon className="w-5 h-5 text-text-muted" />
                      </div>
                      <div>
                        <h4 className="text-sm font-black uppercase tracking-tight">{review.candidate.name}</h4>
                        <p className="text-[10px] font-bold text-text-muted uppercase tracking-widest">{review.candidate.email}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className={cn(
                        "text-[9px] font-black px-3 py-1 rounded-full uppercase tracking-widest",
                        review.sentiment === 'Positive' ? "bg-green-500/10 text-green-500" : 
                        review.sentiment === 'Negative' ? "bg-red-500/10 text-red-500" : "bg-accent/10 text-accent"
                      )}>
                        {review.sentiment}
                      </span>
                      <div className="flex items-center gap-1 bg-bg-base border border-border px-3 py-1 rounded-full">
                        <Star className="w-3 h-3 text-yellow-500 fill-yellow-500" />
                        <span className="text-[10px] font-black">{review.score}/10</span>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <h3 className="text-xl font-black italic uppercase tracking-tighter group-hover:text-accent transition-colors">
                      {review.title}
                    </h3>
                    <p className="text-xs text-text-secondary leading-relaxed font-medium line-clamp-2">
                      {review.feedback}
                    </p>
                  </div>

                  <div className="flex items-center justify-between pt-4 border-t border-border">
                    <span className="text-[9px] font-black uppercase tracking-widest text-text-muted">
                      {new Date(review.createdAt).toLocaleDateString()}
                    </span>
                    <Button variant="ghost" className="font-black uppercase italic text-[10px] tracking-widest text-accent group-hover:bg-accent group-hover:text-white transition-all rounded-xl">
                      View Full Audit
                      <ArrowRight className="w-3 h-3 ml-2" />
                    </Button>
                  </div>
                </div>
              </div>
            </motion.div>
          ))
        ) : (
          <div className="py-20 flex flex-col items-center text-center space-y-4 bg-bg-surface border border-dashed border-border rounded-3xl">
            <div className="p-4 bg-bg-base rounded-2xl border border-border">
              <FileText className="w-8 h-8 text-text-muted" />
            </div>
            <div className="space-y-1">
              <h3 className="text-sm font-black uppercase tracking-tight">No reviews found</h3>
              <p className="text-[10px] text-text-muted font-bold uppercase tracking-widest">Start by initiating a new evaluation.</p>
            </div>
          </div>
        )}
      </div>

      {/* Evaluation Modal */}
      <AnimatePresence>
        {isModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsModalOpen(false)}
              className="absolute inset-0 bg-bg-base/80 backdrop-blur-sm" 
            />
            <motion.div 
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="relative w-full max-w-2xl bg-bg-surface border border-border p-8 rounded-[2.5rem] shadow-2xl overflow-hidden"
            >
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-accent to-accent-secondary" />
              
              <div className="flex justify-between items-start mb-8">
                <div className="space-y-1">
                  <h2 className="text-2xl font-black italic uppercase tracking-tighter">New <span className="text-accent">Evaluation</span></h2>
                  <p className="text-[10px] font-black uppercase tracking-widest text-text-muted">Critical Performance Review</p>
                </div>
                <button onClick={() => setIsModalOpen(false)} className="p-2 hover:bg-bg-base rounded-full transition-colors">
                  <X className="w-5 h-5" />
                </button>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div className="space-y-1.5">
                      <label className="text-[10px] font-black uppercase tracking-widest text-text-muted ml-1">Candidate</label>
                      <select 
                        required
                        value={formData.candidateId}
                        onChange={e => setFormData({ ...formData, candidateId: e.target.value })}
                        className="w-full bg-bg-base border border-border rounded-xl px-4 py-3 font-bold focus:outline-none focus:border-accent transition-colors appearance-none"
                      >
                        <option value="">Select Candidate</option>
                        {candidates.map(c => (
                          <option key={c.id} value={c.id}>{c.name}</option>
                        ))}
                      </select>
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-[10px] font-black uppercase tracking-widest text-text-muted ml-1">Audit Title</label>
                      <input 
                        required
                        value={formData.title}
                        onChange={e => setFormData({ ...formData, title: e.target.value })}
                        placeholder="e.g. Q1 Growth Strategy Review"
                        className="w-full bg-bg-base border border-border rounded-xl px-4 py-3 font-bold focus:outline-none focus:border-accent transition-colors"
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-1.5">
                        <label className="text-[10px] font-black uppercase tracking-widest text-text-muted ml-1">Performance Score (0-10)</label>
                        <input 
                          type="number"
                          min="0"
                          max="10"
                          value={formData.score}
                          onChange={e => setFormData({ ...formData, score: parseInt(e.target.value) })}
                          className="w-full bg-bg-base border border-border rounded-xl px-4 py-3 font-bold focus:outline-none focus:border-accent transition-colors"
                        />
                      </div>
                      <div className="space-y-1.5">
                        <label className="text-[10px] font-black uppercase tracking-widest text-text-muted ml-1">Sentiment</label>
                        <select 
                          value={formData.sentiment}
                          onChange={e => setFormData({ ...formData, sentiment: e.target.value })}
                          className="w-full bg-bg-base border border-border rounded-xl px-4 py-3 font-bold focus:outline-none focus:border-accent transition-colors appearance-none"
                        >
                          <option value="Positive">Positive</option>
                          <option value="Neutral">Neutral</option>
                          <option value="Negative">Negative</option>
                        </select>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-[10px] font-black uppercase tracking-widest text-text-muted ml-1">Qualitative Feedback</label>
                    <textarea 
                      required
                      value={formData.feedback}
                      onChange={e => setFormData({ ...formData, feedback: e.target.value })}
                      placeholder="Enter detailed observation data..."
                      className="w-full h-[210px] bg-bg-base border border-border rounded-xl px-4 py-3 font-bold focus:outline-none focus:border-accent transition-colors resize-none"
                    />
                  </div>
                </div>

                <Button 
                  disabled={isSubmitting}
                  className="w-full bg-text-primary text-bg-base font-black uppercase italic py-6 rounded-2xl hover:scale-[1.02] transition-transform flex items-center justify-center gap-2"
                >
                  {isSubmitting ? (
                    <div className="w-5 h-5 border-2 border-bg-base border-t-transparent rounded-full animate-spin" />
                  ) : (
                    <>
                      <CheckCircle2 className="w-5 h-5" />
                      Seal Evaluation
                    </>
                  )}
                </Button>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
