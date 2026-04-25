import { Loader2, AlertCircle, RotateCcw, Home } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"

export function LoadingState({ title = "Loading", subtitle = "Synchronizing Data..." }) {
  return (
    <div className="h-[70vh] w-full flex flex-col items-center justify-center gap-6 animate-in fade-in duration-700">
      <div className="relative">
        <div className="absolute inset-0 bg-accent/20 blur-[50px] rounded-full animate-pulse" />
        <Loader2 className="animate-spin text-accent relative z-10" size={48} />
      </div>
      <div className="text-center space-y-2">
        <h2 className="text-xl font-black italic uppercase tracking-tighter">{title}</h2>
        <p className="text-[10px] font-black uppercase tracking-[0.2em] text-text-muted">{subtitle}</p>
      </div>
    </div>
  )
}

export function ErrorState({ error, reset, title = "System Disconnect" }: { error: any, reset: () => void, title?: string }) {
  return (
    <div className="h-[70vh] w-full flex flex-col items-center justify-center p-6 text-center animate-in zoom-in-95 duration-500">
      <div className="w-20 h-20 rounded-[32px] bg-red-50 flex items-center justify-center text-red-500 mb-8 border border-red-100 shadow-xl shadow-red-500/10">
        <AlertCircle size={40} />
      </div>
      
      <div className="space-y-4 mb-10 max-w-md">
        <h2 className="text-3xl font-black italic uppercase tracking-tighter">{title}</h2>
        <p className="text-sm font-medium text-text-muted leading-relaxed uppercase tracking-wide">
          An anomaly occurred while processing this module. The neural link has been temporarily severed.
        </p>
      </div>

      <div className="flex gap-4">
        <Button 
          onClick={() => reset()}
          className="rounded-[20px] bg-text text-white font-black uppercase tracking-widest text-[10px] h-14 px-8 border-none hover:bg-black/80 shadow-lg"
        >
          <RotateCcw size={16} className="mr-2" />
          Reboot Session
        </Button>
        <Link href="/">
          <Button 
            variant="outline"
            className="rounded-[20px] border-border text-text-muted font-black uppercase tracking-widest text-[10px] h-14 px-8 hover:bg-bg-surface"
          >
            <Home size={16} className="mr-2" />
            Abort to Hub
          </Button>
        </Link>
      </div>

      <div className="mt-12 p-4 rounded-2xl bg-bg-surface border border-border">
        <code className="text-[9px] font-mono text-red-400 bg-red-50/50 px-2 py-1 rounded">
          DIGEST: {error?.digest || "UNKNOWN_FAILURE"}
        </code>
      </div>
    </div>
  )
}
