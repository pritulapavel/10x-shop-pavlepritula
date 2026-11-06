import { createContext, startTransition, useContext, useState } from 'react'
import type { ReactNode } from 'react'
import { useNavigate } from 'react-router-dom'
import type { AuthState, Profile } from '../types'
import { clearSavedProfiles, emptyProfile, readProfile, saveProfile } from '../utils/profileStorage'

interface AuthContextValue extends AuthState {
  login: (username: string) => void
  logout: () => void
  profile: Profile
  displayName: string
  updateProfile: (profile: Profile) => boolean
  clearProfiles: () => boolean
}

interface AuthProviderProps {
  children: ReactNode
}

const guestSession = { username: '', isLoggedIn: false, profile: emptyProfile }

const AuthContext = createContext<AuthContextValue | undefined>(undefined)

export function AuthProvider({ children }: AuthProviderProps) {
  const [session, setSession] = useState(guestSession)
  const { username, isLoggedIn, profile } = session
  const displayName = [profile.firstName, profile.lastName].filter(Boolean).join(' ') || username
  const navigate = useNavigate()

  function login(username: string) {
    setSession({ username, isLoggedIn: true, profile: readProfile(username) })
  }

  function logout() {
    // Commit the session reset with the route change so RequireAuth doesn't redirect first.
    startTransition(() => {
      setSession(guestSession)
      navigate('/', { replace: true })
    })
  }

  function updateProfile(next: Profile) {
    if (!isLoggedIn || !saveProfile(username, next)) return false
    setSession((current) => ({ ...current, profile: next }))
    return true
  }

  function clearProfiles() {
    if (!isLoggedIn || !clearSavedProfiles()) return false
    setSession((current) => ({ ...current, profile: emptyProfile }))
    return true
  }

  return (
    <AuthContext.Provider value={{ ...session, login, logout, displayName, updateProfile, clearProfiles }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)

  if (context === undefined) {
    throw new Error('useAuth must be used within AuthProvider')
  }

  return context
}
