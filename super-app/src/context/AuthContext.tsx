"use client"

import React, { createContext, useContext, useEffect, useState } from "react"
import { SessionProvider, useSession, signIn, signOut } from "next-auth/react"

export type UserRole = "STUDENT" | "MSME" | "ADMIN" | "GUEST" | "MANAGER" | "MENTOR"

interface User {
  id: string
  name: string
  email: string
  role: UserRole
}

interface AuthContextType {
  user: User | null
  isLoading: boolean
  login: (role: UserRole) => void
  logout: () => void
  setRole: (role: UserRole) => void
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

function AuthProviderInner({ children }: { children: React.ReactNode }) {
  const { data: session, status, update } = useSession()
  const [localUser, setLocalUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    if (status === "loading") {
      setIsLoading(true)
      return
    }

    if (session?.user) {
      setLocalUser({
        id: (session.user as any).id || "1",
        name: session.user.name || "User",
        email: session.user.email || "",
        role: (session.user as any).role as UserRole || "STUDENT"
      })
    } else {
      // Fallback for development/guest
      const savedRole = localStorage.getItem("superapp_role") as UserRole
      setLocalUser({
        id: "guest",
        name: "Guest User",
        email: "guest@example.com",
        role: savedRole || "GUEST"
      })
    }
    setIsLoading(false)
  }, [session, status])

  const login = async (role: UserRole) => {
    // In dev mode, we try to sign in with credentials matching the role
    const username = role.toLowerCase()
    const result = await signIn("credentials", { 
      username, 
      password: "any", // authorize in lib/auth.ts doesn't check password
      redirect: false 
    })
    
    if (result?.ok) {
      localStorage.setItem("superapp_role", role)
    } else {
      // Fallback if signIn fails
      localStorage.setItem("superapp_role", role)
      setLocalUser({
        id: "local",
        name: "Local User",
        email: "local@example.com",
        role
      })
    }
  }

  const logout = async () => {
    localStorage.removeItem("superapp_role")
    await signOut({ redirect: false })
    setLocalUser(null)
  }

  const setRole = async (role: UserRole) => {
    if (localUser) {
      setLocalUser({ ...localUser, role })
      localStorage.setItem("superapp_role", role)
      // Sync with NextAuth session
      if (session) {
        await update({ role })
      }
    }
  }

  return (
    <AuthContext.Provider value={{ user: localUser, isLoading, login, logout, setRole: (role) => { setRole(role) } }}>
      {children}
    </AuthContext.Provider>
  )
}

export function AuthProvider({ children }: { children: React.ReactNode }) {
  return (
    <SessionProvider>
      <AuthProviderInner>
        {children}
      </AuthProviderInner>
    </SessionProvider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}
