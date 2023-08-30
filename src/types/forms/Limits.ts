import { MARKET_CAP_CATEGORY } from '~/enums/common/MarketCapCategory'

export interface LimitsForm {
  trade: {
    enabled: boolean
    daily: number | null
    weekly: number | null
    monthly: number | null
  }
  cryptocurrency: {
    enabled: boolean
    min: number | null
    max: number | null
  }
  marketCap: {
    enabled: boolean
    min: MARKET_CAP_CATEGORY | null
    max: MARKET_CAP_CATEGORY | null
  }
}
