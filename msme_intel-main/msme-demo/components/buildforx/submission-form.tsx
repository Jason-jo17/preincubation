"use client";

import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { 
  Form, 
  FormControl, 
  FormDescription, 
  FormField, 
  FormItem, 
  FormLabel, 
  FormMessage 
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { 
  Card, 
  CardHeader, 
  CardTitle, 
  CardContent,
  CardFooter
} from '@/components/ui/card';
import { 
  Upload, 
  Github, 
  Link as LinkIcon, 
  CheckCircle2, 
  Send,
  Code,
  FileText,
  Activity
} from 'lucide-react';
import { motion } from 'framer-motion';

const submissionSchema = z.object({
  title: z.string().min(5, "Title must be at least 5 characters"),
  executive_summary: z.string().min(50, "Summary must be at least 50 characters"),
  solution_approach: z.string().min(100, "Please describe your approach in detail"),
  repo_url: z.string().url("Please enter a valid Git repository URL"),
  demo_url: z.string().url("Please enter a valid Demo URL").optional(),
  deliverables: z.string().optional(),
});

interface SubmissionFormProps {
  prdTitle: string;
  prdId: string;
  onSubmit: (values: z.infer<typeof submissionSchema>) => void;
}

const SubmissionForm: React.FC<SubmissionFormProps> = ({ prdTitle, prdId, onSubmit }) => {
  const form = useForm<z.infer<typeof submissionSchema>>({
    resolver: zodResolver(submissionSchema),
    defaultValues: {
      title: "",
      executive_summary: "",
      solution_approach: "",
      repo_url: "",
      demo_url: "",
      deliverables: "",
    },
  });

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Main Form Fields */}
          <div className="md:col-span-2 space-y-6">
            <Card className="bg-white border-slate-200 shadow-sm">
              <CardHeader className="border-b border-slate-100 pb-4">
                 <CardTitle className="text-xl font-black text-slate-900 tracking-tight flex items-center gap-2">
                    <FileText className="w-5 h-5 text-blue-600" /> Solution Overview
                 </CardTitle>
              </CardHeader>
              <CardContent className="pt-6 space-y-6">
                <FormField
                   control={form.control}
                   name="title"
                   render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-slate-500 font-black text-[10px] uppercase tracking-[0.2em]">Project Title</FormLabel>
                      <FormControl>
                        <Input placeholder="e.g. EdgeAI CV for Die Casting" {...field} className="bg-white border-slate-200 text-slate-900 h-14 focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all font-bold placeholder:text-slate-300 rounded-xl" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                   control={form.control}
                   name="executive_summary"
                   render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-slate-500 font-black text-[10px] uppercase tracking-[0.2em]">Executive Summary</FormLabel>
                      <FormControl>
                        <Textarea 
                          placeholder="Briefly describe your solution and its value..." 
                          {...field} 
                          className="bg-white border-slate-200 text-slate-900 min-h-[140px] focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all leading-relaxed font-medium placeholder:text-slate-300 rounded-xl"
                        />
                      </FormControl>
                      <FormDescription className="text-[10px] text-slate-400 font-bold italic">Highlight key innovations and business results.</FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </CardContent>
            </Card>

            <Card className="bg-white border-slate-200 shadow-sm">
              <CardHeader className="border-b border-slate-100 pb-4">
                 <CardTitle className="text-xl font-black text-slate-900 tracking-tight flex items-center gap-2">
                   <Activity className="w-5 h-5 text-emerald-600" /> Technical Implementation
                 </CardTitle>
              </CardHeader>
              <CardContent className="pt-6">
                <FormField
                   control={form.control}
                   name="solution_approach"
                   render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-slate-500 font-black text-[10px] uppercase tracking-[0.2em]">Deep Dive: Solution Approach</FormLabel>
                      <FormControl>
                        <Textarea 
                          placeholder="Describe architecture, models used, data processing..." 
                          {...field} 
                          className="bg-slate-50/50 border-slate-200 text-slate-900 min-h-[220px] focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all font-mono text-sm p-4 rounded-xl"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </CardContent>
            </Card>
          </div>

          {/* Links & Submits Sidebar */}
          <div className="space-y-6">
            <Card className="bg-white border-slate-200 shadow-sm overflow-hidden">
               <div className="h-1 w-full bg-blue-600" />
              <CardHeader className="pb-4">
                 <CardTitle className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Repository & Demo</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6 pb-6">
                <FormField
                   control={form.control}
                   name="repo_url"
                   render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-[10px] font-black text-blue-600 uppercase tracking-widest">GitHub/GitLab Link</FormLabel>
                      <FormControl>
                        <div className="relative">
                          <Github className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                          <Input {...field} className="pl-10 bg-white border-slate-200 text-slate-900 h-12 italic font-medium rounded-xl focus:ring-2 focus:ring-blue-500/20" />
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                   control={form.control}
                   name="demo_url"
                   render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-[10px] font-black text-emerald-600 uppercase tracking-widest">Live Demo Link (Optional)</FormLabel>
                      <FormControl>
                        <div className="relative">
                          <LinkIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                          <Input {...field} className="pl-10 bg-white border-slate-200 text-slate-900 h-12 italic font-medium rounded-xl focus:ring-2 focus:ring-emerald-500/20" />
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </CardContent>
            </Card>

            <Card className="bg-slate-50 border-slate-200 border-dashed border-2 p-8 flex flex-col items-center justify-center text-center space-y-4 rounded-3xl hover:bg-slate-100/50 transition-colors cursor-pointer group/upload">
               <div className="w-14 h-14 rounded-2xl bg-white border border-slate-100 flex items-center justify-center shadow-sm group-hover/upload:scale-110 transition-transform">
                  <Upload className="w-7 h-7 text-slate-400" />
               </div>
               <div>
                  <h4 className="text-slate-900 text-sm font-black tracking-tight">Artifact Upload</h4>
                  <p className="text-[10px] text-slate-400 uppercase font-bold mt-1 tracking-widest">PDFs, Videos, Models (.zip)</p>
               </div>
               <Button variant="outline" type="button" className="w-full bg-white border-slate-200 hover:bg-slate-50 text-slate-600 text-xs font-black h-10 rounded-xl shadow-sm">
                  SELECT FILES
               </Button>
            </Card>

            <div className="pt-4 space-y-4">
               <div className="flex items-start gap-3 p-4 bg-blue-50 rounded-2xl border border-blue-100">
                  <CheckCircle2 className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
                  <p className="text-[10px] font-bold text-slate-500 italic leading-relaxed">By submitting, you agree to the competition rules, IP sharing agreement, and regional data privacy policies.</p>
               </div>
               <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 text-white h-16 font-black tracking-[0.2em] text-lg group rounded-2xl shadow-lg shadow-blue-500/20 transition-all hover:scale-[1.02] active:scale-[0.98]">
                  SUBMIT SOLUTION <Send className="w-5 h-5 ml-3 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
               </Button>
            </div>
          </div>
        </div>
      </form>
    </Form>
  );
};

export default SubmissionForm;
