import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { supabase } from './supabase'
import { CompanyRecord } from './types/company'

// Fix for 'process' undefined in browser-like environments for Next.js
declare const process: {
  env: {
    NEXT_PUBLIC_MSME_API_URL?: string;
    [key: string]: string | undefined;
  }
};

let rawApiUrl = process.env.NEXT_PUBLIC_MSME_API_URL || 'http://localhost:8000'
if (rawApiUrl && !rawApiUrl.startsWith('http')) {
  rawApiUrl = `https://${rawApiUrl}`
}
const MSME_API_URL = rawApiUrl

const syncStakeholderToMsme = async (sh: StakeholderProfile) => {
  try {
    const payload = {
      id: sh.id,
      name: sh.name,
      role: sh.role,
      email: sh.email,
      phone: sh.phone,
      linkedin: sh.linkedin,
      company_name: sh.company,
      sector: sh.sector,
      employees: sh.employees,
      revenue: sh.revenue,
      geography: sh.geography,
      domain: sh.domain
    }
    await fetch(`${MSME_API_URL}/api/mosi/stakeholder`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    })
  } catch (e) {
    console.error('MSME Stakeholder Sync Failed:', e)
  }
}

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
  timestamp: number // seconds into the interview
  title: string
  description: string
  tag: CEEDTag
  
  // RUBRIC SCORING (1-4 or 1-10)
  problemClarity: number // 1-4: Ambiguity for innovators
  budgetScore: number    // 1-4: Based on revenue/margin/need
  
  // LOGISTICS
  isPaid: boolean
  rewardAmount?: string
  workingHours?: number
  duration: string // commitment time for student
  
  // ORIGIN & INTENT
  origin: 'Customer' | 'Interviewer'
  activelySeeking: boolean // Is the customer looking for the solution?
  
  // TALENT MATCHING
  skillset: string[]
  toolset: string[]
  mindset: string[]
  
  // LEGACY SCORING (For backward compatibility with initial audit)
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

  // UI / INTEGRATION COMPATIBILITY
  skills?: string // For comma-separated inputs
  engagementType?: 'Bounty' | 'Contract'
  paid?: boolean // Alias for isPaid in some parts of UI
}

export interface StakeholderProfile {
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
  id?: string
}

export interface InterviewSession {
  id: string
  stakeholder: StakeholderProfile
  status: 'Scheduled' | 'Recording' | 'Review' | 'Published' | 'Completed'
  date: string
  duration: number // seconds
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
}

export interface MarketContext {
  saturation: number // 0-100
  share: number      // 0-100
  analysisCase: 1 | 2 | 3
  diagnosis: string
  focus: string[]
}

interface MosiStore {
  // Current session being set up / conducted
  currentSession: Partial<InterviewSession> | null
  // All completed / past sessions
  sessions: InterviewSession[]
  
  // MARKET & INTELLIGENCE
  marketContext: MarketContext | null
  setMarketContext: (saturation: number, share: number) => void
  
  // Live interview state
  isRecording: boolean
  recordingSeconds: number
  activeQuadrant: CEEDTag
  selectedOpportunityId: string | null

  // Actions  
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

  syncAIInsights: async (id: string, aiData: { summary: string, opportunities: any[], sentiment: string, nextSteps: string[] }) => {
    const s = get()
    const session = s.sessions.find(sess => sess.id === id)
    if (!session) return

    const existingOpps = session.opportunities || []
    const newOpps: Opportunity[] = [...existingOpps]

    aiData.opportunities.forEach((aiOpp: any) => {
      const match = newOpps.find(o => o.title.startsWith('Log ') && !o.description)
      if (match) {
        match.title = aiOpp.title
        match.description = aiOpp.description
        match.tag = (aiOpp.tag === 'Disrupt' ? 'Disrupt' : aiOpp.tag) as CEEDTag
        match.problemClarity = aiOpp.problem_clarity
        match.budgetScore = aiOpp.budget_score
        match.origin = aiOpp.origin
        match.activelySeeking = aiOpp.activelySeeking
        match.skillset = aiOpp.skillset
        match.toolset = aiOpp.toolset
        match.mindset = aiOpp.mindset
        match.score = aiOpp.assessment_matrix || match.score
      } else {
        newOpps.push({
          id: aiOpp.id || crypto.randomUUID(),
          timestamp: aiOpp.timestamp || 0,
          title: aiOpp.title,
          description: aiOpp.description,
          tag: (aiOpp.tag === 'Disrupt' ? 'Disrupt' : aiOpp.tag) as CEEDTag,
          problemClarity: aiOpp.problem_clarity || 2,
          budgetScore: aiOpp.budget_score || 2,
          isPaid: false,
          duration: '4 weeks',
          origin: aiOpp.origin || 'Interviewer',
          activelySeeking: aiOpp.activelySeeking ?? true,
          skillset: aiOpp.skillset || [],
          toolset: aiOpp.toolset || [],
          mindset: aiOpp.mindset || [],
          score: aiOpp.assessment_matrix || { clarity: 2, awareness: 2, attempts: 2, intensity: 2 },
          evidence: [],
          notes: '',
          status: 'Pending'
        } as Opportunity)
      }
    })

    const updatedSessions = s.sessions.map(sess => 
        sess.id === id ? { 
          ...sess, 
          summary: aiData.summary, 
          opportunities: newOpps,
          sentiment: aiData.sentiment,
          nextSteps: aiData.nextSteps
        } : sess
      )

    set({ sessions: updatedSessions })

    // 🚀 PERSIST TO SUPABASE
    if (supabase) {
      try {
        // 1. Update Session Summary/Sentiment/NextSteps
        await supabase.from('sessions').update({
          summary: aiData.summary,
          sentiment: aiData.sentiment,
          next_steps: aiData.nextSteps
        }).eq('id', id)

        // 2. Sync Opportunities
        // Delete existing and re-insert or upsert. 
        // For simplicity and safety during synthesis, we delete pending-sync ones and insert new ones.
        // Actually, better to just update by ID if they exist, or insert if they don't.
        for (const opp of newOpps) {
          const { data: existingOpp } = await supabase.from('opportunities').select('id').eq('id', opp.id).maybeSingle()
          const dbOpp = {
            session_id: id,
            title: opp.title,
            description: opp.description,
            tag: opp.tag,
            timestamp: opp.timestamp,
            problem_clarity: opp.problemClarity,
            budget_availability: opp.budgetScore,
            is_paid_project: opp.isPaid,
            origin: opp.origin,
            customer_actively_seeking: opp.activelySeeking,
            status: opp.status
          }
          if (existingOpp) {
            await supabase.from('opportunities').update(dbOpp).eq('id', opp.id)
          } else {
            await supabase.from('opportunities').insert({ ...dbOpp, id: opp.id })
          }
        }
      } catch (err) {
        console.error('Supabase AI Sync Failed:', err)
      }
    }

    // Trigger MSME Synthesis Sync
    const syncedSession = updatedSessions.find(s => s.id === id)
    if (syncedSession) {
      const payload = {
        session_data: {
          id: syncedSession.id,
          stakeholder_id: syncedSession.stakeholder?.id,
          company_id: 'ceed-1', // Default for demo
          summary: syncedSession.summary,
          duration: syncedSession.duration,
          date: syncedSession.date
        },
        opportunities: syncedSession.opportunities.map(o => ({
          id: o.id,
          session_id: syncedSession.id,
          title: o.title,
          description: o.description,
          tag: o.tag,
          budget_score: o.budgetScore,
          problem_clarity: o.problemClarity,
          actively_seeking: o.activelySeeking,
          skillset: o.skillset,
          toolset: o.toolset,
          mindset: o.mindset,
          assessment_matrix: {
            intensity: o.score?.intensity || 2,
            awareness: o.score?.awareness || 2,
            attempts: o.score?.attempts || 2,
            clarity: o.score?.clarity || 2
          }
        })),
        stakeholder: {
          id: syncedSession.stakeholder?.id,
          name: syncedSession.stakeholder?.name,
          role: syncedSession.stakeholder?.role,
          company_name: syncedSession.stakeholder?.company,
          sector: syncedSession.stakeholder?.sector
        }
      }
      try {
        const fetchRes = await fetch(`${MSME_API_URL}/api/mosi/synthesis`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload)
        })
        if (!fetchRes.ok) console.warn('MSME Synthesis Sync returned non-OK status')
      } catch (err) {
        console.error('MSME Synthesis Sync Failed:', err)
      }
    }
  },

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
    // Update in historical sessions
    const newSessions = s.sessions.map(sess => ({
      ...sess,
      opportunities: sess.opportunities.map(o => o.id === id ? { ...o, ...updates } : o)
    }))
    
    // Update in current session if present
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
    
    // Update current session
    const newCurrent = s.currentSession ? {
      ...s.currentSession,
      opportunities: s.currentSession.opportunities?.map(o => 
        o.id === oppId ? { ...o, evidence: [...o.evidence, newEvidence] } : o
      )
    } : s.currentSession

    // Also update sessions array just in case we're editing a completed one
    const newSessions = s.sessions.map(sess => ({
      ...sess,
      opportunities: sess.opportunities.map(o =>
        o.id === oppId ? { ...o, evidence: [...o.evidence, newEvidence] } : o
      )
    }))

    return { currentSession: newCurrent, sessions: newSessions }
  }),

  fetchAllProfiles: async () => {
    if (!supabase) return
    const { data: { user } } = await supabase.auth.getUser()
    
    // 🛡️ SECURITY BLOCK: If no user, return NOTHING
    if (!user) {
      set({ profiles: [] })
      return
    }

    const { data: profiles, error } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', user.id)
      .order('full_name', { ascending: true })

    if (error) {
       console.error('Fetch profiles failed:', error.message)
       return
    }

    if (profiles) {
       set((state: MosiStore) => ({ profiles }))
    }
  },

  fetchSessions: async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser()
      
      // 🛡️ SECURITY BLOCK: If no researcher is logged in, show ZERO data in the archive
      if (!user) {
        set({ sessions: [] })
        return
      }
      
      // 🚀 SHARED WORKSPACE: Fetch ALL sessions for the team repository
      let query = supabase.from('sessions')
        .select('*, stakeholder:stakeholders(*), opportunities(*), evidence(*)')

      const { data: sessionsData, error } = await query.order('created_at', { ascending: false })

      if (error) {
        console.error('[STORE] fetchSessions: ERROR', error.message || error)
        return
      }

      if (sessionsData) {
        console.log(`[STORE] fetchSessions: SUCCESS. Fetched ${sessionsData.length} total sessions (Shared Workspace).`)
        
        const fallbackStakeholder: StakeholderProfile = {
          name: 'Untitled Stakeholder', role: 'N/A', phone: '', email: '', linkedin: '',
          company: 'N/A', sector: '', products: '', employees: '', revenue: '',
          yearsInBusiness: '', geography: ''
        }
        
        const formattedSessions: InterviewSession[] = sessionsData.map((s: any) => {
          const sessionEvidence = s.evidence || []
          const sessionOpps = (s.opportunities || []).map((o: any) => ({
            ...o,
            evidence: sessionEvidence.filter((e: any) => e.opportunity_id === o.id)
          }))
          const rootEvidence = sessionEvidence.filter((e: any) => !e.opportunity_id)

          return {
            id: s.id,
            stakeholder: s.stakeholder || fallbackStakeholder,
            status: s.status,
            date: s.date,
            duration: s.duration,
            opportunities: sessionOpps,
            settings: s.audio_settings || { audio: true, video: true },
            evidence: rootEvidence,
            recordingUrl: s.recording_url,
            summary: s.summary || '',
            user_id: s.user_id
          }
        })

        // 🚀 SMART MERGE: Keep ALL local sessions (like newly generated ones) 
        // until the DB sync is 100% complete and returned in the fetch.
        set((state: MosiStore) => {
          const dbIds = new Set(formattedSessions.map(s => s.id))
          // Keep ONLY local-only sessions that are actively resolving their background sync
          const localOnly = state.sessions.filter((s: InterviewSession) => !dbIds.has(s.id) && (s as any).isPendingSync)
          return { sessions: [...localOnly, ...formattedSessions] }
        })
      }
    } catch (e) {
      console.error('Store: fetchSessions exception:', e)
    }
  },

  fetchSessionById: async (id: string): Promise<InterviewSession | null> => {
    try {
      if (!supabase) return null
      
      const { data: sessionData, error } = await supabase
        .from('sessions')
        .select('*, stakeholders(*), opportunities(*), evidence(*)')
        .eq('id', id)
        .single()

      if (error) {
         console.error('Fetch single session failed:', error.message)
         return null
      }

      if (sessionData) {
        const fallbackStakeholder: StakeholderProfile = {
          name: 'Untitled Stakeholder', role: 'N/A', phone: '', email: '', linkedin: '',
          company: 'N/A', sector: '', products: '', employees: '', revenue: '',
          yearsInBusiness: '', geography: ''
        }
        
        const sessionEvidence = sessionData.evidence || []
        const sessionOpps = (sessionData.opportunities || []).map((o: any) => ({
          ...o,
          evidence: sessionEvidence.filter((e: any) => e.opportunity_id === o.id)
        }))
        const rootEvidence = sessionEvidence.filter((e: any) => !e.opportunity_id)

        const formatted: InterviewSession = {
          id: sessionData.id,
          stakeholder: sessionData.stakeholders || fallbackStakeholder,
          status: sessionData.status,
          date: sessionData.date,
          duration: sessionData.duration,
          opportunities: sessionOpps,
          settings: sessionData.audio_settings || { audio: true, video: true },
          evidence: rootEvidence,
          recordingUrl: sessionData.recording_url,
          summary: sessionData.summary || '',
          user_id: sessionData.user_id
        }
        
        // Update the sessions list in-place if it exists
        set((state: MosiStore) => {
          const sid = sessionData.id
          const exists = state.sessions.find(s => s.id === sid)
          if (exists) {
            return { sessions: state.sessions.map(s => s.id === sid ? formatted : s) }
          }
          return { sessions: [formatted, ...state.sessions] }
        })

        return formatted
      }
      return null
    } catch (e) {
      console.error('Store: fetchSessionById exception:', e)
      return null
    }
  },

  loadSession: async (id: string) => {
    const s = get()
    // 1. Try local list first
    let session = s.sessions.find(x => x.id === id)
    
    // 2. If not in local list, fetch from DB
    if (!session) {
      session = await s.fetchSessionById(id) || undefined
    }

    // 3. Populate currentSession
    if (session) {
      set({ 
        currentSession: session,
        activeQuadrant: 'Core', // Reset view state for the session
        recordingSeconds: session.duration || 0
      })
    }
  },

  setSessions: (sessions: InterviewSession[]) => set({ sessions }),

  finalizeSession: async (recordingUrl: string | undefined): Promise<string> => {
    const newId = crypto.randomUUID()
    const state = get()
    if (!state.currentSession) return ''

    const stakeholder = state.currentSession.stakeholder!
    const session: InterviewSession = {
      id: newId,
      stakeholder,
      status: 'Review',
      date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
      duration: state.recordingSeconds,
      opportunities: (state.currentSession.opportunities || []).map((o: Opportunity) => ({ ...o, status: 'Pending' })),
      settings: state.currentSession.settings || { audio: true, video: true },
      evidence: state.currentSession.evidence || [],
      recordingUrl,
      transcript: [],
      summary: '',
      isPendingSync: true
    } as any

    set((s: MosiStore) => ({
      sessions: [session, ...s.sessions],
      currentSession: null,
      isRecording: false,
      recordingSeconds: 0
    }))

    // 🚀 SYNC TO SUPABASE (AWAITABLE)
    if (supabase) {
      try {
          console.log('Starting Supabase sync for session:', newId)

          // 0. GET CURRENT USER ID
          let currentUserId: string | null = null
          try {
            const { data: { user } } = await supabase.auth.getUser()
            currentUserId = user?.id || null
            console.log('Current user ID:', currentUserId)
            
            // Auto-assign this session locally so the UI updates immediately
            if (currentUserId) {
              set((s: MosiStore) => ({
                sessions: s.sessions.map(sess => 
                  sess.id === newId ? { ...sess, user_id: currentUserId || undefined } : sess
                )
              }))
            }
          } catch (e) {
            console.error('Failed to get current user:', e)
          }
          
          // 1. STAKEHOLDER (Find existing or Create)
          let stakeholderId: string | null = null
          try {
            const dbStakeholder: any = {
              name: stakeholder.name || 'Anonymous',
              role: stakeholder.role || 'Unspecified',
              phone: stakeholder.phone || '',
              email: stakeholder.email || '',
              linkedin: stakeholder.linkedin || '',
              company: stakeholder.company || 'N/A',
              sector: stakeholder.sector || '',
              employees: stakeholder.employees || '',
              revenue: stakeholder.revenue || '',
              geography: stakeholder.geography || '',
              domain: stakeholder.domain || '',
              address: stakeholder.address || '',
              pincode: stakeholder.pincode || ''
            }

            if (currentUserId) {
              dbStakeholder.user_id = currentUserId
            }

            // First, try to find an existing stakeholder by name to avoid duplicates
            console.log('Checking for existing stakeholder:', dbStakeholder.name)
            const { data: existingSH } = await supabase
              .from('stakeholders')
              .select('id')
              .eq('name', dbStakeholder.name)
              .eq('user_id', currentUserId || '') // Match by name AND user_id for privacy/correctness
              .maybeSingle()

            if (existingSH) {
              stakeholderId = existingSH.id
              console.log('Found existing stakeholder, linking to ID:', stakeholderId)
              
              // Update their details while we are at it
              await supabase.from('stakeholders').update(dbStakeholder).eq('id', stakeholderId)
            } else {
              console.log('Creating new stakeholder:', dbStakeholder.name)
              const { data: sData, error: sErr } = await supabase!.from('stakeholders').insert(dbStakeholder).select().single()
              if (sErr || !sData) {
                console.error('Stakeholder sync failed:', sErr?.message || sErr)
              } else {
                stakeholderId = sData.id
                console.log('Stakeholder created successfully, ID:', stakeholderId)
              }
            }
          } catch (e) {
            console.error('Stakeholder sync exception:', e)
          }

          // 2. SESSION (Crucial step)
          try {
            const sessionInsert: any = {
              id: newId,
              stakeholder_id: stakeholderId,
              status: 'Review',
              date: session.date,
              duration: session.duration,
              audio_settings: session.settings,
              summary: session.summary || '',
              transcript: session.transcript || []
            }
            // Only include user_id if we have one
            if (currentUserId) {
              sessionInsert.user_id = currentUserId
            }
            console.log('Inserting session row:', sessionInsert)
            const { error: sessErr } = await supabase.from('sessions').insert(sessionInsert)
            if (sessErr) {
               console.error('Session sync failed:', sessErr, 'Message:', sessErr?.message, 'Code:', sessErr?.code)
            } else {
               console.log('Session row inserted successfully')
            }
          } catch (e) {
            console.error('Session sync exception:', e)
          }

          // 3. OPPORTUNITIES
          try {
            if (session.opportunities.length > 0) {
              const { error: oppErr } = await supabase.from('opportunities').insert(
                session.opportunities.map(o => ({
                  session_id: newId,
                  title: o.title,
                  description: o.description,
                  tag: o.tag,
                  timestamp: o.timestamp,
                  status: 'Pending'
                }))
              )
              if (oppErr) console.error('Opportunities sync failed:', oppErr)
            }
          } catch (e) {
            console.error('Opportunities sync exception:', e)
          }

          // 4. EVIDENCE & OPPORTUNITY EVIDENCE
          try {
            const evidenceToInsert = [
              ...session.evidence.map(e => ({
                session_id: newId,
                type: e.type,
                url: e.url,
                title: e.title
              })),
              ...session.opportunities.flatMap(o => 
                (o.evidence || []).map(e => ({
                  session_id: newId,
                  opportunity_id: o.id,
                  type: e.type,
                  url: e.url,
                  title: e.title
                }))
              )
            ]
            
            if (evidenceToInsert.length > 0) {
              const { error: evErr } = await supabase.from('evidence').insert(evidenceToInsert)
              if (evErr) console.error('Evidence sync failed:', evErr)
            }
          } catch (e) {
            console.error('Evidence sync exception:', e)
          }

          // 5. AUDIO UPLOAD & RECORDING URL UPDATE
          // This is often the most important but also the most fragile step
          try {
            if (recordingUrl && recordingUrl.startsWith('blob:')) {
              console.log('Fetching audio blob for upload...')
              const response = await fetch(recordingUrl)
              const blob = await response.blob()
              const fileName = `${newId}.webm`
              
              console.log('Uploading audio to Supabase Storage...')
              const { data: uploadData, error: uploadErr } = await supabase.storage.from('recordings').upload(fileName, blob)
              
              if (uploadErr) {
                console.error('Audio upload failed:', uploadErr)
              } else if (uploadData) {
                console.log('Audio uploaded successfully, retrieving public URL...')
                const { data: { publicUrl } } = supabase.storage.from('recordings').getPublicUrl(fileName)
                
                console.log('Updating session with recording URL...')
                const { error: updateErr } = await supabase.from('sessions').update({ recording_url: publicUrl }).eq('id', newId)
                
                if (updateErr) {
                  console.error('Failed to update session with recording URL:', updateErr)
                } else {
                  console.log('Recording URL sync complete.')
                  get().setRecordingUrl(newId, publicUrl)
                }
              }
            } else if (recordingUrl) {
              // Not a blob, maybe already a URL? update it directly
              await supabase.from('sessions').update({ recording_url: recordingUrl }).eq('id', newId)
            }
          } catch (e) {
            console.error('Audio sync exception:', e)
          }

          console.log('Supabase background sync finished for session:', newId)
          set((s: MosiStore) => ({
            sessions: s.sessions.map(sess => sess.id === newId ? { ...sess, isPendingSync: false } : sess)
          }))
        } catch (globalErr) {
        console.error('Global Supabase sync error:', globalErr)
      }
    }

    return newId
  },

  scheduleSession: async () => {
    const state = get()
    if (!state.currentSession) return
    
    const newId = `sess_${Date.now()}`
    const stakerecipient = state.currentSession.stakeholder!
    
    const session: InterviewSession = {
      id: newId,
      stakeholder: stakerecipient,
      status: 'Scheduled',
      date: state.currentSession.date || new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
      duration: 0,
      opportunities: [],
      settings: state.currentSession.settings || { audio: true, video: true },
      evidence: [],
      location: state.currentSession.location
    }

    set((s: MosiStore) => ({
      sessions: [session, ...s.sessions],
      currentSession: null,
      isRecording: false,
      recordingSeconds: 0
    }))

    if (supabase) {
      try {
        const { data: { user } } = await supabase.auth.getUser()
        
        // 1. Ensure stakeholder exists
        let stakeholderId: string | null = null
        const { data: existingSH } = await supabase
          .from('stakeholders')
          .select('id')
          .eq('name', stakerecipient.name)
          .eq('user_id', user?.id || '')
          .maybeSingle()
        
        if (existingSH) {
          stakeholderId = existingSH.id
        } else {
          const { data: newSH } = await supabase.from('stakeholders').insert({
            name: stakerecipient.name,
            role: stakerecipient.role,
            company: stakerecipient.company,
            user_id: user?.id
          }).select().single()
          stakeholderId = newSH?.id || null
        }

        // 2. Insert session
        await supabase.from('sessions').insert({
          id: newId,
          stakeholder_id: stakeholderId,
          user_id: user?.id,
          status: 'Scheduled',
          date: session.date,
          location: session.location
        })
      } catch (e) {
        console.error('Failed to persist scheduled session:', e)
      }
    }
    return newId
  },

  publishSession: async (id: string) => {
    // 1. Immediately update local state
    set((s: MosiStore) => ({
      sessions: s.sessions.map(sess =>
        sess.id === id ? { ...sess, status: 'Published' } : sess
      )
    }))

    // 2. 🚀 UNIFIED INTEL SYNC (Enhanced Integration)
    if (supabase) {
      try {
          console.log('Publishing session to Unified Intel Platform...')
          
          // A. Update local session status
          const { error: sessionErr } = await supabase.from('sessions')
            .update({ status: 'Published' })
            .eq('id', id)
          
          if (sessionErr) throw sessionErr

          // B. Sync Market Context (Red/Blue Ocean)
          const state = get()
          const session = state.sessions.find((s: InterviewSession) => s.id === id)
          const companyName = session?.stakeholder?.company
          
          if (session && companyName) {
            const { data: comp } = await supabase
              .from('companies')
              .select('id')
              .ilike('name', companyName)
              .maybeSingle()

            if (comp) {
              // Sync Market Context if we have it
              if (state.marketContext) {
                await supabase.from('company_market_context').upsert({
                  company_id: comp.id,
                  market_saturation: state.marketContext.saturation,
                  market_share_percentage: state.marketContext.share,
                  market_diagnosis: state.marketContext.diagnosis,
                  ocean_strategy: state.marketContext.analysisCase === 3 ? 'disruption' : state.marketContext.analysisCase === 1 ? 'growth' : 'value_enhancement',
                  analysis_case: state.marketContext.analysisCase,
                  recommended_focus: state.marketContext.focus
                }, { onConflict: 'company_id' })
              }

              // C. Sync Rubric-based Opportunities
              for (const opp of session.opportunities) {
                await supabase.from('unified_opportunities').insert({
                  session_id: id,
                  company_id: comp.id,
                  title: opp.title,
                  description: opp.description,
                  ceed_tag: opp.tag,
                  problem_clarity: opp.problemClarity,
                  budget_availability: opp.budgetScore,
                  is_paid_project: opp.isPaid,
                  budget_amount: parseFloat(opp.rewardAmount || '0'),
                  working_hours_defined: opp.workingHours || 0,
                  owner_origin: opp.origin.toLowerCase(),
                  customer_actively_seeking: opp.activelySeeking,
                  skillset: opp.skillset,
                  toolset: opp.toolset,
                  mindset: opp.mindset,
                  duration_weeks: parseInt(opp.duration) || 4
                })
              }
            }
          }
          
          await get().fetchSessions()
      } catch (e) {
        console.error('Unified publish sync failed:', e)
      }
    }
  },

  updateOpportunityStatus: async (sessionId: string, oppId: string, status: 'Approved' | 'Hidden' | 'Pending', comment?: string) => {
    set((s: MosiStore) => ({
      sessions: s.sessions.map(sess => sess.id === sessionId ? {
        ...sess,
        opportunities: sess.opportunities.map(o => o.id === oppId ? { ...o, status, comment } : o)
      } : sess)
    }))
    if (supabase) {
      await supabase.from('opportunities').update({ status, comment }).eq('id', oppId)
    }
  },

  updateTranscriptStatus: async (sessionId: string, paraId: string, status: 'Approved' | 'Hidden' | 'Pending', comment?: string) => {
    set((s: MosiStore) => ({
      sessions: s.sessions.map(sess => sess.id === sessionId ? {
        ...sess,
        transcript: sess.transcript?.map(p => p.id === paraId ? { ...p, status, comment } : p)
      } : sess)
    }))
    // Note: If transcripts are stored in separate table, update here. Currently inferred as JSON in sessions table.
    if (supabase) {
      const state = get()
      const sess = state.sessions.find(s => s.id === sessionId)
      if (sess) {
        await supabase.from('sessions').update({ transcript: sess.transcript }).eq('id', sessionId)
      }
    }
  },

  deleteSession: async (id: string) => {
    set((s: MosiStore) => ({
      sessions: s.sessions.filter(sess => sess.id !== id)
    }))
    if (supabase) {
      await supabase.from('sessions').delete().eq('id', id)
    }
  },

  updateSessionSummary: async (id: string, summary: string) => {
    set((s: MosiStore) => ({
      sessions: s.sessions.map(sess => sess.id === id ? { ...sess, summary } : sess)
    }))
    if (supabase) {
      await supabase.from('sessions').update({ summary }).eq('id', id)
    }
  },

  setRecordingUrl: (id: string, url: string) => set((s: MosiStore) => ({
    sessions: s.sessions.map(sess => sess.id === id ? { ...sess, recordingUrl: url } : sess)
  })),

  updateStakeholder: async (id: string, updates: Partial<StakeholderProfile>) => {
    set((s: MosiStore) => {
      const updatedList = s.stakeholdersList.map(sh => (sh.id === id ? { ...sh, ...updates } : sh))
      const updatedSessions = s.sessions.map(sess => (sess.stakeholder?.id === id ? { ...sess, stakeholder: { ...sess.stakeholder, ...updates } } : sess))
      
      const stakeholder = updatedList.find(sh => sh.id === id)
      if (stakeholder) {
        syncStakeholderToMsme(stakeholder)
      }

      return {
        stakeholdersList: updatedList,
        sessions: updatedSessions
      }
    })
    // Sync to Supabase
    if (supabase) {
      const { error } = await supabase.from('stakeholders')
        .update(updates)
        .eq('id', id)
      if (error) console.error('Stakeholder update failed:', error)
    }
  },
  
  deleteStakeholder: async (id: string) => {
    set((s: MosiStore) => ({
      sessions: s.sessions.filter(sess => sess.stakeholder?.id !== id)
    }))
    if (supabase) {
      await supabase.from('stakeholders').delete().eq('id', id)
    }
  },

  addStakeholder: async (sh: Partial<StakeholderProfile>) => {
    const id = sh.id || crypto.randomUUID()
    const newStakeholder = { ...sh, id } as StakeholderProfile
    set((s: MosiStore) => ({
      stakeholdersList: [...(s.stakeholdersList || []), newStakeholder]
    }))
    
    // Sync to MSME
    await syncStakeholderToMsme(newStakeholder)
    
    // Sync to Supabase
    if (supabase) {
      await supabase.from('stakeholders').insert(newStakeholder)
    }
    return id
  },

  fetchStakeholdersList: async () => {
    if (!supabase) return
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) {
      set({ stakeholdersList: [] })
      set({ sessions: [] })
      set({ profiles: [] })
      return
    }
    
    const { data, error } = await supabase
      .from('stakeholders')
      .select('*')
      .or(`user_id.eq.${user.id},user_id.is.null`)
      .order('name', { ascending: true })

    if (error) {
       console.error('Fetch stakeholders failed:', error.message)
       return
    }

    if (data) {
       set({ stakeholdersList: data })
    }
  },

  fetchGlobalCompanies: async () => {
    if (!supabase) return
    
    // We fetch from both current stakeholders and the integrated 'companies' table for recommendations
    // 1. Fetch from 'companies' table (New MSME logic)
    const { data: companiesData, error: companiesError } = await supabase
      .from('companies')
      .select('*, sectors(name)')
      .limit(200)

    // 2. Fetch from 'stakeholders' table (Restricted to USER matches)
    const { data: { user } } = await supabase.auth.getUser()
    const { data: stakeData, error: stakeError } = await supabase
      .from('stakeholders')
      .select('company, sector, employees, revenue, geography, address, pincode, domain')
      .eq('user_id', user?.id || '') // Privacy fix: strictly current user data
      .not('company', 'is', null)
      .not('company', 'eq', 'N/A')

    if (companiesError && stakeError) {
      console.error('Fetch global companies failed:', companiesError?.message, stakeError?.message)
      return
    }

    const companyMap = new Map<string, CompanyRecord>()

    // Process MSME Platform Companies
    if (companiesData) {
      companiesData.forEach((c: { id: string; name: string; sectors?: { name: string }; employee_count?: number; headquarters_location?: string; website?: string; description?: string; stage?: string; founded_year?: number }) => {
        const key = c.name.toLowerCase().trim()
        if (!companyMap.has(key)) {
          companyMap.set(key, {
            id: c.id,
            name: c.name,
            company: c.name, // Mapping for UI
            sector: (c.sectors?.name || 'Technology') as any,
            employees: c.employee_count?.toString() || 'N/A',
            revenue: 'N/A', // Potentially join with financials
            geography: c.headquarters_location || 'N/A',
            address: 'N/A',
            pincode: 'N/A',
            domain: c.website || '',
            description: c.description,
            stage: (c.stage || 'Growth') as any,
            founded_year: c.founded_year
          })
        }
      })
    }

    // Process MOSI Local Stakeholders (Merge/Update)
    if (stakeData) {
      stakeData.forEach((item: any) => {
        const key = item.company.toLowerCase().trim()
        if (!companyMap.has(key)) {
          companyMap.set(key, {
            id: item.id || `local-${key}`,
            name: item.company,
            company: item.company,
            sector: (item.sector || 'Technology') as any,
            stage: 'Established',
            employees: item.employees,
            revenue: item.revenue,
            geography: item.geography,
            address: item.address,
            pincode: item.pincode,
            domain: item.domain
          } as CompanyRecord)
        }
      })
    }

    set({ globalCompanies: Array.from(companyMap.values()) })
  },

  tick: () => set((s: MosiStore) => ({
    recordingSeconds: s.isRecording ? s.recordingSeconds + 1 : s.recordingSeconds
  }))
}), {
  name: 'mosi-storage',
  partialize: (state: MosiStore) => ({ 
    currentSession: state.currentSession,
    isSidebarCollapsed: state.isSidebarCollapsed 
  }),
})
)

export function formatDuration(seconds: number): string {
  const h = Math.floor(seconds / 3600)
  const m = Math.floor((seconds % 3600) / 60)
  const s = seconds % 60
  if (h > 0) return `${h}:${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`
  return `${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`
}
