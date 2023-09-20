import { LIMITS_NOTIFICATION_PERIOD } from '~/enums/settings/LimitsNotificationPeriodEnum'

export interface LimitsTradeForm {
  enabled: boolean
  daily: number | null
  weekly: number | null
  monthly: number | null
}

export interface LimitsCryptocurrencyForm {
  enabled: boolean
  period: LIMITS_NOTIFICATION_PERIOD | null
  min: number | null
  max: number | null
}

export interface LimitsMarketCapForm {
  enabled: boolean
  period: LIMITS_NOTIFICATION_PERIOD | null
  margin: number | null
  microEnabled: boolean
  micro: number | null
  smallEnabled: boolean
  small: number | null
  midEnabled: boolean
  mid: number | null
  largeEnabled: boolean
  large: number | null
  megaEnabled: boolean
  mega: number | null
}

export interface LimitsForm {
  trade: LimitsTradeForm
  cryptocurrency: LimitsCryptocurrencyForm
  marketCap: LimitsMarketCapForm
}

export interface NotificationsForm {
  whale: {
    enabled: boolean
  }
}
