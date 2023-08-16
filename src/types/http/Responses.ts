import { RESPONSE_CODE } from '~/enums/http/responses/ResponseCode'
import {
  DashboardToken,
  DashboardMarketMetrics,
  MfaToken,
  Notification,
  Pagination,
  QuizQuestion,
  User
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
