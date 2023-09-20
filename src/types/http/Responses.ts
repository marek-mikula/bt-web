import { RESPONSE_CODE } from '~/enums/http/responses/ResponseCode'
import {
  DashboardToken,
  DashboardMarketMetrics,
  MfaToken,
  Notification,
  Pagination,
  QuizQuestion,
  User,
  SearchResult,
  Cryptocurrency,
  Alert,
  Limits,
  LimitsLock,
  Asset,
  WhaleAlert
} from '~/types/http/Entities'

export interface JsonResponse {
  code: RESPONSE_CODE
  data: object
}

export interface SuccessResponse extends JsonResponse {
  code: RESPONSE_CODE.OK
  data: {}
}

export interface InvalidContentResponse extends JsonResponse {
  code: RESPONSE_CODE.INVALID_CONTENT
  data: {
    errors: {
      [key: string]: string[]
    }
  }
}

export interface MeResponse extends JsonResponse {
  code: RESPONSE_CODE.OK
  data: {
    user: User
  }
}

export interface LoginResponse extends JsonResponse {
  code: RESPONSE_CODE.OK
  data: {
    user: User
  }
}

export interface MfaTokenResponse extends JsonResponse {
  code: RESPONSE_CODE.MFA_TOKEN
  data: {
    token: MfaToken
  }
}

export interface QuizQuestionsResponse extends JsonResponse {
  code: RESPONSE_CODE.OK
  data: {
    questions: QuizQuestion[]
  }
}

export interface NotificationsResponse extends JsonResponse {
  code: RESPONSE_CODE.OK
  data: {
    notifications: Pagination<Notification>
  }
}

export interface MarkAsReadResponse extends JsonResponse {
  code: RESPONSE_CODE.OK
  data: {
    notification: Notification
  }
}

export interface UnreadNotificationsResponse extends JsonResponse {
  code: RESPONSE_CODE.OK
  data: {
    count: number
  }
}

export interface DashboardIndexResponse extends JsonResponse {
  code: RESPONSE_CODE.OK
  data: {
    topCrypto: DashboardToken[]
    marketMetrics: DashboardMarketMetrics
  }
}

export interface SearchResponse extends JsonResponse {
  code: RESPONSE_CODE.OK
  data: {
    results: SearchResult[]
  }
}

export interface CryptocurrencyIndexResponse extends JsonResponse {
  code: RESPONSE_CODE.OK
  data: {
    cryptocurrencies: {
      data: Cryptocurrency[]
      meta: {
        page: number
        perPage: number
        end: boolean
      }
    }
  }
}

export interface AlertStoreResponse extends JsonResponse {
  code: RESPONSE_CODE.OK
  data: {
    alert: Alert
  }
}

export interface AlertIndexResponse extends JsonResponse {
  code: RESPONSE_CODE.OK
  data: {
    alerts: Alert[]
  }
}

export interface LimitsShowResponse extends JsonResponse {
  code: RESPONSE_CODE.OK
  data: {
    limits: Limits
    lock: LimitsLock
  }
}

export interface LimitsUpdateResponse extends JsonResponse {
  code: RESPONSE_CODE.OK
  data: {
    limits: Limits
    lock: LimitsLock
  }
}

export interface LimitsLockedResponse extends JsonResponse {
  code: RESPONSE_CODE.LIMITS_LOCKED
  data: {
    resetAt: string
  }
}

export interface AssetIndexResponse extends JsonResponse {
  code: RESPONSE_CODE.OK
  data: {
    assets: Asset[]
  }
}

export interface WhaleAlertIndexResponse extends JsonResponse {
  code: RESPONSE_CODE.OK
  data: {
    whaleAlerts: Pagination<WhaleAlert>
  }
}
