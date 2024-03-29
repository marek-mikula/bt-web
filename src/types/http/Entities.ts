import { MFA_TOKEN_TYPE } from '~/enums/MfaTokenType'
import { NOTIFICATION_TYPE } from '~/enums/notifications/NotificationType'
import { NOTIFICATION_DOMAIN } from '~/enums/notifications/NotificationDomain'
import { LIMITS_NOTIFICATION_PERIOD } from '~/enums/settings/LimitsNotificationPeriodEnum'
import { CURRENCY_SYMBOL } from '~/enums/common/Currency'
import { ORDER_SIDE } from '~/enums/order/OrderSide'
import { ORDER_STATUS } from '~/enums/order/OrderStatus'
import { MARKET_CAP_CATEGORY } from '~/enums/currency/MarketCapCategory'

export interface PaginationMeta {
  currentPage: number
  from: number
  lastPage: number
  path: number
  perPage: number
  to: number
  total: number
}

export interface Pagination<D> {
  data: D[]
  meta: PaginationMeta
}

export interface MfaToken {
  type: MFA_TOKEN_TYPE
  token: string
  validUntil: string
}

export interface Notification {
  uuid: string
  type: NOTIFICATION_TYPE
  domain: NOTIFICATION_DOMAIN
  title: string
  body: string | null
  data: object
  readAt: string | null
  createdAt: string
}

export interface QuizAnswer {
  id: number
  text: string
  correct: boolean
}

export interface QuizQuestion {
  id: number
  text: string
  hint: string
  answers: QuizAnswer[]
}

export interface User {
  id: number
  firstname: string
  lastname: string
  birthDate: string
  fullName: string
  email: string
  notifications: {
    whale: {
      enabled: boolean
    }
  }
  quizTaken: boolean
  quizFinishedAt: string | null
  assetsSyncedAt: string | null
  createdAt: string
  updatedAt: string
}

export interface Currency {
  id: number
  cmcId: number
  symbol: CURRENCY_SYMBOL
  name: string
  isFiat: boolean
  marketCapCategory: MARKET_CAP_CATEGORY | null
  meta: { [key: string]: any }
}

export interface CurrencyWithPivot extends Currency {
  pivot: {
    symbol: string
    minQuantity: number | null
    maxQuantity: number | null
    stepSize: number | null
  }
}

export interface CurrencyWithQuotes extends Currency {
  quotes: CurrencyWithPivot[]
}

export interface DashboardToken {
  currency: Currency
  quoteCurrency: string
  quotePrice: number
}

export interface DashboardMarketMetrics {
  ethDominance: number
  ethDominanceYesterday: number
  ethDominancePercentageChange: number
  btcDominance: number
  btcDominanceYesterday: number
  btcDominancePercentageChange: number
  totalMarketCap: number
  totalMarketCapYesterday: number
  totalMarketCapPercentageChange: number
  totalMarketCapCurrency: string
}

export interface SearchResultUrls {
  website: string[]
  twitter: string[]
  message_board: string[]
  chat: string[]
  facebook: string[]
  reddit: string[]
  technical_doc: string[]
  source_code: string[]
  announcement: string[]
}

export interface SearchResult {
  id: number
  name: string
  symbol: string
  description: string
  logo: string
  urls: SearchResultUrls
  price: number
  priceCurrency: string
}

export interface Alert {
  id: number
  userId: number
  asMail: boolean
  asNotification: boolean
  title: string
  content: string | null
  date: string
  time: string | null
  notifiedAt: string | null
}

export interface LimitsLock {
  enabled: boolean
  resetAt: string
}

export interface Limits {
  id: number
  userId: number
  trade: {
    enabled: boolean
    daily: number | null
    weekly: number | null
    monthly: number | null
  }
  cryptocurrency: {
    enabled: boolean
    period: LIMITS_NOTIFICATION_PERIOD | null
    min: number | null
    max: number | null
  }
  marketCap: {
    enabled: boolean
    period: LIMITS_NOTIFICATION_PERIOD | null
    margin: number | null
    micro: {
      enabled: boolean
      value: number | null
    }
    small: {
      enabled: boolean
      value: number | null
    }
    mid: {
      enabled: boolean
      value: number | null
    }
    large: {
      enabled: boolean
      value: number | null
    }
    mega: {
      enabled: boolean
      value: number | null
    }
  }
}

export interface SupportedAsset {
  id: number
  isSupported: true
  currency: Currency
  currencySymbol: null
  balance: number
}

export interface UnsupportedAsset {
  id: number
  isSupported: false
  currency: null
  currencySymbol: string
  balance: number
}

export type Asset = SupportedAsset | UnsupportedAsset

export interface WhaleAlert {
  id: number
  currency: Currency
  hash: string
  amount: number
  amountUsd: number
  senderAddress: 'multiple' | string | null
  senderName: string | null
  receiverAddress: 'multiple' | string | null
  receiverName: string | null
  notifiedAt: string | null
  transactionAt: string
}

export interface Quote {
  currency: string
  infiniteSupply: boolean
  totalSupply: number
  circulatingSupply: number
  maxSupply: number
  price: number
  priceChange1h: number
  priceChange24h: number
  priceChange7d: number
  priceChange30d: number
  priceChange60d: number
  priceChange90d: number
  marketCap: number
  volume24h: number
  volumeChange24h: number
}

export interface News {
  id: number
  title: string
  url: string
  createdAt: string
  publishedAt: string
  sourceName: string
  sourceUrl: string
}

export interface CurrencyPair {
  id: number
  symbol: string
  baseCurrency?: Currency
  quoteCurrency?: Currency
}

export interface Order {
  id: number
  binanceUuid: string
  binanceId: number
  userId: number
  pairId: number
  side: ORDER_SIDE
  status: ORDER_STATUS
  baseQuantity: number
  quoteQuantity: number
  price: number
  pair?: CurrencyPair
  createdAt: string
  updatedAt: string
}

export interface CryptocurrencyList {
  currency: Currency
  quote: Quote
  userAsset: SupportedAsset | null
}

export interface CryptocurrencyDetail {
  currency: CurrencyWithQuotes
  quote: Quote
  userAsset: Asset | null
  news: News[]
  orders: Order[]
  whaleAlerts: WhaleAlert[] | null // null if currency does not support whale alerts
}
