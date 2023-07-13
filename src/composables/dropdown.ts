import { ref } from 'vue'
import { Dropdown } from '~/types/common/Dropdown'

export function useDropdown() {
  function getDropdown(labeledBy: string): Dropdown {
    const state = ref<boolean>(false)

    function show(): void {
      state.value = true
    }

    function hide(): void {
      state.value = false
    }

    return {
      state,
      labeledBy,
      show,
      hide
    }
  }

  return {
    getDropdown
  }
}
