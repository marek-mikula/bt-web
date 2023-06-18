import { LoDashStatic } from 'lodash'
import AuthRepository from '~/repositories/AuthRepository'
import MfaRepository from '~/repositories/MfaRepository'
import PasswordResetRepository from '~/repositories/PasswordResetRepository'
import Toast from '~/toast/Toast'
import QuizConfig from '~/configs/QuizConfig'

declare module '@nuxt/types' {
  interface Context {
    $repositories: {
      auth: AuthRepository
      mfa: MfaRepository
      passwordReset: PasswordResetRepository
    }

    $configs: {
      quiz: QuizConfig
    }

    $_: LoDashStatic

    $toast: Toast
  }
}
