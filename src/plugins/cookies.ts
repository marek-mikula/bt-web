import { Context } from '@nuxt/types'
import { Inject } from '@nuxt/types/app'
import Cookies from 'js-cookie/index'

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const cookiesPlugin: any = (ctx: Context, inject: Inject): void => {
  inject('cookies', Cookies)
}

export default cookiesPlugin
