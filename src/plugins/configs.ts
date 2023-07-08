import { Context } from '@nuxt/types'
import { Inject } from '@nuxt/types/app'
import createConfigs from '~/configs/configs'

const configsPlugin: any = (ctx: Context, inject: Inject): void => {
  inject('configs', createConfigs(ctx))
}

export default configsPlugin
