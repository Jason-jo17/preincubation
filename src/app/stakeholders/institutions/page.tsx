"use client";

import React, { useState } from "react";
import { 
  Search, 
  Filter, 
  Plus, 
  Building2, 
  MapPin, 
  ExternalLink, 
  Phone, 
  Mail,
  ShieldCheck,
  Briefcase
} from "lucide-react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const MOCK_INSTITUTIONS = [
    {
        id: "1",
        name: "Shri Kshetra Dharmasthala Rural Development Project",
        shortName: "SKDRDP",
        type: "NGO",
        description: "India's largest rural development NGO with 4.25 lakh SHGs and 38.7 lakh members.",
        website: "www.skdrdpindia.org",
        phone: "08256-266666",
        email: "ho@skdrdpindia.org",
        district: "Dakshina Kannada",
        headquarters: "Dharmasthala, Dakshina Kannada - 574216",
        districts: ["Dakshina Kannada", "Udupi", "Shivamogga", "Chikkamagaluru", "Hassan", "Kodagu", "Mysuru", "Mandya", "Chamarajanagar"],
        sectors: ["Agriculture", "Rural Development", "Women Empowerment"],
        resourcesOffered: ["Microfinance", "SHG Formation", "Agricultural Extension"],
        verificationStatus: "Verified",
    },
    {
        id: "2",
        name: "NITK Innovation & Incubation Centre",
        shortName: "NITK-IIC",
        type: "Incubator",
        description: "Technology incubator at National Institute of Technology Karnataka supporting startups in engineering and technology domains.",
        website: "www.nitk.ac.in",
        phone: "0824-2474000",
        district: "Dakshina Kannada",
        focusSectors: ["Industrial Growth", "Digital Infrastructure"],
        resourcesOffered: ["Mentorship", "Lab Space", "Technical Guidance"],
        fundingRange: "₹2L - ₹10L",
        supportsStages: ["Idea", "Prototype", "Pilot"],
        verificationStatus: "Verified",
    },
    {
        id: "3",
        name: "NABARD Karnataka Regional Office",
        shortName: "NABARD",
        type: "Financial",
        description: "National Bank for Agriculture and Rural Development providing refinance and development support.",
        website: "nabard.org",
        district: "All districts",
        focusSectors: ["Agriculture", "Rural Development"],
        resourcesOffered: ["Refinance", "Watershed Development Funds"],
        fundingType: ["Loan", "Grant"],
        verificationStatus: "Verified",
    }
];

export default function InstitutionsPage() {
  const [searchQuery, setSearchQuery] = useState("");

  const filtered = MOCK_INSTITUTIONS.filter(inst => 
    inst.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    inst.shortName.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="p-8 space-y-8 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div className="space-y-2">
          <div className="flex items-center gap-2 text-accent">
            <Building2 className="w-5 h-5" />
            <span className="text-[10px] font-black uppercase tracking-[0.3em]">Network Node</span>
          </div>
          <h1 className="text-4xl font-black italic tracking-tighter uppercase">
            Institutions <span className="text-accent">Directory</span>
          </h1>
          <p className="text-text-secondary max-w-2xl font-medium">
            Connect with supporting organizations, incubators, and NGOs driving regional innovation.
          </p>
        </div>
        <Button className="bg-accent text-white font-black uppercase italic rounded-none px-8 py-6 h-auto shadow-lg shadow-accent/20 hover:scale-105 transition-transform">
          <Plus className="w-5 h-5 mr-2" />
          Add Institution
        </Button>
      </div>

      {/* Search & Filters */}
      <div className="flex flex-col md:flex-row gap-4 p-4 bg-bg-surface border border-border rounded-xl shadow-sm">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-text-muted" />
          <Input 
            placeholder="Search by name, short name, or district..." 
            className="pl-10 bg-bg-base border-border rounded-lg"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <Button variant="outline" className="rounded-lg font-bold uppercase tracking-widest text-[10px]">
          <Filter className="w-4 h-4 mr-2" />
          Filter Type
        </Button>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filtered.map((inst, idx) => (
          <motion.div
            key={inst.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.1 }}
            className="group bg-bg-surface border border-border p-6 rounded-2xl hover:border-accent/50 transition-all hover:shadow-2xl hover:shadow-accent/5 relative overflow-hidden"
          >
            <div className="absolute top-0 right-0 p-4">
              <div className="bg-success/10 text-success text-[8px] font-black uppercase tracking-widest px-2 py-1 rounded flex items-center gap-1">
                <ShieldCheck className="w-3 h-3" />
                {inst.verificationStatus}
              </div>
            </div>

            <div className="space-y-4">
              <div className="space-y-1">
                <div className="text-[10px] font-black text-accent uppercase tracking-widest">{inst.type}</div>
                <h3 className="text-xl font-black italic tracking-tight group-hover:text-accent transition-colors">
                  {inst.shortName || inst.name}
                </h3>
                <p className="text-[11px] text-text-muted font-medium line-clamp-2">
                  {inst.description}
                </p>
              </div>

              <div className="grid grid-cols-2 gap-3 pt-4 border-t border-border">
                <div className="space-y-1">
                  <div className="flex items-center gap-1 text-[9px] font-black text-text-muted uppercase tracking-tighter">
                    <MapPin className="w-3 h-3" /> District
                  </div>
                  <div className="text-[10px] font-bold">{inst.district}</div>
                </div>
                <div className="space-y-1">
                  <div className="flex items-center gap-1 text-[9px] font-black text-text-muted uppercase tracking-tighter">
                    <Briefcase className="w-3 h-3" /> Sector
                  </div>
                  <div className="text-[10px] font-bold truncate">{(inst as any).sectors?.[0] || (inst as any).focusSectors?.[0]}</div>
                </div>
              </div>

              <div className="flex items-center gap-4 pt-4">
                <a href={`https://${inst.website}`} target="_blank" rel="noopener noreferrer" className="p-2 bg-bg-base hover:bg-accent hover:text-white rounded-lg transition-all text-text-secondary">
                  <ExternalLink className="w-4 h-4" />
                </a>
                <button className="p-2 bg-bg-base hover:bg-accent hover:text-white rounded-lg transition-all text-text-secondary">
                  <Phone className="w-4 h-4" />
                </button>
                <button className="p-2 bg-bg-base hover:bg-accent hover:text-white rounded-lg transition-all text-text-secondary">
                  <Mail className="w-4 h-4" />
                </button>
                <div className="flex-1" />
                <Button size="sm" variant="outline" className="text-[9px] font-black uppercase tracking-widest h-8 rounded-lg group-hover:bg-accent group-hover:text-white transition-all">
                  Profile
                </Button>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
