import { Context } from '@nuxt/types'
import { Inject } from '@nuxt/types/app'
import { defineNuxtPlugin } from '@nuxtjs/composition-api'
import createConfigs from '~/configs/configs'

export default defineNuxtPlugin((ctx: Context, inject: Inject): void => {
  inject('configs', createConfigs(ctx))
})
