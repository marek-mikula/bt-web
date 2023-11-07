import { Context } from '@nuxt/types'
import AuthRepository from '~/repositories/AuthRepository'
import MfaRepository from '~/repositories/MfaRepository'
import PasswordResetRepository from '~/repositories/PasswordResetRepository'
import QuizRepository from '~/repositories/QuizRepository'
import UserNotificationRepository from '~/repositories/UserNotificationRepository'
import DashboardRepository from '~/repositories/DashboardRepository'
import SearchRepository from '~/repositories/SearchRepository'
import CryptocurrencyRepository from '~/repositories/CryptocurrencyRepository'
import UserSettingsRepository from '~/repositories/UserSettingsRepository'
import UserAssetRepository from '~/repositories/UserAssetRepository'
import WhaleAlertRepository from '~/repositories/WhaleAlertRepository'
import OrderRepository from '~/repositories/OrderRepository'
import PairRepository from '~/repositories/PairRepository'
import UserRepository from '~/repositories/UserRepository'

export interface Repositories {
  auth: AuthRepository
  mfa: MfaRepository
  passwordReset: PasswordResetRepository
  quiz: QuizRepository
  user: UserRepository
  userNotification: UserNotificationRepository
  userSettings: UserSettingsRepository
  userAsset: UserAssetRepository
  dashboard: DashboardRepository
  search: SearchRepository
  cryptocurrency: CryptocurrencyRepository
  pair: PairRepository
  whaleAlert: WhaleAlertRepository
  order: OrderRepository
}

export function createRepositories(ctx: Context): Repositories {
  return {
    auth: new AuthRepository(ctx, '/api/auth'),
    mfa: new MfaRepository(ctx, '/api/mfa'),
    passwordReset: new PasswordResetRepository(ctx, '/api/password-resets'),
    quiz: new QuizRepository(ctx, '/api/quiz'),
    user: new UserRepository(ctx, '/api/users'),
    userNotification: new UserNotificationRepository(
      ctx,
      '/api/users/notifications'
    ),
    userSettings: new UserSettingsRepository(ctx, '/api/users/settings'),
    userAsset: new UserAssetRepository(ctx, '/api/users/assets'),
    dashboard: new DashboardRepository(ctx, '/api/dashboard'),
    search: new SearchRepository(ctx, '/api/search'),
    cryptocurrency: new CryptocurrencyRepository(
      ctx,
      '/api/currencies/cryptocurrencies'
    ),
    pair: new PairRepository(ctx, '/api/currencies/pairs'),
    whaleAlert: new WhaleAlertRepository(ctx, '/api/whale-alerts'),
    order: new OrderRepository(ctx, '/api/orders')
  }
}
