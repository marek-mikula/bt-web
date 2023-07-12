import { Ref } from 'vue'

export interface Dropdown {
  state: Ref<boolean>
  show: () => void
  hide: () => void
}
