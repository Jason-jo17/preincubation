import React from "react";
import { getInteractions } from "@/app/actions/interactions";
import { InteractionsClient } from "./InteractionsClient";

export const metadata = {
  title: "Interaction Log | InUnity",
  description: "Monitor and record stakeholder engagements.",
};

export default async function InteractionsPage() {
  const result = await getInteractions();
  const interactions = (result.success && result.data ? result.data : []) as any[];

  return (
    <div className="p-8 lg:p-12 space-y-12 max-w-6xl mx-auto">
      <InteractionsClient initialData={interactions} />
      
      {/* Pagination / Load More */}
      {interactions.length > 5 && (
        <div className="flex justify-center">
           <button className="h-14 px-12 rounded-3xl border-2 border-border font-black uppercase italic text-[11px] tracking-widest hover:bg-accent hover:text-white hover:border-accent transition-all shadow-lg">
              Expand Intelligence Feed
           </button>
        </div>
      )}
    </div>
  );
}
