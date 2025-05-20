import { createContext, useContext } from 'react'
import { AuthContextType } from './session.types'

export const AuthContext = createContext<AuthContextType>({} as AuthContextType)

export const useAuth = () => {
  const authContext = useContext(AuthContext)

  if (!authContext) {
    throw new Error('useAuth must be used within a AuthProvider')
  }

  return authContext
}
