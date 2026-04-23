"use client";

import React from 'react';
import Link from 'next/link';
import { ChevronRight, Home, ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';

interface BreadcrumbItem {
  label: string;
  href?: string;
}

interface BreadcrumbsProps {
  items: BreadcrumbItem[];
  showBack?: boolean;
}

export function Breadcrumbs({ items, showBack = true }: BreadcrumbsProps) {
  const router = useRouter();

  return (
    <nav className="flex items-center space-x-2 text-xs font-bold uppercase tracking-widest text-slate-400 mb-6 group">
      {showBack && (
        <>
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={() => router.back()} 
            className="h-7 px-2 -ml-2 text-slate-500 hover:text-blue-600 hover:bg-transparent flex items-center gap-1 transition-all"
          >
            <ArrowLeft className="w-3 h-3" />
            <span>Back</span>
          </Button>
          <div className="h-4 w-[1px] bg-slate-200 mx-1" />
        </>
      )}
      
      <Link href="/" className="hover:text-slate-900 transition-colors flex items-center gap-1">
        <Home className="w-3 h-3" />
      </Link>

      {items.map((item, index) => (
        <React.Fragment key={index}>
          <ChevronRight className="w-3 h-3 text-slate-300" />
          {item.href ? (
            <Link href={item.href} className="hover:text-slate-900 transition-colors truncate max-w-[150px]">
              {item.label}
            </Link>
          ) : (
            <span className="text-slate-900 font-black italic truncate max-w-[200px]">
              {item.label}
            </span>
          )}
        </React.Fragment>
      ))}
    </nav>
  );
}
