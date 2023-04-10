import { LoDashStatic } from 'lodash'
import AuthRepository from '~/repositories/AuthRepository'

declare module '@nuxt/types' {
  interface Context {
    $repositories: {
      auth: AuthRepository
    }

    $_: LoDashStatic
  }
}
