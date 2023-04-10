import { Context } from '@nuxt/types'
import AuthRepository from '~/repositories/AuthRepository'

export default (ctx: Context) => ({
  auth: new AuthRepository(ctx, '/api/auth')
})
