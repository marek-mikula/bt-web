import { MFA_TOKEN_TYPE } from '~/enums/MfaTokenType'

export interface TokenPair {
  type: 'Bearer'
  accessToken: string
  refreshToken: string
  expiresIn: number
}

export interface MfaToken {
  type: MFA_TOKEN_TYPE
  token: string
  validUntil: string
}
