"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  User, 
  GraduationCap, 
  Building2, 
  ShieldCheck, 
  ArrowRight, 
  ArrowLeft,
  CheckCircle2,
  Sparkles,
  Command
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { useRouter } from "next/navigation";
import { ProfilerStep } from "./ProfilerStep";
import { TeamProfile } from "@/types/profiler.types";

type Role = "STUDENT" | "STAKEHOLDER" | "ADMIN";

export function OnboardingForm() {
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    role: "" as Role | "",
    name: "",
    email: "",
    organization: "",
    bio: "",
    profilerData: null as TeamProfile | null,
  });

  const nextStep = () => setStep(s => s + 1);
  const prevStep = () => setStep(s => s - 1);

  const selectRole = (role: Role) => {
    setFormData({ ...formData, role });
    nextStep();
  };

  const handleContextSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.role === "STUDENT") {
      setStep(4);
    } else {
      finalizeOnboarding();
    }
  };

  const finalizeOnboarding = async (profilerData?: TeamProfile) => {
    if (profilerData) {
      setFormData(prev => ({ ...prev, profilerData }));
    }
    
    // Final step is success screen
    setStep(5);
    // Call the API to save all data
    try {
      const payload = { ...formData, profilerData };
      const res = await fetch('/api/onboarding', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });
      if (!res.ok) {
        console.error("Failed to save onboarding data");
      }
    } catch (err) {
      console.error("Error saving onboarding data", err);
    }
    
    setTimeout(() => {
      router.push("/");
    }, 3000);
  };

  return (
    <div className={cn(
      "mx-auto w-full px-6 transition-all duration-500",
      step === 4 ? "max-w-6xl" : "max-w-xl"
    )}>
      <AnimatePresence mode="wait">
        {step === 1 && (
          <motion.div
            key="step1"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="space-y-8"
          >
            <div className="text-center space-y-3">
              <div className="size-16 bg-accent rounded-2xl mx-auto flex items-center justify-center shadow-2xl shadow-accent/20 mb-6">
                <Command className="w-8 h-8 text-bg-base" />
              </div>
              <h1 className="text-4xl font-black tracking-tight">Identify Your <span className="text-accent">Node</span></h1>
              <p className="text-text-secondary font-medium">Select your role to configure your ecosystem dashboard.</p>
            </div>

            <div className="grid gap-4">
              {[
                { 
                  id: "STUDENT" as Role, 
                  title: "Innovator / Student", 
                  desc: "Building projects, solving problems, and tracking growth.", 
                  icon: GraduationCap,
                  color: "border-accent/20 hover:border-accent"
                },
                { 
                  id: "STAKEHOLDER" as Role, 
                  title: "Industry / MSME", 
                  desc: "Mapping gaps, finding talent, and scaling solutions.", 
                  icon: Building2,
                  color: "border-success/20 hover:border-success"
                },
                { 
                  id: "ADMIN" as Role, 
                  title: "Ecosystem Admin", 
                  desc: "Managing stakeholders and governing the network.", 
                  icon: ShieldCheck,
                  color: "border-danger/20 hover:border-danger"
                },
              ].map((role) => (
                <button
                  key={role.id}
                  onClick={() => selectRole(role.id)}
                  className={cn(
                    "group text-left p-6 rounded-2xl bg-bg-surface border-2 transition-all duration-300",
                    role.color
                  )}
                >
                  <div className="flex items-center gap-5">
                    <div className="p-3 rounded-xl bg-bg-raised group-hover:scale-110 transition-transform">
                      <role.icon className="w-6 h-6 text-accent" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-lg font-bold">{role.title}</h3>
                      <p className="text-sm text-text-muted">{role.desc}</p>
                    </div>
                    <ArrowRight className="w-5 h-5 text-text-muted group-hover:translate-x-1 transition-transform" />
                  </div>
                </button>
              ))}
            </div>
          </motion.div>
        )}

        {step === 2 && (
          <motion.div
            key="step2"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="space-y-8"
          >
            <div className="space-y-2">
              <Button variant="ghost" size="sm" onClick={prevStep} className="gap-2 -ml-2 text-text-muted hover:text-text-primary">
                <ArrowLeft className="w-4 h-4" /> Back
              </Button>
              <h2 className="text-3xl font-black">Basic <span className="text-accent">Profile</span></h2>
              <p className="text-text-secondary">Let's start with the fundamentals.</p>
            </div>

            <form className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="name" className="text-xs font-bold uppercase tracking-widest text-text-muted">Full Name</Label>
                <Input 
                  id="name" 
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="Enter your name"
                  className="h-14 bg-bg-surface border-border rounded-xl text-lg focus:ring-accent"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email" className="text-xs font-bold uppercase tracking-widest text-text-muted">Email Address</Label>
                <Input 
                  id="email" 
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  placeholder="name@example.com"
                  className="h-14 bg-bg-surface border-border rounded-xl text-lg focus:ring-accent"
                />
              </div>
              <Button 
                onClick={nextStep} 
                disabled={!formData.name || !formData.email}
                className="w-full h-14 text-lg font-bold rounded-xl gap-2 shadow-xl shadow-accent/20"
              >
                Continue
                <ArrowRight className="w-5 h-5" />
              </Button>
            </form>
          </motion.div>
        )}

        {step === 3 && (
          <motion.div
            key="step3"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="space-y-8"
          >
            <div className="space-y-2">
              <Button variant="ghost" size="sm" onClick={prevStep} className="gap-2 -ml-2 text-text-muted hover:text-text-primary">
                <ArrowLeft className="w-4 h-4" /> Back
              </Button>
              <h2 className="text-3xl font-black">Context <span className="text-accent">Setup</span></h2>
              <p className="text-text-secondary">Where are you operating from?</p>
            </div>

            <form onSubmit={handleContextSubmit} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="org" className="text-xs font-bold uppercase tracking-widest text-text-muted">
                  {formData.role === "STUDENT" ? "Institution / College" : "Organization / Firm"}
                </Label>
                <Input 
                  id="org" 
                  value={formData.organization}
                  onChange={(e) => setFormData({ ...formData, organization: e.target.value })}
                  placeholder={formData.role === "STUDENT" ? "e.g. NITK Surathkal" : "e.g. InUnity Industries"}
                  className="h-14 bg-bg-surface border-border rounded-xl text-lg focus:ring-accent"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="bio" className="text-xs font-bold uppercase tracking-widest text-text-muted">Short Bio</Label>
                <textarea 
                  id="bio"
                  rows={4}
                  value={formData.bio}
                  onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
                  placeholder="Tell us about your work..."
                  className="w-full bg-bg-surface border border-border rounded-xl p-4 text-lg focus:outline-none focus:border-accent transition-colors"
                />
              </div>
              <Button 
                type="submit"
                disabled={!formData.organization}
                className="w-full h-14 text-lg font-bold rounded-xl gap-2 shadow-xl shadow-accent/20 bg-success hover:bg-success/90 text-bg-base"
              >
                {formData.role === "STUDENT" ? "Next: Venture Profiler" : "Complete Onboarding"}
                {formData.role === "STUDENT" ? <ArrowRight className="w-5 h-5" /> : <CheckCircle2 className="w-5 h-5" />}
              </Button>
            </form>
          </motion.div>
        )}

        {step === 4 && (
          <motion.div
            key="step4"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
          >
            <ProfilerStep 
              onComplete={finalizeOnboarding} 
              onBack={prevStep}
              initialData={{
                startupName: formData.organization,
                institution: formData.organization,
                interviewer: formData.name,
              }}
            />
          </motion.div>
        )}

        {step === 5 && (
          <motion.div
            key="step5"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center space-y-6 py-12"
          >
            <div className="size-24 bg-success/10 text-success rounded-full mx-auto flex items-center justify-center border-4 border-success/20">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", damping: 12 }}
              >
                <CheckCircle2 className="w-12 h-12" />
              </motion.div>
            </div>
            <div className="space-y-2">
              <h2 className="text-4xl font-black tracking-tight italic uppercase">Access <span className="text-success">Granted</span></h2>
              <p className="text-text-secondary font-medium">Your node is active. Syncing ecosystem data...</p>
            </div>
            <div className="flex justify-center gap-2">
              {[0, 1, 2].map((i) => (
                <motion.div
                  key={i}
                  animate={{ opacity: [0.2, 1, 0.2] }}
                  transition={{ repeat: Infinity, duration: 1, delay: i * 0.2 }}
                  className="size-1.5 rounded-full bg-success"
                />
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
