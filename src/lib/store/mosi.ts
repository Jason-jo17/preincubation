import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { mosiSupabase as supabase } from '@/lib/supabase'

export type CEEDTag = 'Core' | 'Efficiency' | 'Expansion' | 'Disrupt'

export interface TranscriptParagraph {
  id: string
  text: string
  speaker: string
  timestamp: number
  status: 'Approved' | 'Hidden' | 'Pending'
  comment?: string
}

export interface EvidenceItem {
  id: string
  type: 'image' | 'video' | 'link' | 'file'
  url: string
  timestamp: number
  title?: string
}

export interface Opportunity {
  id: string
  timestamp: number
  title: string
  description: string
  tag: CEEDTag
  problemClarity: number
  budgetScore: number
  isPaid: boolean
  rewardAmount?: string
  workingHours?: number
  duration: string
  origin: 'Customer' | 'Interviewer'
  activelySeeking: boolean
  skillset: string[]
  toolset: string[]
  mindset: string[]
  score: {
    clarity: number      
    awareness: number    
    attempts: number     
    intensity: number    
  }
  notes: string
  evidence: EvidenceItem[]
  status: 'Approved' | 'Hidden' | 'Pending'
  comment?: string
  skills?: string
  engagementType?: 'Bounty' | 'Contract'
  paid?: boolean
}

export interface StakeholderProfile {
  id?: string
  name: string
  role: string
  phone: string
  email: string
  linkedin: string
  company: string
  sector: string
  products: string
  employees: string
  revenue: string
  yearsInBusiness: string
  geography: string
  domain?: string
  address?: string
  pincode?: string
}

export interface InterviewSession {
  id: string
  stakeholder: StakeholderProfile
  status: 'Scheduled' | 'Recording' | 'Review' | 'Published' | 'Completed'
  date: string
  duration: number
  opportunities: Opportunity[]
  settings: {
    audio: boolean
    video: boolean
  }
  evidence: EvidenceItem[]
  recordingUrl?: string
  location?: string
  transcript?: TranscriptParagraph[]
  summary?: string
  user_id?: string
  sentiment?: string
  nextSteps?: string[]
  isPendingSync?: boolean
}

export interface MarketContext {
  saturation: number
  share: number
  analysisCase: 1 | 2 | 3
  diagnosis: string
  focus: string[]
}

export interface CompanyRecord {
  id: string
  name: string
  company: string
  sector: string
  employees: string
  revenue: string
  geography: string
  address: string
  pincode: string
  domain: string
}

interface MosiStore {
  currentSession: Partial<InterviewSession> | null
  sessions: InterviewSession[]
  marketContext: MarketContext | null
  setMarketContext: (saturation: number, share: number) => void
  isRecording: boolean
  recordingSeconds: number
  activeQuadrant: CEEDTag
  selectedOpportunityId: string | null
  setCurrentSession: (session: Partial<InterviewSession>) => void
  startRecording: () => void
  stopRecording: () => void
  setActiveQuadrant: (q: CEEDTag) => void
  addOpportunity: (opp: Omit<Opportunity, 'id'> & { id?: string }) => void
  updateOpportunity: (id: string, updates: Partial<Opportunity>) => void
  removeOpportunity: (id: string) => void
  setSelectedOpportunity: (id: string | null) => void
  addEvidence: (evidence: Omit<EvidenceItem, 'id'>) => void
  addEvidenceToOpportunity: (oppId: string, evidence: Omit<EvidenceItem, 'id'>) => void
  finalizeSession: (recordingUrl?: string) => Promise<string>
  scheduleSession: () => Promise<string | void>
  publishSession: (id: string) => Promise<void>
  deleteSession: (id: string) => Promise<void>
  tick: () => void
  updateOpportunityStatus: (sessionId: string, oppId: string, status: 'Approved' | 'Hidden' | 'Pending', comment?: string) => Promise<void>
  updateTranscriptStatus: (sessionId: string, paraId: string, status: 'Approved' | 'Hidden' | 'Pending', comment?: string) => Promise<void>
  isSidebarCollapsed: boolean
  toggleSidebar: () => void
  setSidebarCollapsed: (collapsed: boolean) => void
  updateSessionSummary: (id: string, summary: string) => Promise<void>
  syncAIInsights: (id: string, aiData: { summary: string, opportunities: any[], sentiment: string, nextSteps: string[] }) => Promise<void>
  setRecordingUrl: (id: string, url: string) => void
  profiles: any[]
  addStakeholder: (sh: Partial<StakeholderProfile>) => Promise<string>
  fetchAllProfiles: () => Promise<void>
  fetchSessions: () => Promise<void>
  setSessions: (sessions: InterviewSession[]) => void
  fetchSessionById: (id: string) => Promise<InterviewSession | null>
  loadSession: (id: string) => Promise<void>
  updateStakeholder: (id: string, updates: Partial<StakeholderProfile>) => Promise<void>
  deleteStakeholder: (id: string) => Promise<void>
  stakeholdersList: StakeholderProfile[]
  fetchStakeholdersList: () => Promise<void>
  globalCompanies: CompanyRecord[]
  fetchGlobalCompanies: () => Promise<void>
  setStakeholdersList: (list: StakeholderProfile[]) => void
  setProfiles: (profiles: any[]) => void
}

export const formatDuration = (seconds: number) => {
  const mins = Math.floor(seconds / 60)
  const secs = seconds % 60
  return `${mins}:${secs.toString().padStart(2, '0')}`
}

export const useMosiStore = create<MosiStore>()(
  persist(
    (set, get) => ({
      isSidebarCollapsed: false,
      toggleSidebar: () => set((state: MosiStore) => ({ isSidebarCollapsed: !state.isSidebarCollapsed })),
      setSidebarCollapsed: (collapsed: boolean) => set({ isSidebarCollapsed: collapsed }),
      setStakeholdersList: (list: StakeholderProfile[]) => set({ stakeholdersList: list }),
      setProfiles: (profiles: any[]) => set({ profiles }),
      currentSession: null,
      sessions: [],
      profiles: [],
      isRecording: false,
      recordingSeconds: 0,
      activeQuadrant: 'Core',
      selectedOpportunityId: null,
      marketContext: null,
      stakeholdersList: [],
      globalCompanies: [],

      setMarketContext: (saturation: number, share: number) => {
        let analysisCase: 1 | 2 | 3 = 1
        let diagnosis = ''
        let focus: string[] = []

        if (saturation < 40) {
          analysisCase = 1
          diagnosis = 'Growth Opportunity (Not Saturated)'
          focus = ['Core Offerings', 'Increased Efficiency']
        } else if (saturation <= 75) {
          analysisCase = 2
          diagnosis = 'Mature Market (Competitors Present)'
          focus = ['Enhanced Value', 'New Solutions', 'Market Share Capture']
        } else {
          analysisCase = 3
          diagnosis = 'Saturated / Red Ocean'
          focus = ['New Product Lines', 'Disruption', 'Category Creation', 'Differentiated Solution']
        }

        set({ marketContext: { saturation, share, analysisCase, diagnosis, focus } })
      },

      setCurrentSession: (session: Partial<InterviewSession>) => set((s: MosiStore) => ({
        currentSession: { ...s.currentSession, ...session }
      })),

      startRecording: () => set({ isRecording: true }),
      stopRecording: () => set({ isRecording: false }),

      setActiveQuadrant: (q: CEEDTag) => set({ activeQuadrant: q }),

      tick: () => set((s: MosiStore) => ({ recordingSeconds: s.recordingSeconds + 1 })),

      addOpportunity: (opp: Omit<Opportunity, 'id'> & { id?: string }) => set((s: MosiStore) => {
        const id = opp.id || crypto.randomUUID()
        const defaults: Partial<Opportunity> = {
          problemClarity: 2,
          budgetScore: 2,
          isPaid: false,
          duration: '4 weeks',
          origin: 'Customer',
          activelySeeking: true,
          skillset: [],
          toolset: [],
          mindset: [],
          score: { clarity: 2, awareness: 2, attempts: 2, intensity: 2 },
          notes: '',
          evidence: [],
          status: 'Pending'
        }
        
        const newOpp: Opportunity = { 
          ...defaults,
          ...opp,
          id
        } as Opportunity

        return {
          currentSession: {
            ...s.currentSession,
            opportunities: [...(s.currentSession?.opportunities || []), newOpp]
          }
        }
      }),

      updateOpportunity: (id: string, updates: Partial<Opportunity>) => set((s: MosiStore) => {
        const newSessions = s.sessions.map(sess => ({
          ...sess,
          opportunities: sess.opportunities.map(o => o.id === id ? { ...o, ...updates } : o)
        }))
        const newCurrent = s.currentSession ? {
          ...s.currentSession,
          opportunities: s.currentSession.opportunities?.map(o => o.id === id ? { ...o, ...updates } : o)
        } : s.currentSession

        return { sessions: newSessions, currentSession: newCurrent }
      }),

      removeOpportunity: (id: string) => set((s: MosiStore) => {
        const newSessions = s.sessions.map(sess => ({
          ...sess,
          opportunities: sess.opportunities.filter(o => o.id !== id)
        }))
        const newCurrent = s.currentSession ? {
          ...s.currentSession,
          opportunities: s.currentSession.opportunities?.filter(o => o.id !== id)
        } : s.currentSession

        return { sessions: newSessions, currentSession: newCurrent }
      }),

      setSelectedOpportunity: (id: string | null) => set({ selectedOpportunityId: id }),

      addEvidence: (evidence: Omit<EvidenceItem, 'id'>) => set((s: MosiStore) => ({
        currentSession: {
          ...s.currentSession,
          evidence: [...(s.currentSession?.evidence || []), { ...evidence, id: `ev_${Date.now()}` } as EvidenceItem]
        }
      })),

      addEvidenceToOpportunity: (oppId: string, evidence: Omit<EvidenceItem, 'id'>) => set((s: MosiStore) => {
        const newEvidence: EvidenceItem = { ...evidence, id: `ev_${Date.now()}` }
        const newCurrent = s.currentSession ? {
          ...s.currentSession,
          opportunities: s.currentSession.opportunities?.map(o => 
            o.id === oppId ? { ...o, evidence: [...o.evidence, newEvidence] } : o
          )
        } : s.currentSession
        const newSessions = s.sessions.map(sess => ({
          ...sess,
          opportunities: sess.opportunities.map(o =>
            o.id === oppId ? { ...o, evidence: [...o.evidence, newEvidence] } : o
          )
        }))
        return { currentSession: newCurrent, sessions: newSessions }
      }),

      fetchSessions: async () => {
        if (!supabase) return
        try {
          const { data, error } = await supabase
            .from('sessions')
            .select('*, stakeholder:stakeholders(*), opportunities(*), evidence(*)')
            .order('created_at', { ascending: false })

          if (error) throw error
          if (data) {
            const formatted: InterviewSession[] = data.map((s: any) => ({
              id: s.id,
              stakeholder: s.stakeholder || {},
              status: s.status,
              date: s.date || new Date(s.created_at).toLocaleDateString(),
              duration: s.duration || 0,
              opportunities: s.opportunities || [],
              settings: s.audio_settings || { audio: true, video: true },
              evidence: s.evidence || [],
              recordingUrl: s.recording_url,
              summary: s.summary || '',
              user_id: s.user_id
            }))
            set({ sessions: formatted })
          }
        } catch (e) {
          console.error('Fetch sessions failed:', e)
        }
      },

      finalizeSession: async (recordingUrl?: string): Promise<string> => {
        const newId = crypto.randomUUID()
        const state = get()
        if (!state.currentSession) return ''

        const session: InterviewSession = {
          id: newId,
          stakeholder: state.currentSession.stakeholder!,
          status: 'Review',
          date: new Date().toLocaleDateString(),
          duration: state.recordingSeconds,
          opportunities: (state.currentSession.opportunities || []).map(o => ({ ...o, status: 'Pending' })),
          settings: state.currentSession.settings || { audio: true, video: true },
          evidence: state.currentSession.evidence || [],
          recordingUrl,
          isPendingSync: true
        } as InterviewSession

        set(s => ({
          sessions: [session, ...s.sessions],
          currentSession: null,
          isRecording: false,
          recordingSeconds: 0
        }))

        if (supabase) {
           // Basic sync logic - usually handled more robustly in background
           try {
             await supabase.from('sessions').insert({
               id: newId,
               stakeholder_id: session.stakeholder.id,
               status: 'Review',
               duration: session.duration,
               recording_url: recordingUrl
             })
           } catch (e) {
             console.error('Finalize sync failed:', e)
           }
        }

        return newId
      },

      loadSession: async (id: string) => {
        const s = get()
        let session = s.sessions.find(x => x.id === id)
        if (!session) {
          const fetched = await s.fetchSessionById(id)
          if (fetched) session = fetched
        }
        if (session) {
          set({ currentSession: session, recordingSeconds: session.duration || 0 })
        }
      },

      fetchSessionById: async (id: string) => {
        if (!supabase) return null
        try {
          const { data, error } = await supabase
            .from('sessions')
            .select('*, stakeholder:stakeholders(*), opportunities(*), evidence(*)')
            .eq('id', id)
            .single()
          if (error) throw error
          return data as InterviewSession
        } catch (e) {
          return null
        }
      },

      fetchStakeholdersList: async () => {
        if (!supabase) return
        try {
          const { data, error } = await supabase.from('stakeholders').select('*')
          if (error) throw error
          set({ stakeholdersList: data })
        } catch (e) {}
      },

      fetchGlobalCompanies: async () => {
        if (!supabase) return
        try {
          const { data, error } = await supabase.from('companies').select('*')
          if (error) throw error
          set({ globalCompanies: data })
        } catch (e) {}
      },

      scheduleSession: async () => {
        // Logic for scheduling
      },
      publishSession: async () => {},
      deleteSession: async () => {},
      updateOpportunityStatus: async () => {},
      updateTranscriptStatus: async () => {},
      updateSessionSummary: async () => {},
      syncAIInsights: async () => {},
      setRecordingUrl: () => {},
      addStakeholder: async () => '',
      fetchAllProfiles: async () => {},
      setSessions: () => {},
      updateStakeholder: async () => {},
      deleteStakeholder: async () => {},
      setProfiles: () => {},
    }),
    { name: 'mosi-storage' }
  )
)
