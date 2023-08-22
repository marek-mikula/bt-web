import { Context } from '@nuxt/types'

export abstract class BaseRepository {
  // eslint-disable-next-line no-useless-constructor
  constructor(
    protected readonly ctx: Context,
    protected readonly prefix: string
  ) {}
}
