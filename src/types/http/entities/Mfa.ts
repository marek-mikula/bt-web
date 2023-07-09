import { MFA_TOKEN_TYPE } from '~/enums/MfaTokenType'

export interface MfaToken {
  type: MFA_TOKEN_TYPE
  token: string
  validUntil: string
}
