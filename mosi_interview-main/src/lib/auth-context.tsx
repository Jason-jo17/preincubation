'use client'

import { createContext, useContext, useEffect, useState } from 'react'
import { supabase } from './supabase'
import { User } from '@supabase/supabase-js'
import { useMosiStore } from './store'
import { logout } from '@/app/login/actions'

interface AuthContextType {
  user: User | null
  profile: any | null
  loading: boolean
  signOut: () => Promise<void>
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  profile: null,
  loading: true,
  signOut: async () => {},
})

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null)
  const [profile, setProfile] = useState<any | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    let mounted = true
    const initializeAuth = async () => {
      // ⏱️ SECURITY: 10s timeout to prevent infinite "Syncing Identity" hangs
      const timeoutId = setTimeout(() => {
        if (mounted && loading) {
          console.warn('[AUTH] Initial check timed out. Falling back to guest state.')
          setLoading(false)
        }
      }, 10000)

      try {
        if (!supabase) {
          if (mounted) setLoading(false)
          return
        }
        
        // Use getUser() to ping the server to accurately read secure cookies
        const { data: { user }, error } = await supabase.auth.getUser()
        
        if (!mounted) return
        
        if (error) {
           console.error('[AUTH] Supabase session error:', error.message)
           setUser(null)
           setProfile(null)
        } else {
           setUser(user ?? null)
            if (user) {
              let { data: profile } = await supabase
                .from('profiles')
                .select('*')
                .eq('id', user.id)
                .single()
              
              if (!profile) {
                // 🪄 JIT PROFILE CREATION: If no profile exists, create one from user session
                const { data: newProfile } = await supabase
                  .from('profiles')
                  .upsert({ 
                    id: user.id, 
                    full_name: user.user_metadata?.full_name || user.email?.split('@')[0] || 'Researcher',
                    role: 'researcher',
                    updated_at: new Date().toISOString()
                  })
                  .select()
                  .single()
                profile = newProfile
              }
              
              if (mounted) setProfile(profile)
            }
        }
      } catch (err) {
        console.error('Auth initialization error:', err)
      } finally {
        clearTimeout(timeoutId)
        if (mounted) setLoading(false)
      }
    }

    initializeAuth()

    if (supabase) {
      const { data: { subscription } } = supabase.auth.onAuthStateChange(
        async (event: any, session: any) => {
          if (!mounted) return
          
          // Ignore INITIAL_SESSION otherwise it immediately overwrites `getUser()` with null
          if (event === 'INITIAL_SESSION') return

          const { setSessions, setStakeholdersList, setProfiles, fetchSessions } = useMosiStore.getState()
          
          if (event === 'SIGNED_OUT') {
            setSessions([])
            setStakeholdersList([])
            setProfiles([])
          }

          setUser(session?.user ?? null)
          if (session?.user) {
            let { data: profile } = await supabase!
              .from('profiles')
              .select('*')
              .eq('id', session.user.id)
              .single()
            
            if (!profile) {
              // 🪄 JIT PROFILE CREATION: If no profile exists, create one from user session
              const { data: newProfile } = await supabase
                .from('profiles')
                .upsert({ 
                  id: session.user.id, 
                  full_name: session.user.user_metadata?.full_name || session.user.email?.split('@')[0] || 'Researcher',
                  role: 'researcher',
                  updated_at: new Date().toISOString()
                })
                .select()
                .single()
              profile = newProfile
            }

            if (mounted) setProfile(profile)
            
            if (event === 'SIGNED_IN') {
              fetchSessions()
            }
          } else {
            if (mounted) setProfile(null)
          }
          
          if (mounted) setLoading(false)
        }
      )

      return () => {
        mounted = false
        subscription.unsubscribe()
      }
    } else {
      return () => { mounted = false }
    }
  }, [])

  const signOut = async () => {
    try {
      // 1. CLEAR LOCAL UI STATE IMMEDIATELY (OPTIMISTIC)
      // This prevents the user from being "stuck" on a page while the server thinks
      setUser(null)
      setProfile(null)
      
      // Clear Zustand store immediately
      const store = useMosiStore.getState()
      store.setSessions([])
      store.setStakeholdersList([])
      store.setProfiles([])
      
      // 2. CLEAR SUPABASE SESSION CLIENT-SIDE
      if (supabase) {
        // use .then to make it non-blocking if it hangs
        supabase.auth.signOut().catch(e => console.warn('Supabase signout failed:', e))
      }
      
      // 3. TRIGGER SERVER ACTION (Background)
      // We don't await this if we want immediate navigation, but we'll try for 1s
      const logoutPromise = logout()
      
      // 4. FINAL HARD RESET & REDIRECT
      // Force navigation to ensure cookies are cleared by the middleware upon landing
      window.location.href = '/login'
    } catch (e: any) {
      if (e?.digest?.startsWith('NEXT_REDIRECT') || e?.message === 'NEXT_REDIRECT') {
        return;
      }
      console.error('Logout handler failed, forcing redirect:', e)
      window.location.href = '/login'
    }
  }

  return (
    <AuthContext.Provider value={{ user, profile, loading, signOut }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => useContext(AuthContext)
