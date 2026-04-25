import { Loader2 } from "lucide-react"

export default function AssessmentLoading() {
  return (
    <div className="h-[70vh] w-full flex flex-col items-center justify-center gap-6 animate-in fade-in duration-700">
      <div className="relative">
        <div className="absolute inset-0 bg-accent/20 blur-[50px] rounded-full animate-pulse" />
        <Loader2 className="animate-spin text-accent relative z-10" size={48} />
      </div>
      <div className="text-center space-y-2">
        <h2 className="text-xl font-black italic uppercase tracking-tighter">Calibrating <span className="text-accent">Maturity</span></h2>
        <p className="text-[10px] font-black uppercase tracking-[0.2em] text-text-muted">Synchronizing Strategic Data Nodes...</p>
      </div>
    </div>
  )
}
