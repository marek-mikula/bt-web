import { LoDashStatic } from 'lodash'
import AuthRepository from '~/repositories/AuthRepository'
import MfaRepository from '~/repositories/MfaRepository'
import PasswordResetRepository from '~/repositories/PasswordResetRepository'
import Toast from '~/toast/Toast'
import QuizRepository from '~/repositories/QuizRepository'

declare module '@nuxt/types' {
  interface Context {
    $repositories: {
      auth: AuthRepository
      mfa: MfaRepository
      passwordReset: PasswordResetRepository
      quiz: QuizRepository
    }

    $configs: {}

    $_: LoDashStatic

    $toast: Toast
  }
}
