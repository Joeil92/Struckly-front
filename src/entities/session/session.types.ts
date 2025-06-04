import { z } from 'zod'
import { tokensSchema, userSchema } from './session.schemas'

export enum Gender {
  MALE = 'male',
  FEMALE = 'female',
  OTHER = 'other',
}

export enum Roles {
  USER = 'ROLE_USER',
  ADMIN = 'ROLE_ADMIN',
}

export interface AuthContextType {
  isAuthenticated: boolean
  user: User | null
  login: ({
    access_token,
    refresh_token,
  }: {
    access_token: string
    refresh_token: string
  }) => void
  logout: () => void
}

export type Tokens = z.infer<typeof tokensSchema>

export type User = z.infer<typeof userSchema>
