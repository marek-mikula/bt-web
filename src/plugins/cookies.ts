import { Context } from '@nuxt/types'
import { Inject } from '@nuxt/types/app'
import Cookies from 'js-cookie/index'
import { defineNuxtPlugin } from '@nuxtjs/composition-api'

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export default defineNuxtPlugin((ctx: Context, inject: Inject): void => {
  inject('cookies', Cookies)
})
