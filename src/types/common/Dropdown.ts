import { Ref } from 'vue'

export interface Dropdown {
  state: Ref<boolean>
  labeledBy: string
  show: () => void
  hide: () => void
}
