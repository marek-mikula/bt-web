import { Context } from '@nuxt/types'
import { Inject } from '@nuxt/types/app'
import createRepositories from '~/repositories/repositories'

const repositoriesPlugin: any = (ctx: Context, inject: Inject): void => {
  inject('repositories', createRepositories(ctx))
}

export default repositoriesPlugin
