import { LoDashStatic } from 'lodash'
import AuthRepository from '~/repositories/AuthRepository'
import MfaRepository from '~/repositories/MfaRepository'
import PasswordResetRepository from '~/repositories/PasswordResetRepository'
import QuizRepository from '~/repositories/QuizRepository'
import Cookies from '~/plugins/cookies'
import 'axios'
import { Toast } from '~/plugins/toast'
import UserRepository from '~/repositories/UserRepository'

declare module '@nuxt/types' {
  interface Context {
    $repositories: {
      auth: AuthRepository
      mfa: MfaRepository
      passwordReset: PasswordResetRepository
      quiz: QuizRepository
      user: UserRepository
    }

    $configs: {}

    $_: LoDashStatic

    $toast: Toast

    $cookies: Cookies.CookiesStatic
  }
}

declare module 'axios' {
  interface AxiosRequestConfig {
    doNotCheckCsrf: boolean | undefined
  }
}
