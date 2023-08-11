import { LoDashStatic } from 'lodash'
import Cookies from '~/plugins/cookies'
import 'axios'
import { Toast } from '~/plugins/toast'
import { Repositories } from '~/repositories/repositories'
import { Configs } from '~/configs/configs'
import { Formatter } from '~/plugins/formatter'

declare module '@nuxt/types' {
  interface Context {
    $repositories: Repositories

    $configs: Configs

    $_: LoDashStatic

    $toast: Toast

    $cookies: Cookies.CookiesStatic

    $formatter: Formatter
  }
}

// extend axios config with custom properties
declare module 'axios' {
  interface AxiosRequestConfig {
    doNotCheckCsrf?: boolean
  }
}
