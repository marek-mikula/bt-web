import { Context } from '@nuxt/types'

export abstract class BaseConfig {
  // eslint-disable-next-line no-useless-constructor
  constructor(protected readonly context: Context) {}
}
