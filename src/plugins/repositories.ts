import { Context } from '@nuxt/types'
import { Inject } from '@nuxt/types/app'
import { defineNuxtPlugin } from '@nuxtjs/composition-api'
import { createRepositories } from '~/repositories/repositories'

export default defineNuxtPlugin((ctx: Context, inject: Inject): void => {
  inject('repositories', createRepositories(ctx))
})
