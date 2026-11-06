import { createContext, useContext, useState } from 'react'
import type { ReactNode } from 'react'
import { useNavigate } from 'react-router-dom'
import type { AuthState, Profile } from '../types'

interface AuthContextValue extends AuthState {
  login: (username: string) => void
  logout: () => void
  profile: Profile
  displayName: string
  updateProfile: (profile: Profile) => void
}

interface AuthProviderProps {
  children: ReactNode
}

const emptyProfile: Profile = { firstName: '', lastName: '', email: '', phone: '' }

const AuthContext = createContext<AuthContextValue | undefined>(undefined)

export function AuthProvider({ children }: AuthProviderProps) {
  const [auth, setAuth] = useState<AuthState>({
    username: '',
    isLoggedIn: false,
  })
  const [profile, setProfile] = useState(emptyProfile)
  const displayName = [profile.firstName, profile.lastName].filter(Boolean).join(' ') || auth.username
  const navigate = useNavigate()

  function login(username: string) {
    setProfile(emptyProfile)
    setAuth({ username, isLoggedIn: true })
  }

  function logout() {
    setProfile(emptyProfile)
    setAuth({ username: '', isLoggedIn: false })
    navigate('/', { replace: true })
  }

  return (
    <AuthContext.Provider value={{ ...auth, login, logout, profile, displayName, updateProfile: setProfile }}>
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
