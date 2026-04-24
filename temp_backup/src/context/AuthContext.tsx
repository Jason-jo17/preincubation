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
  const { data: session, status } = useSession()
  const [localUser, setLocalUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    if (status === "loading") {
      setIsLoading(true)
      return
    }

    if (session?.user) {
      setLocalUser({
        id: session.user.id,
        name: session.user.name || "User",
        email: session.user.email || "",
        role: (session.user.role as UserRole) || "STUDENT"
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
    // In dev mode without real auth, we just set local storage
    // If using credentials, we would call signIn("credentials", { username: role.toLowerCase() })
    localStorage.setItem("superapp_role", role)
    // Force a reload or local state update to simulate login
    setLocalUser({
      id: "local",
      name: "Local User",
      email: "local@example.com",
      role
    })
  }

  const logout = async () => {
    localStorage.removeItem("superapp_role")
    await signOut({ redirect: false })
    setLocalUser(null)
  }

  const setRole = (role: UserRole) => {
    if (localUser) {
      setLocalUser({ ...localUser, role })
      localStorage.setItem("superapp_role", role)
    }
  }

  return (
    <AuthContext.Provider value={{ user: localUser, isLoading, login, logout, setRole }}>
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
