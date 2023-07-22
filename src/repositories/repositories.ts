import { Context } from '@nuxt/types'
import AuthRepository from '~/repositories/AuthRepository'
import MfaRepository from '~/repositories/MfaRepository'
import PasswordResetRepository from '~/repositories/PasswordResetRepository'
import QuizRepository from '~/repositories/QuizRepository'
import UserRepository from '~/repositories/UserRepository'

export default (ctx: Context) => ({
  auth: new AuthRepository(ctx, '/api/auth'),
  mfa: new MfaRepository(ctx, '/api/mfa'),
  passwordReset: new PasswordResetRepository(ctx, '/api/password-reset'),
  quiz: new QuizRepository(ctx, '/api/quiz'),
  user: new UserRepository(ctx, '/api/user')
})
