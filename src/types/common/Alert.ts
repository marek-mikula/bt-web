import { Translation } from '~/types/common/Common'

export interface AlertAction {
  label: Translation
  handler: (() => Promise<void>) | (() => void)
}
