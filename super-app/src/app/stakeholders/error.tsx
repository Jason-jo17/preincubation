"use client";

import React, { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { AlertCircle, RotateCcw, Home } from "lucide-react";
import Link from "next/link";

export default function StakeholdersError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="min-h-[70vh] flex flex-col items-center justify-center p-8 text-center space-y-6">
      <div className="p-4 bg-red-50 dark:bg-red-900/10 rounded-full">
        <AlertCircle className="w-12 h-12 text-red-500" />
      </div>
      
      <div className="space-y-2">
        <h2 className="text-3xl font-black uppercase italic tracking-tighter">
          Intelligence <span className="text-red-500">Bypass</span>
        </h2>
        <p className="text-text-secondary max-w-md mx-auto font-medium">
          The system encountered an unexpected synchronization error. This could be due to a lost connection or a database timeout.
        </p>
      </div>

      <div className="flex items-center gap-3">
        <Button 
          onClick={reset}
          className="font-black uppercase italic tracking-widest px-8 h-12"
        >
          <RotateCcw className="w-4 h-4 mr-2" />
          Retry Sync
        </Button>
        <Link href="/">
          <Button variant="outline" className="font-black uppercase italic tracking-widest px-8 h-12">
            <Home className="w-4 h-4 mr-2" />
            Home
          </Button>
        </Link>
      </div>

      {process.env.NODE_ENV === "development" && (
        <div className="mt-8 p-4 bg-bg-surface border border-border rounded-xl text-left max-w-2xl overflow-auto">
          <p className="text-[10px] font-black uppercase text-red-500 mb-2">Debug Trace:</p>
          <pre className="text-[10px] font-mono text-text-muted leading-tight">
            {error.message}
            {error.stack}
          </pre>
        </div>
      )}
    </div>
  );
}
