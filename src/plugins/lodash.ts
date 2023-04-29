import lodash from 'lodash'
import { Context } from '@nuxt/types'
import { Inject } from '@nuxt/types/app'

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const lodashPlugin: any = (ctx: Context, inject: Inject): void => {
  inject('_', lodash)
}

export default lodashPlugin
