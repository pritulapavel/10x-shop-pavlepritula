import { createContext, useContext, useState } from 'react'
import type { ReactNode } from 'react'
import { useNavigate } from 'react-router-dom'
import type { AuthState } from '../types'

interface AuthContextValue extends AuthState {
  login: (username: string) => void
  logout: () => void
}

interface AuthProviderProps {
  children: ReactNode
}

const AuthContext = createContext<AuthContextValue | undefined>(undefined)

export function AuthProvider({ children }: AuthProviderProps) {
  const [auth, setAuth] = useState<AuthState>({
    username: '',
    isLoggedIn: false,
  })
  const navigate = useNavigate()

  function login(username: string) {
    setAuth({ username, isLoggedIn: true })
  }

  function logout() {
    setAuth({ username: '', isLoggedIn: false })
    navigate('/', { replace: true })
  }

  return (
    <AuthContext.Provider value={{ ...auth, login, logout }}>
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
