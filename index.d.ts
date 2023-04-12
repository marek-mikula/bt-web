import { LoDashStatic } from 'lodash'
import AuthRepository from '~/repositories/AuthRepository'
import MfaRepository from '~/repositories/MfaRepository'

declare module '@nuxt/types' {
  interface Context {
    $repositories: {
      auth: AuthRepository
      mfa: MfaRepository
    }

    $_: LoDashStatic
  }
}
