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

export interface Repositories {
  auth: AuthRepository
  mfa: MfaRepository
  passwordReset: PasswordResetRepository
  quiz: QuizRepository
  userNotification: UserNotificationRepository
  userSettings: UserSettingsRepository
  userAsset: UserAssetRepository
  dashboard: DashboardRepository
  search: SearchRepository
  cryptocurrency: CryptocurrencyRepository
  whaleAlert: WhaleAlertRepository
}

export function createRepositories(ctx: Context): Repositories {
  return {
    auth: new AuthRepository(ctx, '/api/auth'),
    mfa: new MfaRepository(ctx, '/api/mfa'),
    passwordReset: new PasswordResetRepository(ctx, '/api/password-reset'),
    quiz: new QuizRepository(ctx, '/api/quiz'),
    userNotification: new UserNotificationRepository(
      ctx,
      '/api/user/notifications'
    ),
    userSettings: new UserSettingsRepository(ctx, '/api/user/settings'),
    userAsset: new UserAssetRepository(ctx, '/api/user/assets'),
    dashboard: new DashboardRepository(ctx, '/api/dashboard'),
    search: new SearchRepository(ctx, '/api/search'),
    cryptocurrency: new CryptocurrencyRepository(ctx, '/api/cryptocurrencies'),
    whaleAlert: new WhaleAlertRepository(ctx, '/api/whale-alerts')
  }
}
