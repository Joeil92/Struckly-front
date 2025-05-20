import { ReactNode, useCallback, useEffect, useState } from 'react'
import { Tokens, User } from './session.types'
import { jwtDecode } from 'jwt-decode'
import { userSchema } from './session.schemas'
import { AUTH_TOKENS_KEY } from '../../shared/consts/auth'
import { refreshUser } from '../../shared/api/api.service'
import { AuthContext } from './session.lib'

const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [user, setUser] = useState<User | null>(null)

  const login = useCallback(({ access_token, refresh_token }: Tokens) => {
    const decodedUser = jwtDecode<User & { exp: number; iat: number }>(
      access_token
    )
    const decodedRefreshToken = jwtDecode<User & { exp: number; iat: number }>(
      refresh_token
    )

    // exp is in seconds
    if (decodedUser.exp < Date.now() / 1000) {
      if (decodedRefreshToken.exp < Date.now() / 1000) {
        return logout()
      }

      refreshUser({ refresh_token: refresh_token }).then(({ data }) =>
        login(data)
      )
    }

    localStorage.setItem(
      AUTH_TOKENS_KEY,
      JSON.stringify({ access_token, refresh_token })
    )
    const parsedUser = userSchema.parse(decodedUser)
    setIsAuthenticated(true)
    setUser(parsedUser)
  }, [])

  const logout = () => {
    localStorage.removeItem(AUTH_TOKENS_KEY)
    setIsAuthenticated(false)
    setUser(null)
  }

  useEffect(() => {
    if (isAuthenticated) return

    const tokens = localStorage.getItem(AUTH_TOKENS_KEY)
    if (tokens) {
      login(JSON.parse(tokens))
    }
  }, [isAuthenticated, login])

  return (
    <AuthContext value={{ isAuthenticated, user, login, logout }}>
      {children}
    </AuthContext>
  )
}

export default AuthProvider
