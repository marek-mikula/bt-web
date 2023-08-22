import { MFA_TOKEN_TYPE } from '~/enums/MfaTokenType'
import { NOTIFICATION_TYPE } from '~/enums/notifications/NotificationType'
import { NOTIFICATION_DOMAIN } from '~/enums/notifications/NotificationDomain'

export interface Pagination<D> {
  data: D[]
  meta: {
    currentPage: number
    from: number
    lastPage: number
    path: number
    perPage: number
    to: number
    total: number
  }
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
  body: string
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
  fullName: string
  email: string
  quizTaken: boolean
  quizFinishedAt: string
  createdAt: string
  updatedAt: string
}

export interface DashboardToken {
  id: number
  name: string
  symbol: string
  slug: string
  quoteCurrency: string
  quotePrice: number
  iconUrl: string
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

export interface Cryptocurrency {
  id: number
  name: string
  symbol: string
  iconUrl: string
  infiniteSupply: boolean
  totalSupply: number
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
  currency: string
}
