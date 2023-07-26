import { LoDashStatic } from 'lodash'
import AuthRepository from '~/repositories/AuthRepository'
import MfaRepository from '~/repositories/MfaRepository'
import PasswordResetRepository from '~/repositories/PasswordResetRepository'
import QuizRepository from '~/repositories/QuizRepository'
import Cookies from '~/plugins/cookies'
import 'axios'
import { Toast } from '~/plugins/toast'
import UserNotificationRepository from '~/repositories/UserNotificationRepository'

declare module '@nuxt/types' {
  interface Context {
    $repositories: {
      auth: AuthRepository
      mfa: MfaRepository
      passwordReset: PasswordResetRepository
      quiz: QuizRepository
      userNotification: UserNotificationRepository
    }

    $configs: {}

    $_: LoDashStatic

    $toast: Toast

    $cookies: Cookies.CookiesStatic
  }
}

declare module 'axios' {
  interface AxiosRequestConfig {
    doNotCheckCsrf?: boolean
  }
}
